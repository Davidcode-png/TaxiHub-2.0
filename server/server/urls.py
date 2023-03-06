"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include,re_path
from allauth.account.views import confirm_email
from user.views import RedirectSocial
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path('',include('user.urls')),
    path('trip/',include('trip.urls')),
    path('accounts/',include('allauth.urls')),
    path('rest-auth/',include('rest_auth.urls')),
    re_path(r'^rest-auth/registration/account-confirm-email/(?P<key>.+)/$',confirm_email,name='confirm-email'),
    re_path(r'^rest-auth/registration/', include('rest_auth.registration.urls')),

    path('accounts/profile/', RedirectSocial.as_view()),

    path('auth/user', include('djoser.urls')),
    path('auth/jwt', include('djoser.urls.jwt')),
    path('auth/social', include('djoser.social.urls'))

]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)