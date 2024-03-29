from django.urls import path,re_path,include
from .views import (CustomObtainTokenPairView,RegisterView,GoogleConnect,
                    GoogleLogin,CustomerProfileView,DriverProfileView,
                    setCSRFCookie,UserView,CreateCustomerView,CreateDriverView,EmailTokenObtainPairView,
                    CustomerProfileExist,DriverProfileExist)
from rest_framework_simplejwt.views import TokenRefreshView
from allauth.socialaccount.providers.oauth2.views import OAuth2CallbackView
from .adapters import GoogleOAuth2AdapterIdToken
from allauth.socialaccount.providers.google import views as google_views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('user/<int:id>',UserView.as_view(),name='user'),
    path('create-customer/',CreateCustomerView.as_view(),name='create-customer'),
    path('create-driver/',CreateDriverView.as_view(),name='create-driver'),
    path('login/', CustomObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    # path('rest-auth/google/', GoogleLoginView.as_view(), name='google_login'),
    re_path(r'^rest-auth/google/$', GoogleLogin.as_view(), name='go_login'),
    re_path(r'^rest-auth/google/connect/$', GoogleConnect.as_view(), name='go_connect'),
    path('customer-profile/', CustomerProfileView.as_view(), name='customer-profile'),
    path('driver-profile/', DriverProfileView.as_view(), name='driver-profile'),
    path('profile-exist/', CustomerProfileExist.as_view(), name='profile-exist'),
    path('driver-exist/', DriverProfileExist.as_view(), name='driver-exist'),
    path(
        "auth/google/callback/",
        OAuth2CallbackView.adapter_view(GoogleOAuth2AdapterIdToken),
        name="google_callback"
    ),
    path('csrf_cookie', setCSRFCookie.as_view()),

    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("token/", EmailTokenObtainPairView.as_view(), name="token_obtain_pair"),

]