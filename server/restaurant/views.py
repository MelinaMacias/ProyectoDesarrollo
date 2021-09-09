
import datetime
import threading

import pymongo
from bson.objectid import ObjectId

from django.conf import settings
from django.contrib.auth.models import User

from rest_framework.viewsets import ModelViewSet
from restaurant.serializers import *
from restaurant.models import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from restaurant.utils import *

conn = pymongo.MongoClient("mongodb://localhost/donbolo")
mongoDB = conn['donbolo']
contactoCollection = mongoDB['contacto']
adminMensajeCollection = mongoDB['admin_mensaje']

class NoticiasView(ModelViewSet):
    
    serializer_class = NoticiaCreateSerializer
    queryset = Notice.objects.all()

    def list(self, request):

        datos = NoticeSerializer(self.get_queryset(), many = True)
        
        return Response(datos.data)


    def retrieve(self, request, pk):

        noticia = Notice.objects.get(id = pk)
        datos = NoticeSerializer(noticia)

        return Response(datos.data)
    
    def create(self, request):
        
        data = self.get_serializer(data = request.data)
        data.is_valid(raise_exception=True)
        newNoticia = NoticeSerializer(data.save())
        
        return Response(newNoticia.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk):

        instance = Notice.objects.get(id = pk)
        serializer = NoticeSerializer(instance, data = request.data, partial=True)
        serializer.is_valid(raise_exception = True)
        newNoticia = NoticeSerializer(serializer.save())

        return Response(newNoticia.data, status=status.HTTP_200_OK)
    
    def destroy(self, request, pk):
        instance = Notice.objects.get(id = pk)

        Notice.objects.filter(id = pk).delete()

        return Response( NoticeSerializer(instance).data, status=status.HTTP_200_OK )


class PlatosView(ModelViewSet):

    serializer_class = PlatoCreateSerializer
    queryset = Plato.objects.all()

    def list(self, request):
        datos = PlatoSerializer(self.get_queryset(), many = True)

        return Response(datos.data)

    def retrieve(self, request, pk):

        plato = Plato.objects.get(id = pk)
        datos = PlatoSerializer(plato)

        return Response(datos.data)
    

    def create(self, request):
        
        data = self.get_serializer(data = request.data)
        data.is_valid(raise_exception=True)
        
        newPlato = PlatoSerializer(data.save())
        
        return Response(newPlato.data, status=status.HTTP_201_CREATED)

    
    def update(self, request, pk):

        instance = Plato.objects.get(id = pk)
        serializer = PlatoSerializer(instance, data = request.data, partial=True)
        serializer.is_valid(raise_exception = True)
        newPlato = PlatoSerializer(serializer.save())

        return Response(newPlato.data, status=status.HTTP_200_OK)

    def destroy(self, request,pk):

        instance = Plato.objects.get(id = pk)

        Plato.objects.filter(id = pk).delete()

        return Response( PlatoSerializer(instance).data, status=status.HTTP_200_OK )


@api_view(['GET'])
def estadisticas_generales(request):

    data = {
        "noticias": Notice.objects.all().count(),
        "platos": Plato.objects.all().count(),
        "mensajes": contactoCollection.find({"contestado": False}).count(),
        "reservaciones": Reserva.objects.all().count()
    }
    
    return Response(data, status = status.HTTP_200_OK)

    
@api_view(['GET'])    
def list_mensajes(request):

    mensajes = []
    for mensaje in contactoCollection.find({'contestado': False}):

        mensajes.append({
            "id": str(mensaje.get('_id')),
            "nombre": mensaje.get('nombre'),
            "email": mensaje.get('email'),
            "asunto": mensaje.get('asunto'),
            "celular":mensaje.get('celular'),
            "mensaje": mensaje.get('mensaje'),
            "fecha_creacion": mensaje.get('fecha_creacion')
        })

    return Response(mensajes)


@api_view(["GET"])
def retrieve_mensajes(request, id):
    
    mensaje = contactoCollection.find_one({'_id': ObjectId(id) })
    
    return Response({
        "id": str(mensaje.get('_id')),
        "nombre": mensaje.get('nombre'),
        "email": mensaje.get('email'),
        "asunto": mensaje.get('asunto'),
        "mensaje": mensaje.get('mensaje'),
        "fecha_creacion": mensaje.get('fecha_creacion'),
        "contestado": mensaje.get('contestado')
    })


@api_view(["POST"])
@permission_classes([AllowAny])
def create_mensaje(request):

    request.data["fecha_creacion"] = datetime.datetime.now().strftime("%Y-%m-%d")
    request.data["contestado"] = False

    nuevoMensaje = ContactoSerializer(data = request.data)

    nuevoMensaje.is_valid(raise_exception=True)
    result = contactoCollection.insert_one(nuevoMensaje.data)

    if(result):
        
        email = email_from_template(
            nuevoMensaje.data.get("asunto"),
            settings.CORREO_ADMIN,
            nuevoMensaje.data.get("mensaje"),
            "mail/notificacion_contacto.html"
        )
        
        threading.Thread(target=send_email_now, args=(email, )).start()

        return Response(nuevoMensaje.data, status=status.HTTP_200_OK)

    else:
        return Response({"error": "No se pudo registrar el mensaje de contacto"}, status=status.HTTP_400_BAD_REQUEST)


def email_from_template(asunto, destinatario, mensaje, template_name="", data = {}):
    
    data['mensaje'] = mensaje
    template = get_template(template_name)
    email = EmailMultiAlternatives( 
        asunto, "Nada", to=[ destinatario ]
    )
    
    email.attach_alternative(template.render(data), "text/html")

    return email

def send_email_now(email):

    email.send()


@api_view(["PUT"])
def update_mensaje(request, id):
        
    mensajeActualizado = contactoCollection.update_one({'_id': ObjectId(id) }, { "$set":{"contestado": True} })
    
    if(mensajeActualizado):

        mensaje = contactoCollection.find_one({'_id': ObjectId(id)})
        
        email = email_from_template(
            f'Respuesta a: {mensaje.get("asunto")}',
            mensaje.get("email"),
            request.data.get("mensaje"),
            "mail/respuesta.html"
        )

        adminMensajeCollection.insert_one({
            "id_staff": request.user.id,
            "respuesta": request.data.get("mensaje"),
            "fecha_respuesta": datetime.datetime.now().strftime("%Y-%m-%d"),
            "mensaje": mensaje
        })

        threading.Thread(target=send_email_now, args=(email, )).start()
    
    return Response({"message": "Mensaje contestado"}, status=status.HTTP_200_OK)    


class PerfilView(ModelViewSet):

    serializer_class = UserSerializar
    queryset = User.objects.filter(is_staff = True, is_superuser = False)

    def list(self, request):

        usuarios = self.get_serializer(self.get_queryset(), many = True)

        return Response(usuarios.data)

    
    def retrieve(self, request, pk):
        
        perfil = self.get_serializer( 
            User.objects.get( id = pk if(int(pk) != 0) else request.user.id ))

        return Response(perfil.data)


    def create(self, request):

        cuenta = self.get_serializer(data = request.data)
        cuenta.is_valid(raise_exception=True)

        nuevaCuenta = self.get_serializer(cuenta.save())

        return Response(nuevaCuenta.data, status = status.HTTP_201_CREATED)


    def update(self, request, pk):

        perfil = User.objects.get( id = pk if(int(pk) != 0) else request.user.id )
        perfilSerializer = self.get_serializer(perfil, data = request.data, partial=True)

        perfilSerializer.is_valid(raise_exception = True)

        perfil = self.get_serializer(perfilSerializer.save())

        return Response(perfil.data)

    def destroy(self, request, pk):

        account = User.objects.get(id = pk)
        
        account.is_staff = False
        account.is_active = False
        account.save()

        return Response(self.get_serializer(account).data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def estadisticas_staff(request):

    totalMensajes = contactoCollection.count()
    mensajesContestados = adminMensajeCollection.count()
    mensajesNoContestados = totalMensajes - mensajesContestados

    usuarios_noticias = NoticeUserSerializer(User.objects.filter(is_staff = True), many = True)
    
    estadisticas = {

        "noticias_usuario": [ 
            {
                "usuario": f'{x.get("first_name")} {x.get("last_name")}', 
                "total_noticias": len(x.get("notice_set"))
            } for x in usuarios_noticias.data 
        ],
        
        "mensajes_contacto": [
            {
                "tag": "no_contestados",
                "valor": 100 * mensajesNoContestados / totalMensajes,
                "Released": "2021"
            },
            {
                "tag": "contestados",
                "valor": 100 * mensajesContestados / totalMensajes
            }
            
        ]

    }

    return Response(estadisticas)


class ReservaView(ModelViewSet):

    serializer_class = ReservaSerializer
    queryset = Reserva.objects.all()

    def list(self, request):
        datos = ReservaSerializer(self.get_queryset(), many = True)

        return Response(datos.data)

    def retrieve(self, request, pk):

        plato = Reserva.objects.get(id = pk)
        datos = ReservaSerializer(plato)

        return Response(datos.data)
    

    def create(self, request):
        
        data = self.get_serializer(data = request.data)
        data.is_valid(raise_exception=True)
        
        newReserva = ReservaSerializer(data.save())
        
        return Response(newReserva.data, status=status.HTTP_201_CREATED)

    
    def update(self, request, pk):

        instance = Reserva.objects.get(id = pk)
        serializer = ReservaSerializer(instance, data = request.data, partial=True)
        serializer.is_valid(raise_exception = True)
        newReserva = ReservaSerializer(serializer.save())

        return Response(newReserva.data, status=status.HTTP_200_OK)

    def destroy(self, request,pk):

        instance = Reserva.objects.get(id = pk)

        Reserva.objects.filter(id = pk).delete()

        return Response( ReservaSerializer(instance).data, status=status.HTTP_200_OK )