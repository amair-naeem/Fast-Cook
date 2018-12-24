from django.urls import path
from django.conf.urls import url

from . import views

urlpatterns = [
	#homepage
    path('', views.index, name='index'),
    # register
    path('register/', views.register, name='register'),
    # login
    path('login/', views.login, name='login'),
    # saveData
    path('saveData/', views.saveData, name='saveData')

]