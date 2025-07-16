from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
from django.utils import timezone

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
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    license_number = models.CharField(max_length=50, blank=True, null=True)
    profile_image = models.ImageField(upload_to='agents/', blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    race = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def is_complete(self):
        return all([
            self.first_name,
            self.last_name,
            self.phone_number,
            self.bio,
            self.license_number,
        ])

    def save(self, *args, **kwargs):
        # if license_number is not set, generate a default one
        if not self.license_number:
            self.license_number = f"AGT-{self.user.id:04d}-{timezone.now().strftime('%Y%m%d')}"
        super().save(*args, **kwargs)


class AdminProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='admin_profile'
    )
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    profile_image = models.ImageField(upload_to='admins/', blank=True, null=True)
    department = models.CharField(max_length=100, blank=True, null=True)
    license_number = models.CharField(max_length=50, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    race = models.CharField(max_length=50, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def is_complete(self):
        return all([
            self.first_name,
            self.last_name,
            self.phone_number,
            self.profile_image,
            self.department,
            self.license_number,
            self.bio,
            self.race,
            self.address,
        ])

    def __str__(self):
        return f"{self.user.username} - Admin Profile"
    

    def save(self, *args, **kwargs):
        if not self.license_number:
            self.license_number = f"AGT-{self.user.id:04d}-{timezone.now().strftime('%Y%m%d')}"

        if not self.department:
            self.department = "General Administration"

        super().save(*args, **kwargs)  # ✅ Only one save at the end

    