from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

# Create your models here.

# custom user model setup
""""
This code defines a custom user model for a Django application.
It extends the built-in AbstractUser model to add two boolean fields:
- is_agent: Indicates if the user is an agent.
- is_admin: Indicates if the user is an admin.
This allows for more flexible user management, enabling the application to differentiate between regular users, 
agents, and administrators.
it inherits all build-in user fields like username, password, email, first_name, last_name, etc.
adding your own fields like is_agent and is_admin.
"""
class CustomUser(AbstractUser):
    is_agent = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

class AgentProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    license_number = models.CharField(max_length=50, blank=True, null=True)
    profile_image = models.ImageField(upload_to='agents/', blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__ (self):
        return f"{self.user.username} - Agent Profile"

    