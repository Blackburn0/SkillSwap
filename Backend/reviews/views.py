from rest_framework import generics
from .models import Review
from .serializers import ReviewSerializer

# List all reviews or create a new one
class ReviewListCreateAPIView(generics.ListCreateAPIView):
  queryset = Review.objects.all()
  serializer_class = ReviewSerializer

# Retrieve, update, or delete a specific review
class ReviewDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
  queryset = Review.objects.all()
  serializer_class = ReviewSerializer
  lookup_field = 'review_id'
