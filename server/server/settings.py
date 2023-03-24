"""
Django settings for server project.

Generated by 'django-admin startproject' using Django 4.1.7.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

from pathlib import Path
import environ
import os
import datetime
# Build paths inside the project like this: BASE_DIR / 'subdir'.
env = environ.Env()
environ.Env.read_env()
from corsheaders.defaults import default_headers


# Media Upload imports Cloudinary
import cloudinary
import cloudinary.uploader
import cloudinary.api


BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1','localhost','192.168.255.230','localhost:3000']


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    'django.contrib.sites',

    #CORS HEADERS,
    'corsheaders',

    # Local Apps
    "user.apps.UserConfig",
    "trip.apps.TripConfig",

    # Third Party Apps
    'rest_framework',

    #Authentication
    'rest_framework.authtoken',
    'rest_framework_simplejwt',
    'rest_auth',
    'dj_rest_auth.registration',
    #Oauth2
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',

    # Configured for SSL certificate
    "django_extensions",

    #Media Upload
    "cloudinary",

    #Email Services
    'anymail'

]

MIDDLEWARE = [
    'social_django.middleware.SocialAuthExceptionMiddleware',
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    'corsheaders.middleware.CorsMiddleware',
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "server.urls"

CORS_ORIGIN_WHITELIST = (
'http://localhost:3000',
'http://localhost:8000',
)

CORS_ALLOW_ALL_ORIGINS = True  
CORS_ALLOW_CREDENTIALS = True

CORS_ORIGIN_ALLOW_ALL = True

CORS_ALLOW_HEADERS = list(default_headers) + [
    'X-CSRFTOKEN',
]

CSRF_COOKIE_HTTPONLY = False

SESSION_COOKIE_SECURE = False

CORS_ALLOW_CREDENTIALS = True

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR/'templates'],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "server.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.sqlite3",
#         "NAME": BASE_DIR / "db.sqlite3",
#     }
# }
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": env("DB_NAME"),
        'USER': env("DB_USER"),
        'PASSWORD':env("DB_PASSWORD"),
        'HOST': env("DB_HOST"), 
        'PORT': env("DB_PORT"),
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

#Media and Static Upload
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = "static/"

STATICFILES_DIRS = [
    os.path.join(BASE_DIR,'static')
]

# Cloudinary Configuration
cloudinary.config( 
  cloud_name = env("CLOUDINARY_CLOUD_NAME"), 
  api_key = env("CLOUDINARY_API_KEY"), 
  api_secret = env("CLOUDINARY_API_SECRET") 
)




# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

AUTH_USER_MODEL = "user.CustomUser"

#REST_FRAMEWORK
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        # 'rest_framework.authentication.SessionAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',  # OAuth2, JWT

    )
}

SITE_ID = 2


AUTHENTICATION_BACKENDS = [
    # Needed to login by username in Django admin, regardless of `allauth`
    'django.contrib.auth.backends.ModelBackend',

    # `allauth` specific authentication methods, such as login by e-mail
    'allauth.account.auth_backends.AuthenticationBackend',
        'social_core.backends.google.GoogleOAuth2',

    
]

REST_AUTH_REGISTER_SERIALIZERS = {
    'REGISTER_SERIALIZER': 'user.serializers.RegisterSerializer',
}

REST_AUTH_SERIALIZERS = {
    'USER_DETAILS_SERIALIZER': 'user.serializers.UserSerializer',
}

REST_USE_JWT = True

#Development
# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

#Production
EMAIL_BACKEND = "anymail.backends.mailgun.EmailBackend"


MAILGUN_API_URL = "https://api.mailgun.net/v3"

DEFAULT_FROM_EMAIL = "mailgun@sandbox6c8f49ee575c468da8cc8690b25aa2fb.mailgun.org"
SERVER_EMAIL = "mailgun@sandbox6c8f49ee575c468da8cc8690b25aa2fb.mailgun.org"

ANYMAIL = {
    "MAILGUN_API_KEY": env("MAILGUN_API_KEY"),   
    "MAILGUN_SENDER_DOMAIN": "sandbox6c8f49ee575c468da8cc8690b25aa2fb.mailgun.org",
    "MAILGUN_API_URL": "https://api.mailgun.net/v3",

}



SIMPLE_JWT = {
    'AUTH_HEADER_TYPES': ('Bearer', 'JWT','LOL'), # Adding Bearer for POSTMAN testing,
                                                  # I added LOL as a header cause why not :)

    'USER_ID_FIELD': 'id',
    'AUTH_TOKEN_CLASSES': (
        'rest_framework_simplejwt.tokens.AccessToken',
        ),
    'ACCESS_TOKEN_LIFETIME': datetime.timedelta(days=15),
    'REFRESH_TOKEN_LIFETIME': datetime.timedelta(days=15),
}

ACCOUNT_AUTHENTICATION_METHOD = "username_email"

REST_AUTH = {
    'USE_JWT': True,

}


# For Getting Tokens with Google Auth
JWT_AUTH = {
    'JWT_ENCODE_HANDLER':
    'user.utils.jwt_encode_handler',
}
SOCIALACCOUNT_PROVIDERS = {
    'google':{
        'SCOPE':[
            'profile',
            'email',
            'openid'
        ],
        'AUTH_PARAMS':{
            'access_type':'offline'
        },
        'APP': {
            'client_id': env("GOOGLE_CLIENT_ID"),
            'secret': env("GOOGLE_CLIENT_SECRET"),
            'key': ''
        }
    }
}



# All-auth Settings
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USER_MODEL_USERNAME_FIELD = None

ACCOUNT_EMAIL_VERIFICATION = 'mandatory'


# Abstract API for geolocation
api_key = env("ABSTRACT_API_KEY");


ABSTRACT_API_URL = 'https://ipgeolocation.abstractapi.com/v1/?api_key=' + api_key


#Bing Maps
BING_MAPS_API_KEY = env("BING_MAPS_API_KEY")


