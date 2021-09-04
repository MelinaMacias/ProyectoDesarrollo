
from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token

from .views import *

urlpatterns = [

    # Auth endpoints
    path('auth/login', obtain_jwt_token),

    # API
    path('api/mensajes', contactos, name='contact_post'),
    path("api/noticias", noticias, name = 'api_noticias'),
    path("api/platos", platos, name = 'api_platos'),
    
]
