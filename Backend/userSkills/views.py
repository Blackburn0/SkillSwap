from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import UserSkill
from .serializers import UserSkillSerializer, AddUserSkillSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSkillsView(APIView):
  permission_classes = [IsAuthenticated]

  def get(self, request):
    user_id = request.query_params.get('user_id')

    if not user_id:
      return Response({"error": "user_id query parameter is required"}, status=400)

    try:
      user = User.objects.get(id=user_id)
    except User.DoesNotExist:
      return Response({"error": "User not found"}, status=404)

    skills = UserSkill.objects.filter(user=user)
    offerings = skills.filter(skill_type='offering')
    desires = skills.filter(skill_type='desiring')

    return Response({
      "user_id": user.id,
      "offerings": UserSkillSerializer(offerings, many=True).data,
      "desires": UserSkillSerializer(desires, many=True).data
    })


class AddUserSkillView(APIView):
  permission_classes = [IsAuthenticated]

  def post(self, request):
    serializer = AddUserSkillSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
      skills = serializer.save()
      return Response({"message": f"{len(skills)} skills added successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


"""
Example GET request
GET /user-skills/?user_id=5
Authorization: Bearer <token>


Response:

{
  "user_id": 5,
  "offerings": [
    {
      "user_skill_id": 10,
      "user_id": 5,
      "skill": 1,
      "skill_type": "offering",
      "proficiency_level": "Expert",
      "details": "I can teach coding."
    }
  ],
  "desires": [
    {
      "user_skill_id": 12,
      "user_id": 5,
      "skill": 3,
      "skill_type": "desiring",
      "proficiency_level": null,
      "details": "Want to learn guitar."
    }
  ]
}
"""