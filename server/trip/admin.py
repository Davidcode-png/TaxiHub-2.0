from django.contrib import admin
from .models import Order,Notification

trip_list = [Order,Notification]

admin.site.register(trip_list)