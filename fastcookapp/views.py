import json
import requests
from django.shortcuts import render, redirect
from django.db.models import Count
from django.http import HttpResponse, Http404
#from fastcookapp.models import models
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.http import QueryDict
from django.views.decorators.csrf import csrf_exempt
from .forms import *
from django.db import IntegrityError
from django.shortcuts import render_to_response


#get rid of csrf_exempt
@csrf_exempt
def index(request):

    return render(request, 'fastcookapp/index.html')


# user logged in
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
		 
def register(request):

	# form = UserRegForm()

     if request.method == "POST":
		# form_class is class of form name NEED TO CHANGE
        form = UserRegForm(request.POST)

        if form.is_valid():

			# user = form.save(commit=False)
			# normalized data
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']

            user = Member(username=username)
            user.set_password(password)

            try:user.save()     
            except: #IntegrityError: 
                #raise Http404('Username '+ str(user)+' already taken: Username must be unique')

			#return redirect('index')
                context = {
                    'appname':appname,
                    'form': form,
                    'error':'Username '+ str(user) +' already taken: Usernames must be unique',
                    }
            # login(request,user)
                return render(request, 'fastcookapp/register.html', context)

            form = UserLogInForm()

            return render(request, 'fastcookapp/index.html', {'form': form})


     else:
        form = UserRegForm()
        return render(request, 'fastcookapp/register.html', {'form': form})


def login(request):
    if "username" in request.session:
        return redirect('displayProfile')
    if request.method == "POST":
        form = UserLogInForm(request.POST)
        if 'username' in request.POST and 'password' in request.POST:
            if form.is_valid():

                username = form.cleaned_data.get("username")
                password = form.cleaned_data.get("password")

                user = authenticate(username=username, password=password)

                if user is not None:
                    if user.is_active:
                        request.session['username'] = username
                        request.session['password'] = password
                        form = UserProfile()
                        person = Member.objects.get(id=user.id)
                        hobby = Hobby.objects.all()

                        context = {
                            'appname':appname,
                            'form': form,
                            'user': person,
                            'hobbies': hobby,
                            'loggedIn': True
                        }
						# login(request,user)

                        #where should it go after user logged in?
                        return render(request, 'fastcookapp/displayProfile.html', context)

                # return HttpResponse("<span> User or password is wrong </span")
                
                else:
                    #raise Http404('User or password is incorrect')
                    context = {
                        'appname':appname,
                        'form': form,
                        'error':'User or password entered is incorrect'
                    }
                    # login(request,user)
                    return render(request, 'fastcookapp/index.html', context)
    
    else:
        #return displayProfile(request,)
        form = UserLogInForm()
        context = {
        'appname':appname,
        'form': form,
        'loggedIn': True
        }
        return render(request, 'fastcookapp/index.html', context)

# render logout page


@loggedin
def logout(request, user):
	request.session.flush()
	return redirect("/")
		


