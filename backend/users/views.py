from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView


from .models import CustomUser, AdminProfile
from .serializers import AgentProfileSerializer, AgentRegistrationSerializer, AdminRegistrationSerializer, LoginSerializer, AdminProfileSerializer, CustomTokenObtainPairSerializer
from .permissions import IsAgent, IsAdmin

# Create your views here.

# Agent Registration view
class RegisterAgentView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = AgentRegistrationSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save(is_agent=True)


class RegisterAdminView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = AdminRegistrationSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = serializer.save(is_admin=True)
        AdminProfile.objects.create(user=user)


class loginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        user = authenticate(username=username, password=password)

        if user is None:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)

        # NEW: Check if profile is complete
        profile = getattr(user, "profile", None)
        is_profile_complete = profile.is_complete if profile else False

        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "is_admin": user.is_admin,
                "is_agent": user.is_agent,
                "is_profile_complete": is_profile_complete
            }
        }, status=status.HTTP_200_OK)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer



# RetrieveUpdateAPIView = allows GET and PUT/PATCH requests
class AgentProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = AgentProfileSerializer
    permission_classes = [IsAgent]

    def get_object(self):
        return self.request.user.profile
    

class AdminProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = AdminProfileSerializer
    permission_classes = [IsAdmin]

    def get_object(self):
        return self.request.user.admin_profile