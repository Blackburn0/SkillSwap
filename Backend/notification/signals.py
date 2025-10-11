from django.db.models.signals import post_save
from django.dispatch import receiver
from message.models import Message
from .models import Notification

@receiver(post_save, sender=Message)
def create_message_notification(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(
            user=instance.receiver,
            source_id=instance.message_id,
            type="new_message",
            message=f"New message from {instance.sender.username}",
            link_url=f"/messages/{instance.message_id}/"
        )
