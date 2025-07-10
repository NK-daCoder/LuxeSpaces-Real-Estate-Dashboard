from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

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

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')

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


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_agent', 'is_admin')