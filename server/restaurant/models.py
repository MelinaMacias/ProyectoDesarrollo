
from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE

# Create your models here.
class Plato(models.Model):
    title = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField()
    urlimage = models.CharField(max_length=1000)
    likes = models.IntegerField(default=0)

    idUsuario = models.ForeignKey(User, on_delete= CASCADE)
    
    class Meta:
        verbose_name = "Plato"
        verbose_name_plural = "Platos"

    def save(self, *args, **kwargs):
        super(Plato, self).save(*args, **kwargs)


class Notice(models.Model):
    title = models.CharField(max_length=500)
    description = models.TextField(max_length=2000)
    urlimage = models.CharField(max_length=1000)
    likes = models.IntegerField(default=0)

    idUsuario = models.ForeignKey(User, on_delete= CASCADE)

    class Meta:
        verbose_name = "Notice"
        verbose_name_plural = "Noticias"

    def save(self, *args, **kwargs):
        super(Notice, self).save(*args, **kwargs)


class Contacto(models.Model):
    name = models.CharField(max_length=100)
    message = models.TextField(max_length=1000)
    cel = models.CharField(max_length=10)
    email = models.EmailField()
    date = models.DateTimeField(null=True)

    class Meta:
        verbose_name = "Contacto"
        verbose_name_plural = "Contactos"

    def __str__(self):
        return f'{self.name} {self.cel}'

class Comentario(models.Model):
    contenido = models.CharField(max_length=9001)
    fechaModificacion = models.DateTimeField(auto_now = True)
    fechaCreacion = models.DateTimeField(auto_now_add = True)
    
    class Meta:
        verbose_name = "Comentario"
        verbose_name_plural = "Comentarios"
    


class Reserva(models.Model):
    fechaCreacion = models.DateTimeField(auto_now_add = True)
    fechaModificacion = models.DateTimeField(auto_now = True)
    fechaReserva = models.DateTimeField()
    numeroAsientos = models.IntegerField()
    detalle = models.TextField()
    
    class Meta:
        verbose_name = "Reserva"
        verbose_name_plural = "Reservas"
    
