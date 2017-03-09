from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf.urls import patterns
from gestion.views import *

from django.conf.urls import url
from django.contrib import admin


urlpatterns = [


    url(r'^admin/', admin.site.urls),
    url(r'^api-token-auth/', 'jwt_auth.views.obtain_jwt_token'),
    url(r'^llamadas/(\w+)/$', 'gestion.views.llamadas'),
    url(r'^contactos/$', 'gestion.views.contactos'),
    url(r'^acciones/(\w+)/$', 'gestion.views.acciones'),
    url(r'^estados/(\w+)/$', 'gestion.views.estados'),
    url(r'^todosestados/$', 'gestion.views.todosestados'),
    url(r'^tipifica$', 'gestion.views.tipifica'),
    url(r'^base/(\w+)/$', 'gestion.views.base'),
    url(r'^cliente/(\w+)/$', 'gestion.views.cliente'),
    url(r'^listaacciones/$', 'gestion.views.listaacciones'),
    url(r'^reporte/$', 'gestion.views.reporte'),
    url(r'^llamadasxdni/(\w+)/$', 'gestion.views.llamadasxdni'),
    url(r'^saveagente/(\w+)/(\w+)/$', 'gestion.views.saveagente'),
    url(r'^traebase/(\w+)/$', 'gestion.views.traebase'),

    #Hotels



]