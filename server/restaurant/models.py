from django.db import models


# Create your models here.
class Plato(models.Model):
    title = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField()

    class Meta:
        ordering = ["-id"]
        verbose_name = "Plato"
        verbose_name_plural = "Platos"


class Notice(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()

    # image = models.ImageField()

    class Meta:
        ordering = ["-id"]
        verbose_name = "Notice"
        verbose_name_plural = "Noticias"
