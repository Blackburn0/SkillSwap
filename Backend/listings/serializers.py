from rest_framework import serializers
from .models import SkillListing

class SkillListingSerializer(serializers.ModelSerializer):
  user_id = serializers.IntegerField(source='user.id', read_only=True)
  skill_offered_name = serializers.CharField(source='skill_offered.skill_name', read_only=True)
  skill_desired_name = serializers.CharField(source='skill_desired.skill_name', read_only=True)

  class Meta:
    model = SkillListing
    fields = [
      'listing_id', 'user_id', 'skill_offered', 'skill_offered_name',
      'skill_desired', 'skill_desired_name', 'title', 'description',
      'status', 'creation_date', 'last_updated', 'location_preference'
    ]
