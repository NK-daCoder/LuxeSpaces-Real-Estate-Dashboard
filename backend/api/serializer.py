from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializer import UserSerilizer, NotSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# user registration endpoint
class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerilizer
    permission_classes = [AllowAny]  # Allow any user to register