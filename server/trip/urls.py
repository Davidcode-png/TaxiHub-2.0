from django.urls import path
from .views import CreateOrderView,getting_ip,get_location,test,update_coordinates,UpdateLocation

urlpatterns = [
    path('create',CreateOrderView.as_view(),name='create-order'),
    path('ip',getting_ip,name='get-ip'),
    path('loc',get_location,name='get-loc'),
    path('test',test,name='test'),
    path('coord',update_coordinates,name='co-ord'),
    path('location',UpdateLocation.as_view(),name='location'),
]
