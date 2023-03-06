from django.contrib import admin
from .models import Order

trip_list = [Order,]

admin.site.register(trip_list)