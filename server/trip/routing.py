from django.urls import re_path,path
from .channels import NotificationConsumer

websocket_urlpatterns = [
    path('', NotificationConsumer.as_asgi()),
]
