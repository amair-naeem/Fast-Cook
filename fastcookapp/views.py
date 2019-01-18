import json
import requests
from django.shortcuts import render, redirect, get_object_or_404
from django.db.models import Count
from django.http import HttpResponse, Http404
from fastcookapp.models import Member,Profile,XMLGraph,Title
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.http import QueryDict
from .forms import *
from django.db import IntegrityError
from django.shortcuts import render_to_response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import MemberSerializer

from django.core.exceptions import MultipleObjectsReturned

from django.core import serializers


from rest_framework import viewsets
from fastcookapp.documents import MemberDocument


#JSON response for M2M table
class MemberViewSet(viewsets.ModelViewSet):
    # API endpoint for listing and creating members
    queryset = Member.objects.order_by('username')
    serializer_class = MemberSerializer
        

def index(request):
    return render(request, 'fastcookapp/ports.html')

# Decorator to test if user logs in
def loggedin(view):
    def mod_view(request):
        form = UserLogInForm()
        if 'username' in request.session:
            username = request.session['username']
            try: user = Member.objects.get(username=username)
            except Member.DoesNotExist: raise Http404('Member does not exist')
            return view(request, user)
        else:
            return render(request, 'fastcookapp/index.html', {'form': form})
    return mod_view


# Homepage
@loggedin
def home(request,user):
    member = Member.objects.get(username=user)
    title = Title.objects.all()
    #currentTitle = member.XMLGraph.title
    #return render(request, 'fastcookapp/index.html', {'xml': json.dumps(member.XMLGraph)})
    #for xmlData in member.XMLGraph.all():
        #return render(request, 'fastcookapp/index.html', {'xml': json.dumps(xmlData.XMLGraph),'title': member.title.all()})

    return render(request, 'fastcookapp/index.html', {'xml': json.dumps(str(member.XMLGraph)), 'title':title})

 
# Register view displays login when successful details have been passed
def register(request):
     if request.method == "POST":
        username = request.POST['usrname']
        username = username.lower()
        password = request.POST['psw']
        re_password = request.POST['psw-repeat']
            
        # Password validation
        if password and re_password:
            if password != re_password:
                #return error if passwords do not match
                errorPassword=("The two password fields do not match.")
                context = {
                    'errorPassword':errorPassword
                    }
                return render(request, 'fastcookapp/register.html', context)
                
            else:
                #print("Username: " + str(username) + "Password: " + str(password))
                user = Member(username = username)
                user.set_password(password)

                try:
                    user.save()
                    
                except IntegrityError:
                    context = {
                        'errorM':'Username '+ str(user) +' is already taken. Usernames must be unique'
                        }

                    return render(request, 'fastcookapp/register.html', context)

                return render(request, 'fastcookapp/login.html')
            
        else:
            #returns an error if either of both password fields have not being populated
            context = {
            'errorPassword':'Enter a value in both password fields'
            }

        return render(request, 'fastcookapp/register.html', context)


     else:
        return render(request, 'fastcookapp/register.html')


def login(request):
    if request.method == "POST":
        if 'uname' in request.POST and 'psw' in request.POST:
            username = request.POST["uname"]
            password = request.POST["psw"]
            user = authenticate(username=username, password=password)
            if user is not None:
                if user.is_active:
                    request.session['username'] = username
                    request.session['password'] = password
                    return render(request, 'fastcookapp/index.html')
                else:
                    return render(request, 'fastcookapp/login.html')    
            else:
                return render(request, 'fastcookapp/login.html')

    return render(request, 'fastcookapp/login.html')

# render logout page 
@loggedin
def logout(request, user):
	request.session.flush()
	return redirect("/")

@loggedin	
def saveData(request, user):
    if request.method == "POST":
    #Get user profile
    #Get XML data once user presses save
        #xmlData = request.POST['xml']

        #XMLGraph = XMLGraph.objects.filter(username=user)
        #skill = Skill.objects.get(name__iexact=s)
        # need to update the current mxGraph, so have to delete previously created xmlgraph
        xmlData = request.POST['xml']
        member = Member.objects.filter(username=user).first()
        #xml, _ = XMLGraph.objects.get_or_create()
        #XMLGraph.objects.all().delete()

        ##https://stackoverflow.com/questions/17960593/multipleobjectsreturned-with-get-or-create
        xml, _ = XMLGraph.objects.get_or_create(XMLGraph = xmlData)

        
        #member.XMLGraph.add(xml)
        member.XMLGraph = xml

        member.save(force_update=True)

        """response = JsonResponse([
            member.XMLGraph
        ], safe = False);"""
        return render_to_response("fastcookapp/index.html", content_type="text/xml;")
        #return render_to_response("fastcookapp/index.html",{"xmlData": json.dumps(member.XMLGraph)}, content_type="text/xml;")
    return HttpResponse('POST is not used')

@loggedin
def saveTitle(request, user):
    if request.method == "POST":
        member = Member.objects.get(username=user)
        graphTitle = request.POST['saveAsTitle']
        print("test" + str(graphTitle))
        title = Title.objects.create(title=graphTitle)
        member.title = title
        xmlData = request.POST['xml']
        xml = XMLGraph.objects.create(XMLGraph = xmlData, title=title)
        member.XMLGraph = (xml)
        member.save()
        return render_to_response("fastcookapp/index.html", content_type="text/xml;")
    return HttpResponse('POST is not used')

# load titles
@loggedin
def loadTitles(request, user):
	member = Member.objects.get(username=user)
	title = Title.objects.all()
	data = serializers.serialize('json', title)
	
	return HttpResponse(data, content_type="application/json")



# Open Graph by title
def openGraph(request, title):
    if 'username' in request.session:
        username = request.session['username']
        titleName = Title.objects.get(id = title)
        xml = XMLGraph.objects.get(title = titleName)

        data = serializers.serialize('json', [xml,titleName])

        struct = json.loads(data)
        data = json.dumps(struct)

        print(data)


        #member = Member.objects.get(username = username, XMLGraph = xml)
        #for xmlData in member.XMLGraph.all():
            #return render_to_response("fastcookapp/index.html",{'openXML': json.dumps(xmlData.XMLGraph)})
        #return render(request, 'fastcookapp/index.html', {'openXML': json.dumps(str(xml))})
        #return HttpResponse(str(xml));
        return HttpResponse(data, content_type="application/json")

# Save new title
@loggedin
def saveNewTitle(request, user):
	newTitle = request.POST['newTitle']
	member = Member.objects.get(username=user)
	xml = request.POST['xml']
	currentTitle = request.POST['currentTitle']
	#print(title)
	currentTitle  = Title.objects.get(title = currentTitle)
	currentTitle.title = newTitle
	currentTitle.save()

	#print(currentTitle)
	#xmlObject = XMLGraph.objects.get(XMLGraph = xml)
	#xmlModel = Title.objects.get(xmlgraph=xmlObject)
	#for i in title:
	#	print(i['fields'])
	#newTitle = xmlModel.title
	#xmlModel.save()
	#print(currentTitle)
	return HttpResponse("test")

@loggedin
def share(request, user):
	return render(request, 'fastcookapp/share.html')