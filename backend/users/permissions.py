from rest_framework.permissions import BasePermission
# This file defines custom permissions for user roles in the application.
# Only ensures that agents can access the endpoint
class IsAgent(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_agent
    
# Allows admins to access the endpoint
class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_admin



