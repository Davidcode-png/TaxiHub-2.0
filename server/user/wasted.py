

# class RegisterSerializer(serializers.ModelSerializer):
#     # Making sure the email is unique
#     email = serializers.EmailField(
#         required = True,
#         validators = [UniqueValidator(queryset=get_user_model().objects.all())]
#     )
#     password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
#     password2 = serializers.CharField(write_only=True, required=True)
#     # tokens = serializers.SerializerMethodField()

#     class Meta:
#         model = get_user_model()
#         fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name','phone_no','is_driver','is_customer')#'tokens')


#     # All fields need to be filled
#         extra_kwargs = {
#             'first_name': {'required':True},
#             'last_name': {'required':True},
#             'phone_no':{'required':True}
#         }

    
#     def validate(self, attrs):
#         if attrs['password'] != attrs['password2']:
#             raise serializers.ValidationError({"password":"The Password fields do not match"})
        
#         if len(str(attrs['phone_no'])) <= 11:
#             raise serializers.ValidationError({"phone_no":"The phone number should have more than 10 digits"})

#         return attrs
    
#     def validate_password1(self, password):
#         return get_adapter().clean_password(password)
    
#     # def get_tokens(self,user):
#     #     tokens = RefreshToken.for_user(user)
#     #     refresh = str(tokens)
#     #     access = str(tokens.access_token)
#     #     data = {
#     #         'refresh':refresh,
#     #         'access':access,
#     #     }
#     #     return data

#     def get_cleaned_data(self):
#         return {
#             'first_name': self.validated_data.get('first_name', ''),
#             'last_name': self.validated_data.get('last_name', ''),
#             'username': self.validated_data.get('username', ''),
#             'password1': self.validated_data.get('password1', ''),
#             'email': self.validated_data.get('email', ''),
#             'phone_no': self.validated_data.get('phone_no',''),
#             'is_driver':self.validated_data.get('is_driver',''),
#             'is_customer':self.validated_data.get('is_customer',''),
#         }
    
#     def create(self, validated_data):
#         user = get_user_model().objects.create(
#             username = validated_data['username'],
#             email = validated_data['email'],
#             first_name = validated_data['first_name'],
#             last_name = validated_data['last_name'],
#             phone_no = validated_data['phone_no'],
#             is_driver = validated_data['is_driver'],
#             is_customer = validated_data['is_customer'],
#         )

        

#         user.set_password(validated_data['password'])
#         user.save()

#         # Creating different profiles based on what the user inputed
#         if validated_data['is_customer']:
#             user_prof = CustomerProfile.objects.create(
#                 user = user,
#             )
#             user_prof.save()
        
#         if validated_data['is_driver']:
#             driver_prof = DriverProfile.objects.create(
#                 user=user,
#             )
#             driver_prof.save()

#         return user
    
#     def custom_signup(self,request,user):
#         pass
    
#     def save(self,request):
#         adapter = get_adapter()
#         user = adapter.new_user(request)
#         self.cleaned_data = self.get_cleaned_data()
#         user = adapter.save_user(request, user, self, commit=False)

#         if "password1" in self.cleaned_data:
#             adapter.clean_password(self.cleaned_data['password1'],user=user)
#             # except DjangoValidationError as exec:
#             #     raise serializers.ValidationError(
#             #         detail=serializers.as_serializer_error(exec)
#             #     )

#         user.save()
#         self.custom_signup(request,user)
#         setup_user_email(request,user,[])
#         return user
    




   # def get_tokens(self,user):
    #     tokens = RefreshToken.for_user(user)
    #     refresh = str(tokens)
    #     access = str(tokens.access_token)
    #     data = {
    #         'refresh':refresh,
    #         'access':access,
    #     }
    #     return data


# #CELERY
# CELERY_BROKER_URL = "redis://localhost:6379"
# CELERY_ACCEPT_CONTENT = ['application/json']
# CELERY_RESULT_SERIALIZER = 'json'
# CELERY_TASK_SERIALIZER = 'json'
# CELERY_TIMEZONE = 'Africa/Lagos'
# # CELERY_RESULT_BACKEND = "redis://localhost:6379"

# SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = env("GOOGLE_CLIENT_ID")

# SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET =  env("GOOGLE_CLIENT_SECRET")




# white_list = ['http://localhost:8000/accounts/profile'] # URL you add to google developers console as allowed to make redirection

# DJOSER = {
#     "LOGIN_FIELD": "email", # Field we use to login on extended User model
#     'SOCIAL_AUTH_TOKEN_STRATEGY': 'djoser.social.token.jwt.TokenStrategy',

#     'SERIALIZERS': {
#         'user': 'user.serializers.UserSerializer', # Custom Serializer to show more user data
#         'current_user': 'user.serializers.UserSerializer', # Custom Serializer to show more user data
#     },
#     'SOCIAL_AUTH_ALLOWED_REDIRECT_URIS': white_list # Redirected URL we listen on google console
# }

# SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = [
#     'https://www.googleapis.com/auth/userinfo.email',
#     'https://www.googleapis.com/auth/userinfo.profile',
#     'openid'
# ]

# SOCIAL_AUTH_GOOGLE_OAUTH2_EXTRA_DATA = ['first_name', 'last_name']


import base64
import json


def parse_id_token(token: str) -> dict:
    parts = token.split(".")
    if len(parts) != 3:
        raise Exception("Incorrect id token format")

    payload = parts[1]
    padded = payload + '=' * (4 - len(payload) % 4)
    decoded = base64.b64decode(padded)
    return json.loads(decoded)



