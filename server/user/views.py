from rest_framework import generics
from .serializers import CustomTokenObtainPairSerializer,RegisterSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter

class CustomObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = CustomTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = get_user_model()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class GoogleLoginView(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    