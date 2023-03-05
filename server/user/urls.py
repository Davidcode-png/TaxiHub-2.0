from django.urls import path,re_path,include
from .views import (CustomObtainTokenPairView,RegisterView,GoogleConnect,
                    GoogleLogin,CustomerProfileView,DriverProfileView,google_callback)
from rest_framework_simplejwt.views import TokenRefreshView
from allauth.socialaccount.providers.oauth2.views import OAuth2CallbackView
from .adapters import GoogleOAuth2AdapterIdToken
from allauth.socialaccount.providers.google import views as google_views


urlpatterns = [
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('login/', CustomObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    # path('rest-auth/google/', GoogleLoginView.as_view(), name='google_login'),
    re_path(r'^rest-auth/google/$', GoogleLogin.as_view(), name='go_login'),
    re_path(r'^rest-auth/google/connect/$', GoogleConnect.as_view(), name='go_connect'),
    re_path(r'^rest-auth/google/$', google_callback, name='google_callback'),

    path('customer-profile/', CustomerProfileView.as_view(), name='customer-profile'),
    path('driver-profile/', DriverProfileView.as_view(), name='driver-profile'),
    path(
        "auth/google/callback/",
        OAuth2CallbackView.adapter_view(GoogleOAuth2AdapterIdToken),
        name="google_callback"
    ),
]