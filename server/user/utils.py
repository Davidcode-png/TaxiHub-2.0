import jwt
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.utils import jwt_get_secret_key


def jwt_encode_handler(payload):
    key = api_settings.JWT_PRIVATE_KEY or jwt_get_secret_key(payload)
    return jwt.encode(
        payload,
        key,
        api_settings.JWT_ALGORITHM
    )