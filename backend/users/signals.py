from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import CustomUser, AgentProfile

@receiver(post_save, sender=CustomUser)
def create_agent_profile(sender, instance, created, **kwargs):
    if created and instance.is_agent:
        AgentProfile.objects.create(user=instance)
