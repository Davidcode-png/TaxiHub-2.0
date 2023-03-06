from django.urls import path
from .views import CreateOrderView,getting_ip,get_location

urlpatterns = [
    path('create',CreateOrderView.as_view(),name='create-order'),
    path('ip',getting_ip,name='get-ip'),
    path('loc',get_location,name='get-loc'),
]
