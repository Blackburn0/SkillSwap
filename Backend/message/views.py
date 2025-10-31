from rest_framework import viewsets, permissions, decorators, response, status
from django.db.models import Q
from .models import Message
from .serializers import MessageSerializer


class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # All messages sent OR received by the user
        return Message.objects.filter(Q(sender=user) | Q(receiver=user)).order_by("timestamp")

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

    @decorators.action(detail=False, methods=["get"], url_path="conversation/(?P<user_id>[^/.]+)")
    def get_conversation(self, request, user_id=None):
        """
        Custom endpoint:
        GET /api/v1/messages/conversation/<user_id>/
        Returns all messages between the logged-in user and the given user.
        """
        current_user = request.user

        messages = Message.objects.filter(
            Q(sender=current_user, receiver_id=user_id)
            | Q(sender_id=user_id, receiver=current_user)
        ).order_by("timestamp")

        serializer = self.get_serializer(messages, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
