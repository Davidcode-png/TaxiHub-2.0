from requests import Response
from rest_framework import generics
from .serializers import CustomTokenObtainPairSerializer, DriverProfileSerializer,RegisterSerializer,CustomerProfileSerializer
from .models import CustomerProfile,DriverProfile
from .permissions import HasProfileType
from .adapters import GoogleOAuth2AdapterIdToken

from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from dj_rest_auth.registration.views import SocialLoginView,SocialConnectView
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

# class GoogleLoginView(SocialLoginView):
#     adapter_class = GoogleOAuth2AdapterIdToken
#     serializer_class = SocialLoginSerializer
#     client_class = OAuth2Client
#     callback_url = "http://localhost:8000/rest-auth/google/callback/"


#     def get_serializer(self, *args, **kwargs):
#         serializer_class = self.get_serializer_class()
#         kwargs['context'] = self.get_serializer_context()
#         return serializer_class(*args, **kwargs)

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client

    # serializer_class = SocialLoginSerializer
    callback_url = "http://127.0.0.1:8000/"


    # def get_serializer(self, *args, **kwargs):
    #     serializer_class = self.get_serializer_class()
    #     kwargs['context'] = self.get_serializer_context()
    #     return serializer_class(*args, **kwargs)

class GoogleConnect(SocialConnectView):
    adapter_class = GoogleOAuth2Adapter

class CustomerProfileView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated,HasProfileType]
    serializer_class = CustomerProfileSerializer
    
    # Gets the query set of the authenticated user
    def get_queryset(self):

        user = self.request.user
        print(self.request)
        return CustomerProfile.objects.filter(user=user.id)
    
    # Did this to bypass the lookup field in the url
    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, user=self.request.user)
        return obj

    
class DriverProfileView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated,HasProfileType]
    serializer_class = DriverProfileSerializer
    
    # Gets the query set of the authenticated user
    def get_queryset(self):

        user = self.request.user
        print(self.request)
        return DriverProfile.objects.filter(user=user.id)
    
    # Did this to bypass the lookup field in the url
    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, user=self.request.user)
        return obj