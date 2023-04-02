from django.urls import re_path,path
from trip.channels import MyConsumer,DriverNotificationConsumer

websocket_urlpatterns = [
    re_path(r'ws/path/$', MyConsumer.as_asgi()),
    path('ws/driver/<int:driver_id>/', DriverNotificationConsumer.as_asgi())
]
