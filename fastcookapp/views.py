import json
import os
import requests
from django.contrib.auth import logout
from django.core.exceptions import ValidationError
from django.shortcuts import render, redirect, get_object_or_404, get_list_or_404
from django.db.models import Count
from django.http import HttpResponse, Http404
from fastcookapp.models import Member,Profile,XMLGraph
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
from PIL import Image
import glob
from .serializers import MemberSerializer
from django.core.exceptions import ObjectDoesNotExist

from django.core.exceptions import MultipleObjectsReturned

from django.core import serializers
from django.contrib import messages


from rest_framework import viewsets
#from fastcookapp.documents import MemberDocument


#JSON response for M2M table
class MemberViewSet(viewsets.ModelViewSet):
    # API endpoint for listing and creating members
    queryset = Member.objects.order_by('username')
    serializer_class = MemberSerializer
        

# Decorator to test if user logs in
def loggedin(view):
    def mod_view(request):
        if 'username' in request.session:
            username = request.session['username']
            try: user = Member.objects.get(username=username)
            except Member.DoesNotExist: raise Http404('Member does not exist')
            return view(request, user)
        else:
            return render(request, 'fastcookapp/login.html')
    return mod_view


# Homepage
@loggedin
def home(request,user):
    if request.method == 'POST':
        xmlData = request.POST['sharedXMLData']
        graphId = request.POST['currentGraphId']
        rating = request.POST['rating']
        time = request.POST['time']
        serving = request.POST['serve']
        shareGraph = XMLGraph.objects.get(id=graphId)
		#request.session['sharedXMLGraph'] = xmlData
		#messages.add_message(request, messages.INFO, xmlData)
        shareGraph.XMLGraph = xmlData
        shareGraph.rating = rating
        shareGraph.time = time
        shareGraph.serving = serving
        shareGraph.save()
        return redirect('share', random_url=shareGraph.random_url, id=graphId)

    graphTitle = XMLGraph.objects.filter(user=user).values('title','id')
    graph  = XMLGraph.objects.filter(user=user).values('XMLGraph')
	#graphTitle = XMLGraph.objects.filter(user=user)
    
    #print(graphTitle)

    #member = Member.objects.get(username=user)
    #title = Title.objects.all()
    #currentTitle = member.XMLGraph.title
    #return render(request, 'fastcookapp/index.html', {'xml': json.dumps(member.XMLGraph)})
    #for xmlData in member.XMLGraph.all():
        #return render(request, 'fastcookapp/index.html', {'xml': json.dumps(xmlData.XMLGraph),'title': member.title.all()})
    title = json.dumps(list(graphTitle))
    return JsonResponse({'title':title})
	#return render(request, 'fastcookapp/index.html', {'xml': json.dumps(str(graph)), 'title':graphTitle})


"""def logout(request,*args, **kwargs):
    request.session.flush()
    return redirect("/")
    print("test")
    logout(request, *args, **kwargs)
    return redirect("login")"""

# render logout page 
@loggedin
def logout(request, user):
    request.session.flush()
    return redirect("/")

def aboutus(request):
    return render(request, 'fastcookapp/aboutus.html')

"""@loggedin
def createNewGraph(request,user):
        saveNewGraph = XMLGraph.objects.create(user=user, title=graphTitle22)

        #graphTitle = XMLGraph.objects.filter(user=user).values('title','id')
        #graph  = XMLGraph.objects.filter(user=user).values('XMLGraph')
        xml = XMLGraph.objects.filter(id = saveNewGraph.id).only('id', 'title', 'XMLGraph')
        return render(request, 'fastcookapp/index.html', {'xmlData': xml, 'overwrite': False})"""

@loggedin
def profile(request, user):
    if request.method == 'POST':
        
        graphTitle22 = request.POST['graphTitle22']
        
        if XMLGraph.objects.filter(title=graphTitle22, user=user).exists():
            graphTitle = XMLGraph.objects.filter(user=user).values('title','id', 'created_at')
            graph  = XMLGraph.objects.filter(user=user).values('XMLGraph')
            #messages.add_message(request, messages.INFO, str(graphTitle22) + ' already exists, please use another title')

            return JsonResponse({'overwrite' : True})
            """return render(request, 'fastcookapp/profile.html', {'xml': json.dumps(str(graph)), 'title':graphTitle, 
                'error': str(graphTitle22) + ' already exists, please use another title', 'overwrite': True})"""
        
        saveNewGraph = XMLGraph.objects.create(user=user, title=graphTitle22)

        return JsonResponse({'id': saveNewGraph.id, 'overwrite' : False})
        #return redirect('openGraphFromProfile', saveNewGraph.id)

        #graphTitle = XMLGraph.objects.filter(user=user).values('title','id')
        #graph  = XMLGraph.objects.filter(user=user).values('XMLGraph')
        """xml = XMLGraph.objects.filter(id = saveNewGraph.id).only('id', 'title', 'XMLGraph')
        return render(request, 'fastcookapp/index.html', {'xmlData': xml, 'overwrite': False})"""
    
    graphTitle = XMLGraph.objects.filter(user=user).values('title','id', 'created_at')
    graph  = XMLGraph.objects.filter(user=user).values('XMLGraph')
    
    return render(request, 'fastcookapp/profile.html', {'xml': json.dumps(str(graph)), 'title':graphTitle,  'overwrite': False})

# Register view displays login when successful details have been passed
def register(request):
     if request.method == "POST":
        username = request.POST['usrname']
        username = username.lower()
        password = request.POST['psw']
        email = request.POST['email']
        re_password = request.POST['psw-repeat']

        if Member.objects.filter(email=email).exists():
            messages.add_message(request, messages.INFO, 'This email already exists')
            print("test1")
            return render(request, 'fastcookapp/register.html')

            
        # Password validation
        if password and re_password:
            if password != re_password:
                #return error if passwords do not match
                messages.add_message(request, messages.INFO, "The two password fields do not match.")
                return render(request, 'fastcookapp/register.html')
                
            else:
                #print("Username: " + str(username) + "Password: " + str(password))
                user = Member(username = username, email = email)
                user.set_password(password)

                try:
                    user.save()
                    
                except IntegrityError:
                    messages.add_message(request, messages.INFO, 'Username '+ str(user) +' is already taken. Usernames must be unique')
                    print("test2")
                    context = {
                        'errorM':'Username '+ str(user) +' is already taken. Usernames must be unique'
                        }

                    return render(request, 'fastcookapp/register.html', context)
                print("test5")
                return render(request, 'fastcookapp/login.html')
            
        else:
            #returns an error if either of both password fields have not being populated
            messages.add_message(request, messages.INFO, 'Enter a value in both password fields')
            context = {
            'errorPassword':'Enter a value in both password fields'
            }
            print("test3")

        return render(request, 'fastcookapp/register.html', context)


     else:
        print("test4")
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
                    return redirect('profile')
                    #return render(request, 'fastcookapp/profile.html')
                else:
                    messages.add_message(request, messages.INFO, 'The username or password is incorrect')
                    return render(request, 'fastcookapp/login.html')    
            else:
                messages.add_message(request, messages.INFO, 'The username or password is incorrect')
                return render(request, 'fastcookapp/login.html')

    return render(request, 'fastcookapp/login.html')


@loggedin
def loginPage(request, user):
    return render (request, 'fastcookapp/login.html')


@loggedin	
def saveData(request, user):
    if request.method == "POST":
    #Get user profile
    #Get XML data once user presses save
        #xmlData = request.POST['xml']

        #XMLGraph = XMLGraph.objects.filter(username=user)
        #skill = Skill.objects.get(name__iexact=s)
        # need to update the current mxGraph, so have to delete previously created xmlgraph
        #member = Member.objects.get(username=user)
        graphTitle = request.POST['title']



        """for xmlgraph in member.XMLGraph.all():
        	print(xmlgraph.title)"""

        #member = Member.objects.get(Title__title=graphTitle)

        #for graph in member.XMLGraph:
        	#print("test" + str(graph))

        	#print(member.XMLGraph.all())
        #xml, _ = XMLGraph.objects.get_or_create()
        #XMLGraph.objects.all().delete()


        #title = Title.objects.get(title = graphTitle)
        xmlData = request.POST['xml']


        #xml, created = XMLGraph.objects.get_or_create(user = user, title = graphTitle, XMLGraph = xmlData)

        #XMLGraph.objects.filter(user = user, title = graphTitle).update(XMLGraph = xmlData)

        try:
        	xml, created = XMLGraph.objects.get_or_create(user = user, title = graphTitle)

        except XMLGraph.MultipleObjectsReturned:

        	event = XMLGraph.objects.filter(user = user, title = graphTitle).order_by('id').first()


        if not created:
        	#if XMLGraph.objects.filter(user = user, title = graphTitle).exists():
        		#return HttpResponse("overwrite")
        #else:
        	xml.XMLGraph = xmlData 
        	xml.save()

        #member.XMLGraph.add(xml)
        #member.XMLGraph = (xml)

        #member.save()

        """response = JsonResponse([
            member.XMLGraph
        ], safe = False);"""
        
        return render_to_response("fastcookapp/index.html", content_type="text/xml;")
        #return render_to_response("fastcookapp/index.html",{"xmlData": json.dumps(member.XMLGraph)}, content_type="text/xml;")
    return HttpResponse('POST is not used')

@loggedin
def overwrite(request, user):
	if request.method =="POST":


		graphTitle = request.POST['title']
		xmlData = request.POST['xml']
		graphId = request.POST['graphId']

		try:
			exclude = XMLGraph.objects.exclude(id=graphId)
			if exclude.filter(title=graphTitle, user = user).exists():
				return JsonResponse({'overwrite':True})
			else:
				xml = XMLGraph.objects.get(id = graphId)
				xml.XMLGraph = xmlData
				xml.title = graphTitle
				xml.save()
				return JsonResponse({'overwrite': False})

		except (ValueError, NameError) as e:
			if XMLGraph.objects.filter(title=graphTitle).exists():
				return JsonResponse({'overwrite':True})

		XMLGraph.objects.create(user = user, title = graphTitle)

		return render_to_response("fastcookapp/index.html", content_type="text/xml;")


@loggedin
def saveTitle(request, user):
    if request.method == "POST":
        #member = Member.objects.get(username=user)
        graphTitle = request.POST['saveAsTitle']
        #member.title = title
        xmlData = request.POST['xml']

        if XMLGraph.objects.filter(title=graphTitle, user=user).exists():
        	return JsonResponse({"overwrite": True})
        	#raise Exception('Title already exists')

        xml = XMLGraph.objects.create(XMLGraph = xmlData, title=graphTitle, user=user)
        #member.XMLGraph.add(xml)
        #member.Title.add(title)
        return JsonResponse({"id": xml.id, "overwrite": False})
    return HttpResponse('POST is not used')

# load titles
@loggedin
def loadTitles(request, user):
	#member = Member.objects.get(username=user)
	#print(member.XMLGraph)
	#title = Title.objects.all()
    title = XMLGraph.objects.filter(user=user)
    data = serializers.serialize('json', title)
    return HttpResponse(data, content_type="application/json")



# Open Graph by title
def openGraph(request, title):
    if 'username' in request.session:
        username = request.session['username']
        print(username)
        #member = Member.objects.get(username=username)
        #titleName = Title.objects.get(id = title)
        xml = XMLGraph.objects.filter(id = title).only('id', 'title', 'XMLGraph')
        data = serializers.serialize("json", xml)
        #print("test " + str(xml))
        #data = serializers.serialize('json', [xml])

        #struct = json.loads(data)
        #data = json.dumps(struct)



        #member = Member.objects.get(username = username, XMLGraph = xml)
        #for xmlData in member.XMLGraph.all():
            #return render_to_response("fastcookapp/index.html",{'openXML': json.dumps(xmlData.XMLGraph)})
        #return render(request, 'fastcookapp/index.html', {'openXML': json.dumps(str(xml))})
        #return HttpResponse(str(xml));
        #return JsonResponse({'results': list(xml)})
        return HttpResponse(data, content_type="application/json")

def openGraphFromProfile(request, title):
    if 'username' in request.session:
        username= request.session['username']
        xml = XMLGraph.objects.filter(id = title).only('id', 'title', 'XMLGraph')
        return render(request, 'fastcookapp/index.html', {"xmlData": xml})


# Open Graph by title
def deleteGraph(request, title):
    if 'username' in request.session:
        username = request.session['username']
        if request.method == "DELETE":
            xml = XMLGraph.objects.get(id = title)
            xml.delete()
        #titleName.delete()
        #titleName = Title.objects.get(id = title)
        #xml = XMLGraph.objects.get(title = titleName)


        #member = Member.objects.get(username = username, XMLGraph = xml)
        #for xmlData in member.XMLGraph.all():
            #return render_to_response("fastcookapp/index.html",{'openXML': json.dumps(xmlData.XMLGraph)})
        #return render(request, 'fastcookapp/index.html', {'openXML': json.dumps(str(xml))})
        #return HttpResponse(str(xml));
        return HttpResponse("deleted")

# Save new title
@loggedin
def saveNewTitle(request, user):
	newTitle = request.POST['newTitle']
	xml = request.POST['xml']
	currentTitle = request.POST['currentTitle']
	graphId = request.POST['graphId']
	

	try:

		exclude = XMLGraph.objects.exclude(id=graphId)
		print("test1")

		if exclude.filter(title=newTitle).exists():
			print("test2")
			return JsonResponse({'overwrite':True})

		else:
			print("test3")
			xml = XMLGraph.objects.get(id = graphId)
			print("test4")
			xml.title = newTitle
			print("test5")
			xml.save()
			return JsonResponse({'overwrite': False})

	except (ValueError, ObjectDoesNotExist) as e:
		print("test6")
		if XMLGraph.objects.filter(title=newTitle, user = user).exists():
			print("test7")
			return JsonResponse({'overwrite':True})

	print("test8")
	XMLGraph.objects.create(user = user, title = newTitle)

	return JsonResponse({'created':True})

"""@loggedin
def shareGraph(request, user):
	if request.method == 'POST':
		xmlData = request.POST['sharedXMLData']
		graphId = request.POST['currentGraphId']
		shareGraph = XMLGraph.objects.get(id=graphId)
		request.session['sharedXMLGraph'] = xmlData
		return redirect('share', random_url=shareGraph.random_url)

	return render(request, 'fastcookapp/index.html')"""

def share(request, random_url, id):
	#xmlData = request.POST['sharedXMLData']
	#print(str(request.POST['sharedXMLData']))
    xmlGraph = XMLGraph.objects.get(id=id)
    rating = xmlGraph.rating
    user = xmlGraph.user

    context = {
        "article": get_list_or_404(XMLGraph, random_url=random_url),
        "graph": xmlGraph,
        "rating": rating,
        "user": user
    }
    return render(request, 'fastcookapp/share.html', context)

def loadIcons(request):
    #print(str("1 " + os.listdir("fastcookapp/images/")))
    search = []
    path = "fastcookapp/images/ingredients/"
    equipment =os.listdir(path+"equipment")
    equipment = list(filter(lambda fname: os.path.basename(fname) != 'Thumbs.db', equipment))
    bakery =os.listdir(path+"Bakery") 
    bakery = list(filter(lambda fname: os.path.basename(fname) != 'Thumbs.db', bakery))
    berries = os.listdir(path+"Berries")
    berries = list(filter(lambda fname: os.path.basename(fname) != 'Thumbs.db', berries))
    dairies = os.listdir(path+"Dairies")
    dairies = list(filter(lambda fname: os.path.basename(fname) != 'Thumbs.db', dairies))
    desserts = os.listdir(path+"Desserts")
    desserts = list(filter(lambda fname: os.path.basename(fname) != 'Thumbs.db', desserts))
    dishes = os.listdir(path+"Dishes")
    dishes = list(filter(lambda fname: os.path.basename(fname) != 'Thumbs.db', dishes))
    fruits = os.listdir(path+"fruits")
    fruits = list(filter(lambda fname: os.path.basename(fname) != 'Thumbs.db', fruits))
    meat = os.listdir(path+"Meat")
    meat = list(filter(lambda fname: os.path.basename(fname) != 'Thumbs.db', meat))
    nut = os.listdir(path+"Nut")
    nut = list(filter(lambda fname: os.path.basename(fname) != 'Thumbs.db', nut))
    seafood = os.listdir(path+"Seafood")
    seafood = list(filter(lambda fname: os.path.basename(fname) != 'Thumbs.db', seafood))
    vegetables = os.listdir(path+"Vegetables")
    vegetables = list(filter(lambda fname: os.path.basename(fname) != 'Thumbs.db', vegetables))
    other = os.listdir(path+"other")
    other = list(filter(lambda fname: os.path.basename(fname) != 'Thumbs.db', other))

    for root, dirs, files in os.walk(path):
        for file in files:
            if file.endswith('.png'):
                ingredients = file.replace(".png","")
                search.append(ingredients)

    #print(img_list) 
    return JsonResponse({'equipment': equipment, 'bakery': bakery, 'berries': berries, 'dairies': dairies, 'desserts': desserts,
        'fruits': fruits, 'meat': meat, 'nut': nut, 'seafood': seafood, 'vegetables': vegetables, 'other': other, 'dishes': dishes, 'allFiles': search})
    """print("1 "+str(glob.glob('fastcookapp/images/icons/*.png')))
    for filename in glob.glob('fastcookapp/images/icons/*.png'): 
        print(filename)
        im=Image.open(filename)
        image_list.append(im)
        #print(str(im))
        return HttpResponse(filename);
    return HttpResponse("test22222");"""

@loggedin
def search(request, user):
    name = request.POST['searchEngine']
    path = 'fastcookapp/images/ingredients/'
    for root, dirs, files in os.walk(path):
        for file in files:
            if file.endswith('.png'):
                search = file.replace(".png","")
                lowercaseName = name.lower()
                #print(lowercaseName)
                if lowercaseName == search:
                    root = os.path.join(root)
                    file_direc = str(root) + str("/"+name) + ".png"
                    equipment = os.listdir(root)
                    equipment = list(filter(lambda fname: os.path.basename(fname) != 'Thumbs.db', equipment))
                    size = len(equipment)
                    #count = 0
                    #print(file)
                    count = equipment.index(file)
                    return JsonResponse([{'length':count, 'file_direc': file_direc, 'results': True}], safe = False)

                    """for file in equipment:
                        #print(file)
                        count= count + 1
                        if search == lowercaseName: """                          
                            #print(count)

                #print(file)
                """if name == file:
                    print("yes")
                else:
                    print("no")"""
                #print(os.path.join(root, file))
    return JsonResponse([{'results': False}], safe = False)
