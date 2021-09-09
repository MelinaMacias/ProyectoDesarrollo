
import random
import threading

from django.contrib.auth.models import User
from rest_framework import serializers

from restaurant.models import *
from restaurant.utils import *

class NoticeSimpleSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Notice
        fields = "__all__"


class NoticeUserSerializer(serializers.ModelSerializer):

    notice_set = NoticeSimpleSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'notice_set'
        ]


class UserSerializar(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'is_staff',
            'email',
            'is_active',
            'password',
        ]
        read_only_fields = ["noticias"]
        extra_kwargs = {
            "password": { "write_only": True }
        }

    
    def create(self, data):

        tmp_password = random.randint(1000, 9999)

        nuevoUsuario = User.objects.create_user(
            username = data.get("username"),
            first_name = data.get("first_name"),
            last_name = data.get("last_name"),
            is_staff = data.get("is_staff"),
            email = data.get("email"),
            is_active = data.get("is_active"),
            password = str(tmp_password)
        )
        
        email = email_from_template(
            "Bienvenido",
            data.get("email"),
            "Bienvenido",
            "mail/notificacion_cuenta.html",
            data = { "username": data.get("username"), "password": tmp_password }
        )
        
        threading.Thread(target=send_email_now, args=(email, )).start()

        return data

    def update(self, perfil, data):

        perfil.first_name = data.get("first_name", perfil.first_name)
        perfil.last_name = data.get("last_name", perfil.last_name)
        perfil.email = data.get("email", perfil.email)
        perfil.is_active = data.get("is_active", perfil.is_active)

        if(data.get("password")):
            perfil.set_password( data.get("password") )
        
        perfil.save()

        return perfil


class NoticeSerializer(serializers.ModelSerializer):
    
    idUsuario = UserSerializar(read_only = True)

    class Meta:
        model = Notice
        fields = '__all__'
    
    def update(self, notice, data):

        notice.title = data.get("title", notice.title)
        notice.description = data.get("description", notice.description)
        notice.urlimage = data.get("urlimage", notice.urlimage)
        notice.likes = data.get("likes", notice.likes)
        
        notice.save()

        return notice


class NoticiaCreateSerializer(serializers.ModelSerializer):

    def get_serializer_context(self):
        """Extra context provided to the serializer class."""
    
        return {
            'request': self.request,
            'format': self.format_kwarg,
            'view': self
        }
    
    class Meta:
        model = Notice
        fields = [
            'title',
            'description',
            'urlimage'
        ]

    def create(self, data):
        
        newNotice = Notice.objects.create(
            title = data.get("title"),
            description = data.get("description"),
            urlimage = data.get("urlimage"),
            likes = 0,
            idUsuario = self.context['request'].user
        )

        return newNotice


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
        plato.price = data.get("price", plato.price)
        plato.likes = data.get("likes", plato.likes)        
        plato.urlimage = data.get("urlimage", plato.urlimage)
        plato.description = data.get("description", plato.description)
        
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
    

class ContactoSerializer(serializers.Serializer):

    nombre = serializers.CharField(max_length=30)
    mensaje = serializers.CharField()
    celular = serializers.CharField()
    asunto = serializers.CharField()
    email = serializers.EmailField()
    contestado = serializers.BooleanField()
    fecha_creacion = serializers.DateField()

    class Meta:
        fields = "__all__"
        read_only_fields = ["fecha_creacion", "contestado"]

