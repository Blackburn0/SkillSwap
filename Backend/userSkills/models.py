from django.db import models
from django.contrib.auth import get_user_model
from skills.models import Skill

User = get_user_model()

class UserSkill(models.Model):
    SKILL_TYPE_CHOICES = [
      ('offering', 'Offering'),
      ('desiring', 'Desiring'),
    ]
    PROFICIENCY_LEVEL_CHOICES = [
      ('Beginner', 'Beginner'),
      ('Intermediate', 'Intermediate'),
      ('Expert', 'Expert'),
    ]

    user_skill_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='skills')
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='users')
    skill_type = models.CharField(max_length=10, choices=SKILL_TYPE_CHOICES)
    proficiency_level = models.CharField(max_length=12, choices=PROFICIENCY_LEVEL_CHOICES, blank=True, null=True)
    details = models.TextField(blank=True, null=True)

    class Meta:
      unique_together = ('user', 'skill', 'skill_type')

    def __str__(self):
      return f"{self.user.username} - {self.skill.skill_name} ({self.skill_type})"