from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserBlockViewSet

router = DefaultRouter()
router.register(r'blocks', UserBlockViewSet, basename='userblock')

urlpatterns = [
  path('', include(router.urls)),
]

"""
  Available Endpoints
  GET	/api/v1/blocks/	List all users that you have blocked
  POST	/api/v1/blocks/	Block another user
  GET	/api/v1/blocks/<id>/	Get details of one specific block
  DELETE	/api/v1/blocks/<id>/ Unblock a user (delete that block record)
"""