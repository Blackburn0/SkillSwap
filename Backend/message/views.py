from rest_framework import viewsets, permissions
from .models import Message
from .serializers import MessageSerializer


class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Message.objects.filter(receiver=user).order_by("-timestamp")

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)
