from rest_framework import serializers
from userSkills.models import UserSkill
from skills.models import Skill


class UserSkillSerializer(serializers.ModelSerializer):
  user_id = serializers.IntegerField(source='user.id', read_only=True)

  class Meta:
    model = UserSkill
    fields = ['user_skill_id', 'user_id', 'skill', 'skill_type', 'proficiency_level', 'details']


class AddUserSkillSerializer(serializers.Serializer):
  offerings = serializers.ListField(child=serializers.DictField(), required=False)
  desires = serializers.ListField(child=serializers.DictField(), required=False)

  def create(self, validated_data):
    """
    Create or update UserSkill instances for offerings and desires.
    Automatically creates a Skill if it doesn't exist.
    """
    user = self.context['request'].user
    created_skills = []

    def add_skills(skill_list, skill_type):
      for skill_data in skill_list:
        skill_id = skill_data.get('skill_id')
        skill_name = skill_data.get('skill_name', f"Skill {skill_id}")
        category = skill_data.get('category', 'General')
        description = skill_data.get('description', '')

        # Get or create Skill safely
        skill_obj, _ = Skill.objects.get_or_create(
          skill_id=skill_id,
          defaults={
            'skill_name': skill_name,
            'category': category,
            'description': description
          }
        )

        # Create or update UserSkill
        skill_instance, _ = UserSkill.objects.update_or_create(
          user=user,
          skill=skill_obj,
          skill_type=skill_type,
          defaults={
            'proficiency_level': skill_data.get('proficiency_level', ''),
            'details': skill_data.get('details', '')
          }
        )
        created_skills.append(skill_instance)

    # Add offerings and desires
    add_skills(validated_data.get('offerings', []), 'offering')
    add_skills(validated_data.get('desires', []), 'desiring')

    return created_skills

  def to_representation(self, instance):
      """
      Serialize the list of UserSkill model instances
      """
      return UserSkillSerializer(instance, many=True).data




"""
Example Response

POST /user-skills/add-skills/ with:

{
  "offerings": [
    {"skill_id": 1, "proficiency_level": "Expert"},
    {"skill_id": 2}
  ],
  "desires": [
    {"skill_id": 3, "details": "Want to learn guitar"}
  ]
}

Response:

[
  {
    "user_skill_id": 10,
    "user_id": 5,
    "skill": 1,
    "skill_type": "offering",
    "proficiency_level": "Expert",
    "details": ""
  },
  {
    "user_skill_id": 11,
    "user_id": 5,
    "skill": 2,
    "skill_type": "offering",
    "proficiency_level": null,
    "details": ""
  },
  {
    "user_skill_id": 12,
    "user_id": 5,
    "skill": 3,
    "skill_type": "desiring",
    "proficiency_level": null,
    "details": "Want to learn guitar"
  }
]
"""