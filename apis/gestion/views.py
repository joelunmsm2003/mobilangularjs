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
import csv

from datetime import datetime,timedelta,date

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


class Fte(JSONWebTokenAuthMixin, View):

    def post(self, request):

        data_json = simplejson.dumps('id_kine')

        return HttpResponse(data_json, content_type="application/json")


@csrf_exempt
def llamadas(request,dni):

    if request.method == 'GET':

        data = OrigBase.objects.filter(cliente=dni).values('cliente','id_orig_base','telefono','contacto__nombre','estado__nombre','accion__nombre','observacion','tadicional') 

        fmt = '%Y-%b-%d %H:%M:%S'

        for x in range(len(data)):

            if OrigBase.objects.filter(id_orig_base=data[x]['id_orig_base']).values('fagenda')[0]['fagenda']:

                data[x]['fagenda'] = OrigBase.objects.get(id_orig_base=data[x]['id_orig_base']).fagenda.strftime(fmt)

        
        data = ValuesQuerySetToDict(data)

        data_json = simplejson.dumps(data)

        return HttpResponse(data_json, content_type="application/json")

@csrf_exempt
def todosestados(request):

    if request.method == 'GET':

        data = Estado.objects.all().values('id','nombre') 

        for j in range(len(data)):

            data[j]['estado'] = data[j]['id'] 
            data[j]['estado__nombre'] = data[j]['nombre'] 

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
def traebase(request,fono):

    if request.method == 'GET':

        data = OrigBase.objects.filter(telefono=fono).values('cliente','id_orig_base','telefono','observacion','contacto__nombre','accion__nombre','estado__nombre','contacto','estado','accion','tadicional')

        fmt = '%Y-%b-%d %H:%M:%S'

        for x in range(len(data)):

            data[x]['fagenda'] = OrigBase.objects.get(id_orig_base=data[x]['id_orig_base']).fagenda.strftime(fmt)


        data = ValuesQuerySetToDict(data)

        data_json = simplejson.dumps(data)

        return HttpResponse(data_json, content_type="application/json")

@csrf_exempt
def reporte(request):

    if request.method == 'GET':

        data = OrigBase.objects.all().values('cliente').annotate(count=Count('cliente'))

        for j in range(len(data)):

            data[j]['contador'] = OrigBase.objects.filter(cliente=data[j]['cliente']).count()

            base = OrigBase.objects.filter(cliente=data[j]['cliente']).values('id_orig_base','telefono','contacto__nombre','estado__nombre','accion__nombre','observacion','nombre_agente','tadicional','id_orig_base_c__campana','id_orig_base_c__fecha').order_by('-fgestion')

            fmt = '%Y-%b-%d %H:%M:%S'

            for x in range(len(base)):

                base[x]['fgestion'] = ''

                if OrigBase.objects.filter(id_orig_base=base[x]['id_orig_base']).values('fgestion')[0]['fgestion']:

                    base[x]['fgestion'] = OrigBase.objects.get(id_orig_base=base[x]['id_orig_base']).fgestion.strftime(fmt)

                base = ValuesQuerySetToDict(base)

            data[j]['registros'] = base[0]



        response = HttpResponse(content_type='text/csv')
    
        response['Content-Disposition'] = 'attachment; filename="Resumen.csv"'
    
        writer = csv.writer(response)

        writer.writerow(['Cuenta','Fecha de gestion','Fecha de venta','DNI','Agente','Contacto','Accion','Estado','Observacion','Telefono','Campana'])

        print 'Csv...'

        for d in data:

            writer.writerow([d['contador'],d['registros']['fgestion'],d['registros']['id_orig_base_c__fecha'],d['cliente'],d['registros']['nombre_agente'],d['registros']['contacto__nombre'],d['registros']['accion__nombre'],d['registros']['estado__nombre'],d['registros']['observacion'],d['registros']['telefono'],d['registros']['id_orig_base_c__campana']])

        return response   
   
        # data = ValuesQuerySetToDict(data)

        # data_json = simplejson.dumps(data)

        # return HttpResponse(data_json, content_type="application/json")

@csrf_exempt
def base(request,id):

    if request.method == 'GET':

        data = OrigBase.objects.filter(id_orig_base=id).values('cliente','id_orig_base','telefono','observacion','contacto__nombre','accion__nombre','estado__nombre','contacto','estado','accion','tadicional')

        print data

        fmt = '%Y-%b-%d %H:%M:%S'

        for x in range(len(data)):

            if OrigBase.objects.filter(id_orig_base=data[x]['id_orig_base']).values('fagenda')[0]['fagenda']:

                data[x]['fagenda'] = OrigBase.objects.get(id_orig_base=data[x]['id_orig_base']).fagenda.strftime(fmt)


        data = ValuesQuerySetToDict(data)

        data_json = simplejson.dumps(data)

        return HttpResponse(data_json, content_type="application/json")



@csrf_exempt
def cliente(request,dni):

    if request.method == 'GET':

        data = OrigBaseC01.objects.filter(dni=dni).values('id','nombre','dni','cobertura','plan_cobertura','cant_afiliados','direccion','distrito','provincia','departamento','mail','fecha_nacimiento','call','fecha','campana','prima_mensual','todo_prima','telefono1','telefono2','telefono3','telefono4','telefono5','telefono6','telefono7','tipo_tarjeta','tipo_envio','comercial')

        print data

        data = ValuesQuerySetToDict(data)

        data_json = simplejson.dumps(data)

        return HttpResponse(data_json, content_type="application/json")


@csrf_exempt
def listaacciones(request):

    if request.method == 'GET':

        data = Accion.objects.all().values('id','nombre')

        for j in range(len(data)):

            data[j]['accion'] = data[j]['id'] 
            data[j]['accion__nombre'] = data[j]['nombre'] 

        print data

        data = ValuesQuerySetToDict(data)

        data_json = simplejson.dumps(data)

        return HttpResponse(data_json, content_type="application/json")

@csrf_exempt
def saveagente(request,agente,base):

    if request.method == 'GET':

        base = OrigBase.objects.get(id_orig_base=base)
        base.nombre_agente = agente
        base.save()

        data = ValuesQuerySetToDict('data')

        return HttpResponse(data, content_type="application/json")



@csrf_exempt
def tipifica(request):

    if request.method == 'POST':

        data = json.loads(request.body)

        print 'Tipificando...',data

        contacto = ''
        estado = ''
        accion=''
        observacion = ''
        fagenda = '1900-01-01'
        phone = ''

        agendax = False

        base = data['base']

        for d in data:

            if d =='contacto':

                contacto = data['contacto']

                if type(contacto)==dict:

                    contacto = data['contacto']['id'] 

            if d == 'accion':

                accion = data['accion']

            if d =='estado':

                estado = data['estado']

            if d =='observacion':

                observacion = data['observacion']

            if d =='fecha':

                fecha = data['fecha']

                print fecha

            if d == 'tadicional':

                phone = data['tadicional']

            if d == 'mytime':

                mytime = data['mytime']

                fagenda = str(fecha)[0:10]+' '+str(mytime)[11:19]

                fagenda = datetime.strptime(fagenda,'%Y-%m-%d  %H:%M:%S')

                agendax = True


        b = OrigBase.objects.get(id_orig_base=int(base))

        print 'b', b

        b.contacto_id = contacto

        b.estado_id = estado

        b.accion_id = accion

        b.observacion = observacion 

        if agendax:

            b.fagenda = fagenda-timedelta(hours=5)

        b.tadicional = phone



        b.save()

        data = ValuesQuerySetToDict('data')

        data_json = simplejson.dumps(data)

        return HttpResponse(data_json, content_type="application/json")