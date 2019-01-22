
from django.db import models
from django.contrib.auth.models import User
#from django.db.models import models, ManyToManyField
from django.core.validators import RegexValidator
#from django.contrib.postgres.fields import JSONField


# Create your models here.
#class Item(models.Model):
	#image = models.ImageField(upload_to='images')

"""class Title(models.Model):
    title = models.TextField(null=True, unique=True, default='Untitled Graph')
    def __str__(self):
        return self.title"""

class Member(User):

    #XMLGraph = models.ManyToManyField(XMLGraph)

    def __str__(self):
        return self.username

class XMLGraph(models.Model):
    #only one title per graph
    """title = models.OneToOneField(
        to=Title,
        blank=True,
        null=True,
        on_delete=models.SET_NULL)"""

    title = models.CharField(max_length=100, null=True, default='Untitled Graph')
    XMLGraph = models.TextField(null=True)
    user = models.ForeignKey(to = Member, null=True, on_delete=models.SET_NULL)


    def __str__(self):
        return str(self.XMLGraph)

class Profile(models.Model):
    user = models.OneToOneField(
        to=Member,
        blank=True,
        null=True,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name
    
