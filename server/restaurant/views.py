
import json
from django.http.response import HttpResponse
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView, UpdateView, DeleteView, TemplateView
from django.views.decorators.csrf import csrf_exempt

from .forms import NoticeForm, PlatoForm
from .models import *


class Index(TemplateView):
    template_name = 'index-home.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['noticias'] =Notice.objects.count()
        context['platos'] = Plato.objects.count()
        context['create_url'] = reverse_lazy('notice-create')
        return context


"""
# class DecimalEncoder(json.JSONEncoder):
#     def default(self, o):
#         if isinstance(o, decimal.Decimal):
#             # wanted a simple yield str(o) in the next line,
#             # but that would mean a yield on the line with super(...),
#             # which wouldn't work (see my comment below), so...
#             return (str(o) for o in [o])
#         return super(DecimalEncoder, self).default(o)
# 
# 
"""

@csrf_exempt
def noticias(request):
    if request.method == "GET":
        datos = Notice.objects.all()
        lista_persona = []
        for i in datos:
            notice = {}
            notice["title"] = i.title
            notice["description"] = i.description
            lista_persona.append(notice)
        noticias = lista_persona
    elif request.method == "POST":
        datos = json.loads(request.body.decode('utf8'))
        notice = Notice()
        notice.title = datos.get("title")
        notice.description = datos.get("description")
        notice.save()
        noticias = {"mensaje": "Registro exitoso"}
    return HttpResponse(json.dumps(noticias, ensure_ascii=False).encode("utf-8"), content_type='application/json')


@csrf_exempt
def platos(request):
    if request.method == "GET":
        datos = Plato.objects.all()
        lista_platos = []
        for i in datos:
            plato = {}
            plato["title"] = i.title
            plato["price"] = float(i.price)
            plato["description"] = i.description
            lista_platos.append(plato)
        platos = lista_platos
    elif request.method == "POST":
        datos = json.loads(request.body.decode('utf8'))
        try:
            verificacion_plato = Plato.objects.filter(title=datos.get("title"))
            if len(verificacion_plato) != 0:
                datos_retornar = {"mensaje": "Ya existe plato con ese nombre"}
                return HttpResponse(json.dumps(datos_retornar, ensure_ascii=False).encode("utf-8"),
                                    content_type='application/json')
        except Exception as e:
            print(e)
        plato = Plato()
        plato.title = datos.get("title")
        plato.price = datos.get("price")
        plato.description = datos.get("description")
        plato.save()
        platos = {"mensaje": "Registro exitoso"}
    return HttpResponse(json.dumps(platos, ensure_ascii=False).encode("utf-8"), content_type='application/json')

class NoticeListView(ListView):
    model = Notice
    template_name = 'notices-list.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Listado de Noticias'
        context['icono'] = 'fas fa-search'
        context['create_url'] = reverse_lazy('notice-create')
        num_visits = self.request.session.get('num_visits', 1)
        self.request.session['num_visits'] = num_visits + 1
        return context


class NoticeCreateView(CreateView):
    model = Notice
    template_name = 'notices-create.html'
    form_class = NoticeForm
    success_url = reverse_lazy('notice')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Creando Noticia'
        context['icono'] = 'fas fa-newspaper'

        return context


class NoticeEditView(UpdateView):
    model = Notice
    form_class = NoticeForm
    template_name = 'notices-create.html'
    success_url = reverse_lazy('notice')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Editando Noticia'
        context['icono'] = 'fas fa-edit'
        return context

class NoticeDeleteView(DeleteView):
    model = Notice
    template_name = 'delete.html'
    success_url = reverse_lazy('notice')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Eliminación de una Noticia'
        context['list_url'] = reverse_lazy('notice')
        return context


class PlatoListView(ListView):
    model = Plato
    template_name = 'platos-list.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Listado de platos'
        context['icono'] = 'fas fa-search'
        context['create_url'] = reverse_lazy('plato-create')
        return context


class PlatoCreateView(CreateView):
    model = Plato
    template_name = 'notices-create.html'
    form_class = PlatoForm
    success_url = reverse_lazy('plato')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Creando Plato'
        context['icono'] = 'fas fa-utensil-spoon'
        return context


class PlatoEditView(UpdateView):
    model = Plato
    form_class = PlatoForm
    template_name = 'notices-create.html'
    success_url = reverse_lazy('plato')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Editando Plato'
        context['icono'] = 'fas fa-edit'
        return context


class PlatosDeleteView(DeleteView):
    model = Plato
    template_name = 'delete.html'
    success_url = reverse_lazy('plato')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Eliminación de un Plato'
        context['list_url'] = reverse_lazy('plato')
        return context

