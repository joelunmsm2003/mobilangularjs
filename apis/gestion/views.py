from django.shortcuts import render
from django.views.generic import View
from django.http import HttpResponse
from django.contrib.auth.models import Group, User
from jwt_auth.compat import json
from jwt_auth.mixins import JSONWebTokenAuthMixin
from django.template import RequestContext
import simplejson
from django.views.decorators.csrf import csrf_exempt
import xlrd
from gestion.models import *
from PIL import Image
from resizeimage import resizeimage
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
import time
import os
from datetime import datetime,timedelta,date
import os.path
import requests
import smtplib
from email.mime.text import MIMEText
from apis.settings import *
import datetime
from django.db.models import Max, Min
from django.contrib.auth import authenticate, login
from django.db.models import Count
from django.db.models import Avg

def ValuesQuerySetToDict(vqs):

    return [item for item in vqs]



class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)

# Create your views here.


class Kinesiologa(JSONWebTokenAuthMixin, View):

    def post(self, request):

        data_json = simplejson.dumps('id_kine')

        return HttpResponse(data_json, content_type="application/json")


@csrf_exempt
def llamadas(request,dni):

    if request.method == 'GET':

        data = OrigBase.objects.filter(cliente=dni).values('id_orig_base','telefono','contacto__nombre','estado__nombre','accion__nombre','observacion','fagenda') 

        data = ValuesQuerySetToDict(data)

        data_json = simplejson.dumps(data)

        return HttpResponse(data_json, content_type="application/json")


@csrf_exempt
def contactos(request):

    if request.method == 'GET':

        data = Contacto.objects.all().values('id','nombre')

        data = ValuesQuerySetToDict(data)

        data_json = simplejson.dumps(data)

        return HttpResponse(data_json, content_type="application/json")


@csrf_exempt
def acciones(request,contacto):

    if request.method == 'GET':

        data = Tipificacion.objects.filter(contacto_id=contacto).values('accion','accion__nombre').annotate(num_acciones=Count('accion__nombre'))

        print data

        data = ValuesQuerySetToDict(data)

        data_json = simplejson.dumps(data)

        return HttpResponse(data_json, content_type="application/json")

@csrf_exempt
def estados(request,accion):

    if request.method == 'GET':

        data = Tipificacion.objects.filter(accion_id=accion).values('estado','estado__nombre').annotate(num_acciones=Count('estado__nombre'))

        print data

        data = ValuesQuerySetToDict(data)

        data_json = simplejson.dumps(data)

        return HttpResponse(data_json, content_type="application/json")


@csrf_exempt
def gestionado(request):

    if request.method == 'GET':

        data = OrigBase.objects.all().values('contacto','contacto__nombre').annotate(contador=Count('contacto__nombre'))

        print data

        data = ValuesQuerySetToDict(data)

        data_json = simplejson.dumps(data)

        return HttpResponse(data_json, content_type="application/json")


@csrf_exempt
def tipifica(request):

    if request.method == 'POST':

        data = json.loads(request.body)


        contacto = ''
        estado = ''
        accion=''

        base = data['base']

        for d in data:

            if d =='contacto':

                contacto = data['contacto']

            if d == 'accion':

                accion = data['accion']

            if d =='estado':

                estado = data['estado']

        print 'data...',data,base

        b = OrigBase.objects.get(id=int(base))

        print 'b', b

        b.contacto_id = contacto

        b.estado_id = estado

        b.accion_id = accion

        b.observacion = observacion

        b.save()


        data = ValuesQuerySetToDict('data')

        data_json = simplejson.dumps(data)

        return HttpResponse(data_json, content_type="application/json")