from django.contrib import admin

# Register your models here.
from restaurant.models import *


class PlatoAdmin(admin.ModelAdmin):
    list_display = ('title', 'price','description',)


class NoticeAdmin(admin.ModelAdmin):
    list_display = ('title', 'description',)


admin.site.register(Plato, PlatoAdmin)
admin.site.register(Notice, NoticeAdmin)
