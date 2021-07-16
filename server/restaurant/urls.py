
from django.urls import path

from .views import *

urlpatterns = [

    path('',Index.as_view(),name='home'),
    
    path("notices",NoticeListView.as_view(),name='notice'),
    path('notices/create',NoticeCreateView.as_view(),name='notice-create'),
    path('notice/edit/<int:pk>', NoticeEditView.as_view(), name='notice-update'),
    path('notice/delete/<int:pk>', NoticeDeleteView.as_view(), name='notice-delete'),
    
    path('platos',PlatoListView.as_view(),name='plato'),
    path('platos/create',PlatoCreateView.as_view(),name='plato-create'),
    path('platos/<int:pk>',PlatoEditView.as_view(),name='plato-edit'),
    path('platos/delete/<int:pk>', PlatosDeleteView.as_view(), name='plato-delete'),

    path('mensajes',ContactListView.as_view(),name='contact'),
    path('mensajes/detail/<int:pk>',ContactDetailView.as_view(),name='contact-detail'),

    # API
    path("api/noticias", noticias, name = 'api_noticias'),
    path("api/platos", platos, name = 'api_platos'),
    
]
