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

    def validate(self, data):
        email = data.get("email")
        google_id = data.get("googleId")
        github_id = data.get("githubId")
        
        # 1. Check for existing user using normalized email
        user = User.objects.filter(email=email).first()
        
        if email:
            # Simple version: use email part before '@'
            generated_username = email.split('@')[0] 
            
            # Make it unique if necessary
            base_username = generated_username
            counter = 1
            while User.objects.filter(username=generated_username).exists():
                generated_username = f"{base_username}_{counter}"
                counter += 1
            
            # Add the generated username to the validated data
            data['username'] = generated_username
            
        return data # Returning data here allows the request to proceed to create/update
        
        return data

    def create(self, validated_data):
        username = validated_data.pop("username")
        
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

        return User.objects.create_user(**validated_data, username=username, password=password or User.objects.make_random_password(), googleId=google_id, githubId=github_id)


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
        user = None

        # Login via Google ID
        if google_id:
            user = User.objects.filter(googleId=google_id).first()
            if not user:
                raise serializers.ValidationError("Google account not registered.")
        
        # Login via Github ID
        elif github_id:
            user = User.objects.filter(githubId=github_id).first()
            if not user:
                raise serializers.ValidationError("Github account not registered.")
        
        # Fallback to Email/Password auth
        elif email and password:
            user = authenticate(email=data["email"], password=data["password"])
            if not user:
                raise serializers.ValidationError("Invalid email or password")
        
        # Handle general failure if no credentials were provided
        else:
            raise serializers.ValidationError("Login through either email/password, google or github")

        # Attach the authenticated 'user' object to the data dictionary
        data['user'] = user 
        return data 

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, min_length=6)
    confirm_password = serializers.CharField(write_only=True, min_length=6)

    def validate(self, data):
        if data["new_password"] != data["confirm_password"]:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        password_validation.validate_password(data["new_password"])
        return data
