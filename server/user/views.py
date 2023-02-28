from requests import Response
from rest_framework import generics
from .serializers import CustomTokenObtainPairSerializer,RegisterSerializer,CustomerProfileSerializer
from .models import CustomerProfile,DriverProfile
from .permissions import IsCustomerProfileUser
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.serializers import SocialLoginSerializer
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.shortcuts import get_object_or_404
from rest_framework import response



user = get_user_model()

class CustomObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = CustomTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = get_user_model()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class GoogleLoginView(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    serializer_class = SocialLoginSerializer
    client_class = OAuth2Client

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)

class CustomerProfileView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated,IsCustomerProfileUser]
    serializer_class = CustomerProfileSerializer
    
    # Gets the query set of the authenticated user
    def get_queryset(self):
        user = self.request.user
        return CustomerProfile.objects.filter(user=user.id)
    
    # Did this to bypass the lookup field in the url
    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, user=self.request.user)
        return obj