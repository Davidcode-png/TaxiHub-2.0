from django.contrib.auth.password_validation import validate_password
from .models import CustomerProfile, DriverProfile
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError as DjangoValidationError
from django.utils.translation import ugettext_lazy as _

from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer,TokenObtainSerializer
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from allauth.account import app_settings as allauth_settings
from allauth.utils import email_address_exists

user = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ['id','username','first_name','email','last_name','phone_no','is_driver','is_customer']

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(CustomTokenObtainPairSerializer,cls).get_token(user)

        token['username'] = user.username
        return token
    


    # Authentication should be able to accept both email or username
    def validate(self, attrs):
        credentials = {
            'username':'',
            'password':attrs.get("password")
        }

        user_obj = user.objects.filter(email=attrs.get("username")).first() or user.objects.filter(username=attrs.get("username")).first()
        if user_obj:
            credentials['username'] = user_obj.username
        
        data =  super().validate(credentials)
        data['user'] = UserSerializer(user_obj).data
        return data



class RegisterSerializer(serializers.ModelSerializer):
    # Making sure the email is unique
    email = serializers.EmailField(
        required = True,
        validators = [UniqueValidator(queryset=get_user_model().objects.all())]
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    # tokens = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name','phone_no','is_driver','is_customer')#'tokens')


    # All fields need to be filled
        extra_kwargs = {
            'first_name': {'required':True},
            'last_name': {'required':True},
            'phone_no':{'required':False}
        }

    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password":"The Password fields do not match"})
        
        if len(str(attrs['phone_no'])) <= 11:
            raise serializers.ValidationError({"phone_no":"The phone number should have more than 10 digits"})

        return attrs
    
    def validate_password(self, password):
        return get_adapter().clean_password(password)
    
 
    def get_cleaned_data(self):
        return {
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'username': self.validated_data.get('username', ''),
            'password': self.validated_data.get('password', ''),
            'email': self.validated_data.get('email', ''),
            'phone_no': self.validated_data.get('phone_no',''),
            'is_driver':self.validated_data.get('is_driver',''),
            'is_customer':self.validated_data.get('is_customer',''),
        }
    
    def create(self, validated_data):
        user = get_user_model().objects.create(
            username = validated_data['username'],
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            phone_no = validated_data['phone_no'],
            is_driver = validated_data['is_driver'],
            is_customer = validated_data['is_customer'],
        )

        
        user.set_password(validated_data['password'])
        user.save()

        # Creating different profiles based on what the user inputed
        if validated_data['is_customer']:
            user_prof = CustomerProfile.objects.create(
                user = user,
            )
            user_prof.save()
        
        if validated_data['is_driver']:
            driver_prof = DriverProfile.objects.create(
                user=user,
            )
            driver_prof.save()

        return user
    
    def custom_signup(self,request,user):
        pass
    
    def save(self,request):
        # I honestly do not know what to do with the adapters
        # adapter = get_adapter()
        # user = adapter.new_user(request)
        # self.cleaned_data = self.get_cleaned_data()
        # user = adapter.save_user(request, user, self, commit=False)
        
        user = self.create(self.get_cleaned_data())

        user.save()
        #self.custom_signup(request,user)
        setup_user_email(request,user,[])
        return user
    

class CustomerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerProfile
        fields = '__all__'

        # Avoid changing the user or even accessing it
        extra_kwargs = {
            'user':{'read_only':False}
        }

class DriverProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DriverProfile
        fields = '__all__'

        extra_kwargs = {
            'user':{'read_only':False}
        }