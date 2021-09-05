
from django.contrib.auth.models import User
from django.db.models import fields
from rest_framework import serializers
from .models import *

class UserSerializar(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = [
            'username',
            'first_name',
            'last_name'
        ]

class NoticeSerializer(serializers.ModelSerializer):
    
    idUsuario = UserSerializar(read_only = True)

    def get_serializer_context(self):
        """Extra context provided to the serializer class."""
    
        return {
            'request': self.request,
            'format': self.format_kwarg,
            'view': self
        }

    class Meta:
        model = Notice
        fields = '__all__'

    def create(self, data):
        
        newNotice = Notice.objects.create(
            title = data.get("title"),
            description = data.get("description"),
            urlimage = data.get("urlimage"),
            likes = data.get("likes"),
            idUsuario = self.context['request'].user
        )

        return newNotice
    
    def update(self, notice, data):

        notice.title = data.get("title", notice.title)
        notice.description = data.get("description", notice.description)
        notice.urlimage = data.get("urlimage", notice.urlimage)
        notice.likes = data.get("likes", notice.likes)
        
        notice.save()

        return notice

class PlatoCreateSerializer(serializers.ModelSerializer):

    def get_serializer_context(self):
        """Extra context provided to the serializer class."""
    
        return {
            'request': self.request,
            'format': self.format_kwarg,
            'view': self
        }

    class Meta:
        model = Plato
        fields = [
            'title',
            'description',
            'price',
            'urlimage'
        ]
        
    def create(self, data):

        nuevoPlato = Plato.objects.create(
            title = data.get("title"),
            price = data.get("price"),
            description = data.get("description"),
            urlimage = data.get("urlimage"),
            likes = 0,
            idUsuario = self.context['request'].user
        )

        return nuevoPlato

    
class PlatoSerializer(serializers.ModelSerializer):

    idUsuario = UserSerializar(read_only = True)
    
    class Meta:
        model = Plato
        fields = '__all__'


    def update(self, plato, data):

        plato.title = data.get("title", plato.title)
        plato.description = data.get("description", plato.description)
        plato.urlimage = data.get("urlimage", plato.urlimage)
        plato.likes = data.get("likes", plato.likes)        
        plato.save()

        return plato
   
        
class ReservaSerializer(serializers.ModelSerializer):

    class Meta:

        model = Reserva
        fields = '__all__'



class ComentarioSerializer(serializers.ModelSerializer):
    
    class Meta:

        model = Comentario
        fields = '__all__'
    