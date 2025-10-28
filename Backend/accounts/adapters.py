# accounts/adapters.py
from allauth.account.adapter import DefaultAccountAdapter
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.conf import settings
from django.contrib.auth import get_user_model
import logging
import uuid

logger = logging.getLogger(__name__)
User = get_user_model()


class CustomAccountAdapter(DefaultAccountAdapter):
    """
    Custom account adapter for regular account operations
    """
    
    def clean_email(self, email):
        """
        Validate email - add logging to see what's happening
        """
        logger.info(f"CustomAccountAdapter.clean_email called with: {email}")
        result = super().clean_email(email)
        logger.info(f"clean_email result: {result}")
        return result
    
    def save_user(self, request, user, form, commit=True):
        """
        Save user - add logging
        """
        logger.info(f"CustomAccountAdapter.save_user called for email: {user.email}")
        logger.info(f"Request path: {request.path}")
        result = super().save_user(request, user, form, commit)
        logger.info(f"save_user completed, user id: {result.user_id if result else 'None'}")
        return result
    
    def get_login_redirect_url(self, request):
        """
        NEW: Determines the final redirect URL after a standard login/signup.
        This is necessary to force the redirect to the frontend URL for API use.
        """
        if request.user.is_authenticated:
            logger.info("Regular user authenticated. Redirecting to LOGIN_REDIRECT_URL.")
            return getattr(settings, 'LOGIN_REDIRECT_URL', '/')
        
        # Fallback to default behavior if user somehow isn't authenticated
        return super().get_login_redirect_url(request)


class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    """
    Custom social account adapter for OAuth login
    """
    
    def pre_social_login(self, request, sociallogin):
        """
        Connect social account to existing user with same email
        """
        logger.info(f"pre_social_login called for {sociallogin.account.provider}")
        
        # If this social account is already connected, skip
        if sociallogin.is_existing:
            logger.info("Social account already exists")
            return
        
        # Try to find user with matching email
        if sociallogin.email_addresses:
            email = sociallogin.email_addresses[0].email
            logger.info(f"Looking for existing user with email: {email}")
            
            try:
                user = User.objects.get(email=email)
                logger.info(f"Found existing user: {user.username}")
                # Connect this social login to the existing user
                sociallogin.connect(request, user)
                logger.info("Successfully connected social account to existing user")
            except User.DoesNotExist:
                logger.info("No existing user found, will create new one")
    
    def populate_user(self, request, sociallogin, data):
        """
        Populate user with data from social provider and ensure unique username
        """
        logger.info("populate_user called")
        user = super().populate_user(request, sociallogin, data)
        
        logger.info(f"User object after super().populate_user: username='{user.username}', email='{user.email}'")
        
        # Ensure username is set - if not, generate from email
        if not user.username:
            logger.info("Username is empty, generating from email")
            # Generate username from email (part before @)
            base_username = user.email.split('@')[0] if user.email else f"user_{uuid.uuid4().hex[:8]}"
            user.username = base_username
            logger.info(f"Generated base username: {base_username}")
        
        # Now check for uniqueness and modify if needed
        original_username = user.username
        counter = 1
        
        # Keep checking until we find a unique username
        while User.objects.filter(username=user.username).exists():
            logger.warning(f"Username '{user.username}' already exists, trying another...")
            user.username = f"{original_username}{counter}"
            counter += 1
        
        logger.info(f"Final unique username: {user.username}")
        return user
    
    # NEW METHOD TO CONTROL FINAL REDIRECT URL
    def get_login_redirect_url(self, request):
        """
        Determines the final redirect URL after a social login/signup.
        Redirects new users to the SIGNUP_REDIRECT_URL.
        """
        
        # 'login' is a property set on the request by allauth during the social login process.
        # It contains the result of the authentication.
        sociallogin = request.session.get('socialaccount_sociallogin')
        
        if sociallogin:
            # Check if this social login resulted in a brand new account creation
            if sociallogin.is_existing is False:
                logger.info("New social user signup detected. Redirecting to SIGNUP_REDIRECT_URL.")
                # This will look up settings.SIGNUP_REDIRECT_URL
                return getattr(settings, 'SIGNUP_REDIRECT_URL', '/')
        
        # If it's an existing user logging in, or if the sociallogin object is gone,
        # fallback to the default login redirect URL (settings.LOGIN_REDIRECT_URL).
        logger.info("Existing social user login or standard flow. Redirecting to LOGIN_REDIRECT_URL.")
        return getattr(settings, 'LOGIN_REDIRECT_URL', '/')