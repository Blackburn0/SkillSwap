from rest_framework import serializers
from .models import UserSkill

class UserSkillSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id', read_only=True)

    class Meta:
      model = UserSkill
      fields = ['user_skill_id', 'user_id', 'skill', 'skill_type', 'proficiency_level', 'details']

class AddUserSkillSerializer(serializers.Serializer):
  offerings = serializers.ListField(child=serializers.DictField(), required=False)
  desires = serializers.ListField(child=serializers.DictField(), required=False)

  def create(self, validated_data):
    user = self.context['request'].user
    created_skills = []

    for skill_data in validated_data.get('offerings', []):
      skill_instance = UserSkill.objects.create(
        user=user,
        skill_id=skill_data['skill_id'],
        skill_type='offering',
        proficiency_level=skill_data.get('proficiency_level'),
        details=skill_data.get('details', '')
      )
      created_skills.append(skill_instance)

    for skill_data in validated_data.get('desires', []):
      skill_instance = UserSkill.objects.create(
        user=user,
        skill_id=skill_data['skill_id'],
        skill_type='desiring',
        proficiency_level=skill_data.get('proficiency_level'),
        details=skill_data.get('details', '')
      )
      created_skills.append(skill_instance)

    return created_skills

  def to_representation(self, instance):
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