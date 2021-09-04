
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token

from .views import *

urlpatterns = [

    # Auth endpoints
    path('auth/login', obtain_jwt_token),

    # API
    path('api/mensajes', contactos, name='contact_post'),
    path('api/', include('restaurant.routes'))

]
