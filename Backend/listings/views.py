from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import SkillListing
from .serializers import SkillListingSerializer
from django.shortcuts import get_object_or_404

class SkillListingView(APIView):
  """
  GET: public, returns active listings
  POST: authenticated, create a listing
  PUT/PATCH: authenticated, update own listing
  DELETE: authenticated, delete own listing
  """
  def get_permissions(self):
    if self.request.method == 'GET':
        return [AllowAny()]
    return [IsAuthenticated()]

  def get(self, request):
    listings = SkillListing.objects.filter(status='active')
    serializer = SkillListingSerializer(listings, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

  def post(self, request):
    serializer = SkillListingSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save(user=request.user)
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def put(self, request, listing_id):
    listing = get_object_or_404(SkillListing, listing_id=listing_id, user=request.user)
    serializer = SkillListingSerializer(listing, data=request.data, partial=False)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def patch(self, request, listing_id):
    listing = get_object_or_404(SkillListing, listing_id=listing_id, user=request.user)
    serializer = SkillListingSerializer(listing, data=request.data, partial=True)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request, listing_id):
    listing = get_object_or_404(SkillListing, listing_id=listing_id, user=request.user)
    listing.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
