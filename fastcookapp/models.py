from django.db import models
from django.contrib.auth.models import User
from django.db import models
from django.core.validators import RegexValidator

# Create your models here.
class Item(models.Model):
	image = models.ImageField(upload_to='images')

class Profile(models.Model):
    image = models.ImageField(upload_to='profile_images',
                              default='default.jpg')
    email = models.EmailField()
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    dob = models.DateField(max_length=8, null=True)

class Member(User):
	profile = models.OneToOneField(
        to=Profile,
        blank=True,
        null=True,
        on_delete=models.CASCADE
    )

