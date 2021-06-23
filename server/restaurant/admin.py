from django.contrib import admin

# Register your models here.
from restaurant.models import *


class PlatoAdmin(admin.ModelAdmin):
    pass


class NoticeAdmin(admin.ModelAdmin):
    pass


admin.site.register(Plato, PlatoAdmin)
admin.site.register(Noticia, NoticeAdmin)
