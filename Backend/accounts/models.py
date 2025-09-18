from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)

        # Merge accounts for multiple signins
        # If a user signs in with Google or GitHub later, check if a user with the same email exists.
        # If so, update that user with the new provider's ID instead of creating a duplicate account.
        existing_user = self.model.objects.filter(email=email).first()
        if existing_user:
            # Update IDs if provided
            google_id = extra_fields.get("googleId")
            github_id = extra_fields.get("githubId")
            if google_id and not existing_user.googleId:
                existing_user.googleId = google_id
            if github_id and not existing_user.githubId:
                existing_user.githubId = github_id
            existing_user.save(using=self._db)
            return existing_user

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, max_length=255)
    googleId = models.CharField(unique=True, max_length=255, blank=True, null=True)
    githubId = models.CharField(unique=True, max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
