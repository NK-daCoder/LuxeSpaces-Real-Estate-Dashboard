from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from .models import CustomUser
from .serializers import AgentRegistrerSerializer, AdminRegisterSerializer, LoginSerializer, UserSerializer

# Create your views here.


