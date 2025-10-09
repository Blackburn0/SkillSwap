from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAuthenticatedOrReadOnly(BasePermission):
  """
    Allow read-only requests for anyone.
    Write requests are allowed only for authenticated users.
  """
  def has_permission(self, request, view):
    if request.method in SAFE_METHODS:  # GET, HEAD, OPTIONS
      return True
    return request.user and request.user.is_authenticated
