from django.urls import path
from .views import ReviewListCreateAPIView, ReviewDetailAPIView

urlpatterns = [
  path('reviews/', ReviewListCreateAPIView.as_view(), name='review-list-create'),
  path('reviews/<int:review_id>/', ReviewDetailAPIView.as_view(), name='review-detail'),
]
