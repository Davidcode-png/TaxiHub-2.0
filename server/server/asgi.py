"""
ASGI config for server project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os
from pathlib import  Path
import sys
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
#import trip.routing
from server.routing import websocket_urlpatterns

ROOT_DIR = Path(__file__).resolve(strict=True).parent.parent
sys.path.append(str(ROOT_DIR / "project"))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")

# application = get_asgi_application()
application = ProtocolTypeRouter(
    {
    "http":get_asgi_application(),
    "websocket":URLRouter(websocket_urlpatterns)
    },
)