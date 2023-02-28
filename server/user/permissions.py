from rest_framework import permissions
from django.contrib.auth import get_user_model
from .models import CustomerProfile

user = get_user_model()

class IsCustomerProfileUser(permissions.BasePermission):
    """
    Checks if the authenticated user created the object
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user 