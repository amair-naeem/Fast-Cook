from django import template
from fastcookapp.models import Member,Profile,XMLGraph,Title
import json

register = template.Library()

@register.filter
def loadGraph(user):
    member = Member.objects.get(username=user)
    return json.dumps(str(member.XMLGraph))

@register.filter
def openGraph(user, id):
    titleName = Title.objects.get(id = title)
    xml = XMLGraph.objects.get(title = titleName)
    return json.dumps(str(xml))
