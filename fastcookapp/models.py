
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import pre_save
from django.core.validators import RegexValidator
#from django.contrib.postgres.fields import JSONField
from django.utils.text import slugify
import uuid


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
    XMLGraph = models.TextField(null=True, default='<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel>')
    user = models.ForeignKey(to = Member, null=True, on_delete=models.SET_NULL)
    random_url = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add = True)
    rating = models.TextField(null=True)
    time = models.TextField(null=True)
    serving = models.TextField(null=True)

    #sharedXMLGraph = models.TextField(null=True)
    #slug = models.SlugField(null = True,unique=True,blank=True) 
    #urlhash = models.CharField(max_length=6, null=True, blank=True, unique=True)

    def __str__(self):
        return str(self.title)

    #Generate unique slugfield which is overriding djangos method 
    """def save(self, **kwargs):
        slug_str = "%s %s" % (self.title) 
        unique_slugify(self, slug_str) 
        super(XMLGraph, self).save(**kwargs)"""
    
    # Sample of an ID generator - could be any string/number generator
    # For a 6-char field, this one yields 2.1 billion unique IDs
    """def id_generator(size=6, chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789"):
        return ''.join(random.choice(chars) for _ in range(size))"""

    """def save(self):
        if not self.urlhash:
            # Generate ID once, then check the db. If exists, keep trying.
            self.urlhash = id_generator()
            while XMLGraph.objects.filter(urlhash=self.urlhash).exists():
                self.urlhash = id_generator()
            super(XMLGraph, self).save()"""

class Profile(models.Model):
    user = models.OneToOneField(
        to=Member,
        blank=True,
        null=True,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name