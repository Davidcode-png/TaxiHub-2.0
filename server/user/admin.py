from django.contrib import admin
from .models import CustomUser,CustomerProfile,DriverProfile

admin_list = [CustomUser,CustomerProfile,DriverProfile]

admin.site.register(admin_list)
