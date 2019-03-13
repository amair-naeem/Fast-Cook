from django.contrib.auth.views import (
  PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, PasswordResetCompleteView,
)
from django.urls import path, include
from django.conf.urls import url
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'members', views.MemberViewSet)

urlpatterns = [
    
    #path('create/', views.createNewGraph, name='create'),
    #about us

    #homepage
    url(r'^home/', views.home, name="home"),
    # register
    path('register/', views.register, name='register'),
    #profile
    path('profile/', views.profile, name='profile'),
    # login
    path('login/', views.login, name='login'),
    # aboutus
    path('', views.aboutus, name="aboutus"),
    # logout
    path('logout/', views.logout, name='logout'),
    # saveData
    path('saveData/', views.saveData, name='saveData'),
    # saveTitle
    path('saveTitle/', views.saveTitle, name='saveTitle'),
    # loadTitle
    path('loadTitles/', views.loadTitles, name='loadTitles'),
    # saveNewTitle
    path('saveNewTitle/', views.saveNewTitle, name='saveNewTitle'),
    # overwrite
    path('overwrite/', views.overwrite, name='overwrite'),
    # openGraph
    url(r'^openGraph/(?P<title>\d+)/$', views.openGraph, name='openGraph'),
    #openGraphFromProfile
    url(r'^openGraphFromProfile/(?P<title>\d+)/$', views.openGraphFromProfile, name='openGraphFromProfile'),
    # deleteGraph
    url(r'^deleteGraph/(?P<title>\d+)/$', views.deleteGraph, name='deleteGraph'),
    # shareGraph
    #path('shareGraph/', views.shareGraph, name='shareGraph'),
    # share
    #url(r'^share/(?P<rating>\d+)/(?P<id>\d+)/(?P<random_url>[-\w]+)/', views.share, name="share"),
    url(r'^share/(?P<id>\d+)/(?P<random_url>[-\w]+)/', views.share, name="share"),

    
    path('share/', views.share, name='share'),
    path('loadIcons/', views.loadIcons, name='loadIcons'),
    path('search/', views.search, name='search'),
    #url(r'^(?P<slug>[\w-]+)/$',  views.share, name='share'),
    #path('<slug:slug>', views.share, name='share'),
    # API
    #PASSWORD RESET URLS

    path('password_reset/', PasswordResetView.as_view(template_name='fastcookapp/registration/password_reset_form.html',success_url='done/'), name="password_reset"),
    path('password_reset/done/', PasswordResetDoneView.as_view(template_name='fastcookapp/registration/password_reset_done.html'), name="password_reset_done"),
    path('reset/<uidb64>/<token>/', PasswordResetConfirmView.as_view(template_name='fastcookapp/registration/password_reset_confirm.html'), name="password_reset_confirm"),
    path('reset/done/', PasswordResetCompleteView.as_view(template_name='fastcookapp/registration/password_reset_complete.html'), name="password_reset_complete")


    #url('^', include('django.contrib.auth.urls'))



]