import json
import requests
from django.shortcuts import render, redirect
from django.db.models import Count
from django.http import HttpResponse, Http404
from fastcookapp.models import Member,Profile
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.http import QueryDict
from .forms import *
from django.db import IntegrityError
from django.shortcuts import render_to_response


#get rid of csrf_exempt

def index(request):
    return render(request, 'fastcookapp/login.html')


# when user logged in
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
		 
# Register view displays login when successful details have been passed
def register(request):
     if request.method == "POST":
        username = request.POST['usrname']
        username = username.lower()
        password = request.POST['psw']
        re_password = request.POST['psw-repeat']
            
        # password validation
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

# render logout page 
@loggedin
def logout(request, user):
	request.session.flush()
	return redirect("/")

@loggedin	
def saveData(request, user):
    if request.method == "POST":
    #Get user profile
        member = Member.objects.get(username=user)
    #Get XML data once user presses save
    #xmlData = request.POST['xml']
        member.data = request.POST['xml']
        member.save()
        print(member.data)
        response = JsonResponse([
            member.data
        ], safe = False);
        return render_to_response("fastcookapp/index.html",{"xmlData": member.data}, content_type="text/xml;")
        #return HttpResponse(response, content_type="application/json")


    return HttpResponse('POST is not used')
