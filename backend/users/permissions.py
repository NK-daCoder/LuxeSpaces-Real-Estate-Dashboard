from rest_framework.permissions import BasePermission


"""
Only ensures that agents can access the endpoint
"""

class IsAgent(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_agent


