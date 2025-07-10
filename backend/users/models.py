from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models

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

    