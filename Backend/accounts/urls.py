from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from django.shortcuts import redirect

from .views import RegisterView, LoginView, PasswordResetRequestView, PasswordResetConfirmView, ChangePasswordView, google_login_redirect, github_login_redirect


# def google_callback_redirect(request):
   # return redirect('/accounts/google/login/callback/')

urlpatterns = [
    path("signup/", RegisterView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("password/forgot/", PasswordResetRequestView.as_view(), name="password_reset_request"),
    path("password/reset/<uidb64>/<token>/", PasswordResetConfirmView.as_view(), name="password_reset_confirm"),
    path("change-password/", ChangePasswordView.as_view(), name="change_password"),

    # Custom redirect endpoints for Google OAuth2 and Github OAuth
    path('google/', google_login_redirect, name='google-login-redirect'),
    path("github/", github_login_redirect, name="github-login-redirect"),

]

# Google flow
# GET /api/v1/auth/google/  --> redirect to Google login
# Google OAuth login
