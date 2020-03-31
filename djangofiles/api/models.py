from django.db import models
from api.fields import JSONField

# Create your models here.
class Category(models.Model):
    objects = models.Manager()
    title = models.TextField()

class Product(models.Model):
    objects = models.Manager()
    name = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    description = models.TextField()
    filename = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

class Sale(models.Model):
    name = models.TextField()
    address1 = models.TextField()
    address2 = models.TextField()
    city = models.TextField()
    state = models.TextField()
    zipcode = models.TextField()
    total = models.DecimalField(max_digits=10, decimal_places=2)
    items = JSONField()
    payment_intent = JSONField()
    
