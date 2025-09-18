from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User
from rest_framework import serializers
from django.contrib.auth import password_validation


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    googleId=serializers.CharField(write_only=True, required=False)
    githubId=serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ["email", "password", "googleId", "githubId"]

    def create(self, validated_data):
        google_id = validated_data.pop("googleId", None)
        github_id = validated_data.pop("githubId", None)
        password = validated_data.pop("password", None)

        # Handle provider-based signups: If Google or GitHub ID is provided,
        # merge with an existing user with the same email or create a new one.
        user = User.objects.filter(email=validated_data["email"]).first()
        if user:
            if google_id and not user.googleId:
                user.googleId=google_id
            if github_id and not user.githubId:
                user.githubId = github_id
            user.save()
            return user

        return User.objects.create_user(**validated_data, password=password or User.objects.make_random_password(), googleId=google_id, githubId=github_id)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    googleId=serializers.CharField(write_only=True, required=False)
    githubId=serializers.CharField(write_only=True, required=False)

    def validate(self, data):
        email = data.get("email")
        password=data.get("password")
        google_id=data.get("googleId")
        github_id=data.get("githubId")

        # Login via Google ID
        if google_id:
            user = User.objects.filter(googleId=google_id).first()
            if user:
                return user
            raise serializers.ValidationError("Google account not registered.")
        
        # Login via Github ID
        if github_id:
            user = User.objects.filter(githubId=github_id).first()
            if user:
                return user
            raise serializers.ValidationError("Github account not registered.")
        
        # Fallback to Email/Password auth
        if email and password:
            user = authenticate(email=data["email"], password=data["password"])
            if not user:
                raise serializers.ValidationError("Invalid email or password")
            return user
        
        raise serializers.ValidationError("Login through either email/password, google or github")


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, min_length=6)
    confirm_password = serializers.CharField(write_only=True, min_length=6)

    def validate(self, data):
        if data["new_password"] != data["confirm_password"]:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        password_validation.validate_password(data["new_password"])
        return data
