from django.contrib import admin

# Register your models here.
from restaurant.models import *


class PlatoAdmin(admin.ModelAdmin):
    list_display = ('title', 'price','description', "urlimage")
    readonly_fields = ('id',)


class NoticeAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', "urlimage")
    readonly_fields = ('id',)

class ContactoAdmin(admin.ModelAdmin):
    list_display = ('name', 'message','cel', 'date')


admin.site.register(Plato, PlatoAdmin)
admin.site.register(Notice, NoticeAdmin)
admin.site.register(Contacto, ContactoAdmin)
