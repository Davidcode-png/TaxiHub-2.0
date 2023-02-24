from django.db import models
from django.contrib.auth.models import AbstractUser,User
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager

class CustomUser(AbstractUser):
    email = models.EmailField(_("email address"), unique=True)
    phone_no = models.IntegerField(blank=True,null=True)
    is_driver = models.BooleanField('driver status',default=False)
    is_customer = models.BooleanField('customer status',default=False)

    objects = CustomUserManager()

    def __str__(self) -> str:
        return self.email

class CustomerProfile(models.Model):
    RATING_CHOICES = zip(range(1,6),range(1,6))
    user = models.OneToOneField(CustomUser,on_delete=models.CASCADE,related_name='profile')
    age = models.IntegerField(blank=True,null=True)
    bio = models.TextField(blank=True)
    location = models.CharField(max_length=255,blank=True)
    rating = models.IntegerField(choices=RATING_CHOICES,blank=True,default=5)
    prof_pic = models.URLField(blank=True)

    def __str__(self) -> str:
        return f'{self.user.username}'


class DriverProfile(models.Model):
    RATING_CHOICES = zip(range(1,6),range(1,6))
    user = models.OneToOneField(CustomUser,on_delete=models.CASCADE,related_name='driver_profile')
    age = models.IntegerField(blank=True,null=True)
    bio = models.TextField(blank=True)
    location = models.CharField(max_length=255,blank=True)
    rating = models.IntegerField(choices=RATING_CHOICES,blank=True,default=5)
    car_brand = models.CharField(max_length=80)
    car_model = models.CharField(max_length=150)
    car_plate_no = models.CharField(max_length=11)
    prof_pic = models.URLField(blank=True)

    def __str__(self) -> str:
        return f'{self.user.username}'
