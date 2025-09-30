from django.db import models
from django.contrib.auth import get_user_model
from skills.models import Skill

User = get_user_model()

class SkillListing(models.Model):
  STATUS_CHOICES = [
    ('active', 'Active'),
    ('inactive', 'Inactive'),
    ('paused', 'Paused'),
    ('completed', 'Completed'),
  ]

  listing_id = models.AutoField(primary_key=True)
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='listings')
  skill_offered = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='offer_listings')
  skill_desired = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='desired_listings')
  
  title = models.CharField(max_length=200)
  description = models.TextField()
  status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
  creation_date = models.DateTimeField(auto_now_add=True)
  last_updated = models.DateTimeField(auto_now=True)
  location_preference = models.CharField(max_length=200, blank=True, null=True)

  def __str__(self):
    return f"{self.title} ({self.status})"
