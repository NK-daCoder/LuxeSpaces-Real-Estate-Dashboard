from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from .models import CustomUser
from .serializers import AgentProfileSerializer, AgentRegistrationSerializer, AdminRegistrationSerializer, LoginSerializer, UserSerializer
from .permissions import IsAgent

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
        serializer.save(is_admin=True)


# login view (returns JWT + user info)
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

        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": UserSerializer(user).data
        }, status=status.HTTP_200_OK)


# RetrieveUpdateAPIView = allows GET and PUT/PATCH requests
class AgentProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = AgentProfileSerializer
    permission_classes = [IsAgent]

    def get_object(self):
        return self.request.user.profile