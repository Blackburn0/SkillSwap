from rest_framework import generics, status
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import redirect
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db import IntegrityError, DatabaseError
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import send_mail
from rest_framework.views import APIView

from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers import RegisterSerializer, LoginSerializer, ChangePasswordSerializer

def google_login_redirect(request):
    """
    Redirects the user straight to Google OAuth login page.
    """
    return redirect('/accounts/google/login/')

def github_login_redirect(request):
    """
    Redirect straight to GitHub OAuth login page.
    """
    return redirect('/accounts/github/login/')


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            return Response({
                "message": "User registered successfully",
                "email": user.email,
                "googleId": getattr(user, "googleId", None),
                "githubId": getattr(user, "githubId", None),
            }, status=status.HTTP_201_CREATED)

        except IntegrityError as e:
            # Example: duplicate email
            return Response({"error": "A user with this email already exists."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data['user']

            # OAuth handling: if Google or GitHub ID is provided, merge or create handled by serializer
            refresh = RefreshToken.for_user(user)

            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "email": user.email,
                "googleId": getattr(user, "googleId", None),
                "githubId": getattr(user, "githubId", None),
            }, status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        google_id = request.data.get("googleId")
        github_id = request.data.get("githubId")

        if not email:
            return Response({"error": "Email is required"}, status=400)
        
        # disallow users who signup through google and github from resetting their passwords
        if google_id:
            return Response({"Please login with your Google account"}, status=400)
        if github_id:
            return Response({"Please login with your Github account"}, status=400)
        
        try:
            user = User.objects.get(email=email)
            token = PasswordResetTokenGenerator().make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))

            reset_url = f"http://localhost:3000/reset-password/{uid}/{token}/"
            send_mail(
                subject="Password Reset Request",
                message=f"Click the link to reset your password: {reset_url}",
                from_email="noreply@joblinker.com",
                recipient_list=[email],
            )

            return Response({"message": "Password reset link sent"}, status=200)
        except User.DoesNotExist:
            return Response({"error": "User with this email does not exist"}, status=404)
        
        # catch any other errors like email send failed
        except Exception as e: 
            return Response({"error": str(e)}, status=400)



class PasswordResetConfirmView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({"error": "Invalid or expired token"}, status=400)

            new_password = request.data.get("password")
            user.set_password(new_password)
            user.save()

            return Response({"message": "Password has been reset"}, status=200)
        except Exception:
            return Response({"error": "Something went wrong"}, status=400)

class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        user = self.get_object()

        try:
            # only allow users with usable passwords
            if not user.has_usable_password():
                return Response(
                    {"error": "Users who signed up via Google or GitHub cannot change password."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            # check old password
            if not user.check_password(serializer.validated_data["old_password"]):
                return Response({"old_password": "Wrong password."}, status=status.HTTP_400_BAD_REQUEST)

            # set new password
            user.set_password(serializer.validated_data["new_password"])
            user.save()

            return Response({"message": "Password updated successfully"}, status=status.HTTP_200_OK)

        except DatabaseError as e:
            # Catch database-related errors
            return Response({"error": "Database error occurred. Please try again."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            # Catch all other unexpected errors
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
