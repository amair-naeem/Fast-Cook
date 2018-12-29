from django.urls import path
from django.conf.urls import url

from . import views

urlpatterns = [
	#login
    path('', views.index, name='index'),
    #homepage
    path('home/', views.home, name='home'),
    # register
    path('register/', views.register, name='register'),
    # login
    path('login/', views.login, name='login'),
    # saveData
    path('saveData/', views.saveData, name='saveData')

]