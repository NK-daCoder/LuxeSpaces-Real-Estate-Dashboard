from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import AgentProfile, AdminProfile

# User = get_user_model() means we are using the custom user model defined in our app
# which is CustomUser in this case. you'll also find it in the settings.py file
# under AUTH_USER_MODEL = 'users.CustomUser'
User = get_user_model()

"""
UserRegistrationSerializer handles user signup logic.

It:
- Validates that password and password2 match
- Uses Django’s built-in password validators for security
- Automatically uses your custom User model (via get_user_model)
- Removes password2 after validation to avoid saving it
- Creates the user via create_user(), which handles hashing

This serializer is reused by both Agent and Admin registration views,
with role flags (is_agent / is_admin) set in the views, not here.
"""


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField()
    last_name = serializers.CharField()

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name','email', 'password', 'password2')

    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return data
    
    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user
    

class AgentRegistrationSerializer(UserRegistrationSerializer):
    pass


class AdminRegistrationSerializer(UserRegistrationSerializer):
    pass


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user

        profile = getattr(user, "profile", None)
        department = getattr(profile, "department", None) if profile else None
        is_profile_complete = profile.is_complete if profile else False

        data['user'] = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_admin": user.is_admin,
            "is_agent": user.is_agent,
            "is_profile_complete": is_profile_complete,
        }

        if user.is_agent and hasattr(user, 'profile'):
            data['user']['department'] = user.profile.department

        return data



class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)

# UserSerializer Only returns allowed public fields (e.g. no password)
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_agent', 'is_admin')


class AgentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgentProfile
        fields = [
            'first_name',
            'last_name',
            'phone_number',
            'license_number',
            'profile_image',
            'bio',
            'address',
            'race',
            'department'
        ]
        read_only_fields = ['license_number']

        def __str__(self):
            return f"{self.user.username} - Agent Profile"


class AdminProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminProfile
        fields = [
            'first_name',
            'last_name',
            'phone_number',
            'license_number',
            'department',
            'profile_image',
            'bio',
            'address',
            'race',
        ]



