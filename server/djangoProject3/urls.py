
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    
    path('admin/', admin.site.urls),

    # Restaurant endpoints
    path('', include("restaurant.urls")),

]
