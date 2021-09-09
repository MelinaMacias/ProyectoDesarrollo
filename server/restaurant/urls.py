
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token

from .views import *

urlpatterns = [

    # Auth endpoints
    path('auth/login', obtain_jwt_token),

    # API
    path('api/', include('restaurant.routes')),
    
    # Graficas y estadísticas
    path('api/estadisticas/', estadisticas_generales),
    path('api/estadisticas-staff/', estadisticas_staff),

    path('api/contacto/', list_mensajes),
    path('api/contacto/create', create_mensaje),
    path('api/contacto/<str:id>/', retrieve_mensajes),
    path('api/contacto/update/<str:id>/', update_mensaje)

]
