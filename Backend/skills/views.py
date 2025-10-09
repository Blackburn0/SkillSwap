from rest_framework import viewsets
from .models import Skill
from .serializers import SkillSerializer
from .permissions import IsAuthenticatedOrReadOnly

class SkillViewSet(viewsets.ModelViewSet):
  queryset = Skill.objects.all()
  serializer_class = SkillSerializer
  permission_classes = [IsAuthenticatedOrReadOnly]

# Permission:
# Public Read
# Public can't write