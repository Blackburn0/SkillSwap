from django.urls import path
from .views import AddUserSkillView, PublicUserSkillsView

urlpatterns = [
  path('user-skills/add-skills/', AddUserSkillView.as_view(), name='add-user-skills'),
  path('user-skills/<int:user_id>/', PublicUserSkillsView.as_view(), name='public-user-skills'),
]
