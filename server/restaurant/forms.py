from django.forms import ModelForm

from .models import *


class NoticeForm(ModelForm):
    class Meta:
        model = Notice
        fields = '__all__'


class PlatoForm(ModelForm):
    class Meta:
        model = Plato
        fields = '__all__'
