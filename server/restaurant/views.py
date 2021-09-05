
import calendar
import datetime
import json
from re import DEBUG

from django.http.response import HttpResponse
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import ListView, CreateView, UpdateView, DeleteView, TemplateView, DetailView

from rest_framework.viewsets import ModelViewSet
from .serializers import *
from .forms import NoticeForm, PlatoForm
from .models import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

@csrf_exempt
def contactos(request):
    respuesta = ''
    if request.method == "POST":
        datos = json.loads(request.body.decode('utf8'))
        contacto = Contacto()
        contacto.name = datos.get("name")
        contacto.message = datos.get("message")
        contacto.celular = datos.get("celular")
        contacto.email = datos.get("email")
        contacto.save()
        respuesta = {"mensaje": "Registro exitoso"}
    return HttpResponse(json.dumps(respuesta, ensure_ascii=False).encode("utf-8"), content_type='application/json')

class NoticiasView(ModelViewSet):
    
    serializer_class = NoticeSerializer
    queryset = Notice.objects.all()

    def list(self, request):

        datos = self.get_serializer(self.get_queryset(), many = True)
        
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

    
    def update(self,request,pk):

        instance = Plato.objects.get(id = pk)
        serializer = PlatoSerializer(instance, data = request.data, partial=True)
        serializer.is_valid(raise_exception = True)
        newPlato = PlatoSerializer(serializer.save())

        return Response(newPlato.data, status=status.HTTP_200_OK)

    def destroy(self, request,pk):

        instance = Plato.objects.get(id = pk)

        Plato.objects.filter(id = pk).delete()

        return Response( PlatoSerializer(instance).data, status=status.HTTP_200_OK )
