from django.urls import path
from .views import SkillListingView

urlpatterns = [
  path('listings/', SkillListingView.as_view(), name='listings'),
  path('listings/<int:listing_id>/', SkillListingView.as_view(), name='listing-detail'),
]
