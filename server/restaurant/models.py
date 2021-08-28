from django.db import models


# Create your models here.
class Plato(models.Model):
    title = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField()

    class Meta:
        verbose_name = "Plato"
        verbose_name_plural = "Platos"

    def save(self, *args, **kwargs):
        super(Plato, self).save(*args, **kwargs)

class Notice(models.Model):
    title = models.CharField(max_length=500)
    description = models.TextField(max_length=2000)

    # image = models.ImageField()

    class Meta:
        verbose_name = "Notice"
        verbose_name_plural = "Noticias"

    def save(self, *args, **kwargs):
        super(Notice, self).save(*args, **kwargs)

