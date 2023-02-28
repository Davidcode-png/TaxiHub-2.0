from django.urls import path
from .views import CustomObtainTokenPairView,RegisterView,GoogleLoginView,CustomerProfileView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('login/', CustomObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('rest-auth/google/', GoogleLoginView.as_view(), name='google_login'),
    path('customer-profile/', CustomerProfileView.as_view(), name='customer-profile'),
]