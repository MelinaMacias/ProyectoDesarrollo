
import calendar
import datetime
import json
from django.views.generic.base import View

from rest_framework import viewsets
import pymongo
from bson.objectid import ObjectId

import threading

from django.conf import settings
from django.core.mail import EmailMessage

from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.views.generic import ListView, CreateView, UpdateView, DeleteView, TemplateView, DetailView

from rest_framework.viewsets import ModelViewSet
from .serializers import *
from .forms import NoticeForm, PlatoForm
from .models import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.decorators import action
from rest_framework.viewsets import ViewSet

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

    def update(self,request,pk):

        instance = Notice.objects.get(id = pk)
        serializer = NoticeSerializer(instance, data = request.data, partial=True)
        serializer.is_valid(raise_exception = True)
        newNoticia = NoticeSerializer(serializer.save())

        return Response(newNoticia.data, status=status.HTTP_200_OK)
    
    def destroy(self,request,pk):
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
def estadisticas(request):

    data = {
        "noticias": Notice.objects.all().count(),
        "platos": Plato.objects.all().count(),
        "mensajes": Contacto.objects.all().count(),
        "reservaciones": Reserva.objects.all().count()
    }
    
    return Response(data, status = status.HTTP_200_OK)


# class ContactoMensajeView(View):
    
#     @method_decorator(csrf_exempt)
#     def dispatch(self, request, *args, **kwargs):
#         return super().dispatch(request, *args, **kwargs)

#     def get(self,request,id=0):
#         if id>0:
#             mensaje = contactoCollection.find_one({'_id': ObjectId(id) })       
#             return JsonResponse({
#                 "id": str(mensaje.get('_id')),
#                 "nombre": mensaje.get('nombre'),
#                 "email": mensaje.get('email'),
#                 "asunto": mensaje.get('asunto'),
#                 "mensaje": mensaje.get('mensaje'),
#                 "fecha_creacion": mensaje.get('fecha_creacion'),
#                 "contestado": mensaje.get('contestado')
#             })
#         else:
#             Lmensaje = contactoCollection.find()
#             if len(Lmensaje)>0:
#                 mensajes = []
#                 for mensaje in Lmensaje:
#                     mensajes.append({
#                         "id": str(mensaje.get('_id')),
#                         "nombre": mensaje.get('nombre'),
#                         "email": mensaje.get('email'),
#                         "asunto": mensaje.get('asunto'),
#                         "celular":mensaje.get('celular'),
#                         "mensaje": mensaje.get('mensaje'),
#                         "fecha_creacion": mensaje.get('fecha_creacion')
#                     })
#                 return JsonResponse(mensajes)

#     def post(self,request):
#         request.data["fecha_creacion"] = datetime.datetime.now().strftime("%Y-%m-%d")
#         request.data["contestado"] = False
#         nuevoMensaje = ContactoSerializer(data = request.data)
#         nuevoMensaje.is_valid(raise_exception=True)
#         result = contactoCollection.insert_one(nuevoMensaje.data)
#         if(result):
#             email = EmailMessage(
#                 nuevoMensaje.data.get("asunto"),
#                 nuevoMensaje.data.get("mensaje"),
#                 to=[ settings.CORREO_ADMIN ]
#             )
#             threading.Thread(target="send_email_now", args=(email, )).start()
#             return JsonResponse("Registro Exitoso")
#         else:
#             return JsonResponse("Registro Fallido")



#     def put(self,request,id):
#         contactoCollection.update_one({'_id': ObjectId(id) }, { "$set":{"contestado": True} })
#         return JsonResponse("Registro Exitoso")
    
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
def create_mensaje(request):

    request.data["fecha_creacion"] = datetime.datetime.now().strftime("%Y-%m-%d")
    request.data["contestado"] = False

    nuevoMensaje = ContactoSerializer(data = request.data)

    nuevoMensaje.is_valid(raise_exception=True)
    result = contactoCollection.insert_one(nuevoMensaje.data)

    if(result):
        
        email = EmailMessage(
            nuevoMensaje.data.get("asunto"),
            nuevoMensaje.data.get("mensaje"),
            to=[ settings.CORREO_ADMIN ]
        )
        
        threading.Thread(target=send_email_now, args=(email, )).start()

        return Response(nuevoMensaje.data, status=status.HTTP_200_OK)

    else:
        return Response({"error": "No se pudo registrar el mensaje de contacto"}, status=status.HTTP_400_BAD_REQUEST)


def send_email_now(email):

    email.send()


@api_view(["PUT"])
def update_mensaje(request, id):
        
    mensajeActualizado = contactoCollection.update_one({'_id': ObjectId(id) }, { "$set":{"contestado": True} })
    
    if(mensajeActualizado):

        mensaje = contactoCollection.find_one({'_id': ObjectId(id)})
        
        email = EmailMessage(
            f'Respuesta a: {mensaje.get("asunto")}',
            request.data.get("mensaje"),
            to=[ mensaje.get("email") ]
        )

        adminMensajeCollection.insert_one({
            "id_administrador": request.user.id,
            "constestacion": request.data.get("mensaje"),
            "fecha_respuesta": datetime.datetime.now().strftime("%Y-%m-%d"),
            "mensaje": mensaje
        })

        threading.Thread(target=send_email_now, args=(email, )).start()
    
    return Response({"message": "Mensaje contestado"}, status=status.HTTP_200_OK)    

