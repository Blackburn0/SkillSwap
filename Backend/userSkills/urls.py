from django.urls import path
from .views import AddUserSkillView, UserSkillsView

urlpatterns = [
  path('add-skills/', AddUserSkillView.as_view(), name='add-user-skills'),
  path('', UserSkillsView.as_view(), name='userSkills'),
]
