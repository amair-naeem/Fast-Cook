from rest_framework import serializers
from .models import Member
from django.contrib.auth.models import User

class MemberSerializer(serializers.ModelSerializer):

	class Meta:
		model = Member
		fields  = ('username','XMLGraph','title')