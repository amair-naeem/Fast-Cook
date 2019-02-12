from django.urls import path, include
from django.conf.urls import url
from . import views


from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'members', views.MemberViewSet)

urlpatterns = [
	#login
    path('', views.index, name='index'),
    #homepage
    url(r'^home/', views.home, name="home"),
    # register
    path('register/', views.register, name='register'),
    # login
    path('login/', views.login, name='login'),
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
    # deleteGraph
    url(r'^deleteGraph/(?P<title>\d+)/$', views.deleteGraph, name='deleteGraph'),
    # shareGraph
    #path('shareGraph/', views.shareGraph, name='shareGraph'),
    # share
    url(r'^share/(?P<id>\d+)/(?P<random_url>[-\w]+)/', views.share, name="share"),
    path('share/', views.share, name='share'),
    path('loadIcons/', views.loadIcons, name='loadIcons'),
    #url(r'^(?P<slug>[\w-]+)/$',  views.share, name='share'),
    #path('<slug:slug>', views.share, name='share'),
    # API
    path('api/', include(router.urls)),

]