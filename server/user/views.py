import urllib
from requests import Response
import jwt

from django.shortcuts import get_object_or_404
from django.urls import reverse
from django.views import View
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.contrib.auth import get_user_model

from rest_framework import generics
from rest_framework.views import APIView

from rest_framework import permissions
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.authentication import TokenAuthentication

from .serializers import (CustomTokenObtainPairSerializer, DriverProfileSerializer,RegisterSerializer,
                          CustomerProfileSerializer, UserSerializer)
from .models import CustomerProfile,DriverProfile
from .permissions import HasProfileType

from dj_rest_auth.registration.views import SocialLoginView,SocialConnectView
from dj_rest_auth.registration.serializers import SocialLoginSerializer

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client







user = get_user_model()

class OAuth2Error(Exception):
    pass

class UserView(generics.RetrieveAPIView):
    queryset = user.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'

class CustomObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = CustomTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = get_user_model()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class CreateCustomerView(generics.CreateAPIView):
    queryset = CustomerProfile
    serializer_class = CustomerProfileSerializer

class CreateDriverView(generics.CreateAPIView):
    queryset = DriverProfile
    serializer_class = DriverProfileSerializer


# class GoogleLoginView(SocialLoginView):
#     adapter_class = GoogleOAuth2AdapterIdToken
#     serializer_class = SocialLoginSerializer
#     client_class = OAuth2Client
#     callback_url = "http://localhost:8000/rest-auth/google/callback/"


#     def get_serializer(self, *args, **kwargs):
#         serializer_class = self.get_serializer_class()
#         kwargs['context'] = self.get_serializer_context()
#         return serializer_class(*args, **kwargs)

# def google_callback(request):
#     params = urllib.parse.urlencode(request.GET)
#     return redirect(f'https://accounts.google.com/o/oauth2/v2/auth?{params}')


class CustomGoogleOAuth2Adapter(GoogleOAuth2Adapter):
    def complete_login(self, request, app, token, response, **kwargs):
        try:
            identity_data = jwt.decode(
                response["id_token"]["id_token"], #another nested id_token was returned
                options={
                    "verify_signature": False,
                    "verify_iss": True,
                    "verify_aud": True,
                    "verify_exp": True,
                },
                issuer=self.id_token_issuer,
                audience=app.client_id,
            )
        except jwt.PyJWTError as e:
            raise ("Invalid id_token") from e
        login = self.get_provider().sociallogin_from_response(request, identity_data)
        return login

class GoogleLogin(SocialLoginView):
    adapter_class = CustomGoogleOAuth2Adapter
    client_class = OAuth2Client

    serializer_class = SocialLoginSerializer
    callback_url = "http://localhost:3000" # <--- make sure this line is correct!

    # callback_url = "http://127.0.0.1:8000/api/auth/google/callback/"
    #callback_url = 'http://localhost:3000/profile'
   
    
    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)

class GoogleConnect(SocialConnectView):
    adapter_class = GoogleOAuth2Adapter

class RedirectSocial(View):

    def get(self, request, *args, **kwargs):
        code, state = str(request.GET['code']), str(request.GET['state'])
        json_obj = {'code': code, 'state': state}
        print(json_obj)
        return JsonResponse(json_obj)


class RetrieveCustomerView(generics.RetrieveAPIView):
    serializer_class = CustomerProfile

    pass

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

class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class DriverProfileView(generics.RetrieveUpdateDestroyAPIView):

    permission_classes = [IsAuthenticated,HasProfileType]
    authentication_classes = [TokenAuthentication]
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
    

from django.utils.decorators import method_decorator
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie
ensure_csrf = method_decorator(ensure_csrf_cookie)
class setCSRFCookie(APIView):
    permission_classes = []
    authentication_classes = []
    @ensure_csrf
    def get(self, request):
        return Response("CSRF Cookie set.")