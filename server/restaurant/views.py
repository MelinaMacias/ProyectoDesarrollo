
import calendar
import datetime
import json

from django.http.response import HttpResponse
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import ListView, CreateView, UpdateView, DeleteView, TemplateView, DetailView

from .forms import NoticeForm, PlatoForm
from .models import *


def data():
    days = list(calendar.day_name)
    ld = []
    today = datetime.date.today()
    indiceh = days.index(today.strftime("%A"))
    antes = days[:indiceh]
    despues = days[indiceh + 1:]
    for i in range(len(antes), 0, -1):
        dia = today + datetime.timedelta(days=-i)
        qs = Contacto.objects.filter(date__date=dia).count()
        ld.append(qs)
    for i in range(len(despues) + 1):
        dia = today + datetime.timedelta(days=i)
        qs = Contacto.objects.filter(date__date=dia).count()
        ld.append(qs)
    return ld


class Index(TemplateView):
    template_name = 'index-home.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        a = [Notice.objects.count(), 'Noticias', reverse_lazy('notice'), 'info']
        b = [Plato.objects.count(), 'Platos', reverse_lazy('plato'), 'success']
        c = [Contacto.objects.count(), 'Mensajes', reverse_lazy('contact'), 'warning']
        l = [a, b, c]
        context['valores'] = l
        context['fecha'] = data()
        context['create_url'] = reverse_lazy('notice-create')
        return context


@csrf_exempt
def noticias(request):
    noticias = ""
    if request.method == "GET":
        datos = Notice.objects.all()
        lista_persona = []
        for i in datos:
            notice = {'id': i.id, 'title': i.title, 'description': i.description, "urlimage": i.urlimage}
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
    platos = ''
    if request.method == "GET":
        datos = Plato.objects.all()
        lista_platos = []
        for i in datos:
            plato = {
                "title": i.title, 
                "price": float(i.price), 
                "description": i.description,
                "urlimage": i.urlimage
            }
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


class NoticeListView(ListView):
    model = Notice
    template_name = 'notices-list.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('/admin/')
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Listado de Noticias'
        context['icono'] = 'fas fa-search'
        context['create_url'] = reverse_lazy('notice-create')
        context['color'] = 'primary'
        context['new'] = True
        num_visits = self.request.session.get('num_visits', 1)
        self.request.session['num_visits'] = num_visits + 1
        return context


class NoticeCreateView(CreateView):
    model = Notice
    template_name = 'notices-create.html'
    form_class = NoticeForm
    success_url = reverse_lazy('notice')

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('/admin/')
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Creando Noticia'
        context['color'] = 'primary'
        context['icono'] = 'fas fa-newspaper'
        return context


class NoticeEditView(UpdateView):
    model = Notice
    form_class = NoticeForm
    template_name = 'notices-create.html'
    success_url = reverse_lazy('notice')

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('/admin/')
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Editando Noticia'
        context['icono'] = 'fas fa-edit'
        context['color'] = 'primary'
        return context


class NoticeDeleteView(DeleteView):
    model = Notice
    template_name = 'delete.html'
    success_url = reverse_lazy('notice')

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('/admin/')
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Eliminación de una Noticia'
        context['list_url'] = reverse_lazy('notice')
        context['color'] = 'primary'
        return context


class PlatoListView(ListView):
    model = Plato
    template_name = 'platos-list.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('/admin/')
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Listado de platos'
        context['icono'] = 'fas fa-search'
        context['create_url'] = reverse_lazy('plato-create')
        context['new'] = True
        context['color'] = 'success'
        return context


class PlatoCreateView(CreateView):
    model = Plato
    template_name = 'notices-create.html'
    form_class = PlatoForm
    success_url = reverse_lazy('plato')

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('/admin/')
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Creando Plato'
        context['icono'] = 'fas fa-utensil-spoon'
        context['color'] = 'success'
        return context


class PlatoEditView(UpdateView):
    model = Plato
    form_class = PlatoForm
    template_name = 'notices-create.html'
    success_url = reverse_lazy('plato')

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('/admin/')
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Editando Plato'
        context['icono'] = 'fas fa-edit'
        context['color'] = 'success'
        return context


class PlatosDeleteView(DeleteView):
    model = Plato
    template_name = 'delete.html'
    success_url = reverse_lazy('plato')

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('/admin/')
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Eliminación de un Plato'
        context['list_url'] = reverse_lazy('plato')
        return context


class ContactListView(ListView):
    model = Contacto
    template_name = 'contact-list.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('/admin/')
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Listado de mensajes'
        context['icono'] = 'fas fa-search'
        context['color'] = 'cyan'
        context['new'] = False
        return context


class ContactDetailView(DetailView):
    model = Contacto
    template_name = 'detail.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Detalle de mensaje'
        context['icono'] = 'fas fa-address-card'
        context['color'] = 'cyan'
        context['new'] = False
        return context
