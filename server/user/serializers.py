from django.contrib.auth.password_validation import validate_password
from .models import CustomerProfile, DriverProfile
from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer,TokenObtainSerializer
from rest_framework_simplejwt.tokens import RefreshToken
user = get_user_model()


class UserSerilaizer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ['id','username','first_name','last_name','phone_no','is_driver','is_customer']

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
        data['user'] = UserSerilaizer(user_obj).data
        return data

class RegisterSerializer(serializers.ModelSerializer):
    # Making sure the email is unique
    email = serializers.EmailField(
        required = True,
        validators = [UniqueValidator(queryset=get_user_model().objects.all())]
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    tokens = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name','phone_no','is_driver','is_customer','tokens')


    # All fields need to be filled
        extra_kwargs = {
            'first_name': {'required':True},
            'last_name': {'required':True},
            'phone_no':{'required':True}
        }

    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password":"The Password fields do not match"})
        
        if len(str(attrs['phone_no'])) != 11:
            raise serializers.ValidationError({"phone_no":"The phone number should have 11 digits"})

        return attrs
    
    def get_tokens(self,user):
        tokens = RefreshToken.for_user(user)
        refresh = str(tokens)
        access = str(tokens.access_token)
        data = {
            'refresh':refresh,
            'access':access,
        }
        return data
    
    
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