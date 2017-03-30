# -*- coding: utf-8 -*-

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

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
import os
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
def audios(request):

    if request.method == 'GET':

        print OriUsuario.objects.using('orion').all()

        data = ValuesQuerySetToDict('data')

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
def generatrama(request):

    if request.method == 'POST':

        data = json.loads(request.body)

        dni = data['dni']

        base = OrigBaseC01.objects.filter(dni=dni).values('primernombre','segundonombre','apellidos','fechaefectividad','distrito','provincia','departamento','direccion','codigoautorizacion','tarjetacredito','sexo','tipo_tarjeta','mail','dni','nombre','telefono1','telefono2','mail','tipo_envio','cobertura','cant_afiliados','observaciones','cantidad','nombre_agente','contacto__nombre','accion__nombre')

        data = ValuesQuerySetToDict(base)

        data_json = simplejson.dumps(data)

        return HttpResponse(data_json, content_type="application/json")

@csrf_exempt
def contactos(request):

    if request.method == 'GET':

        data = Contacto.objects.filter(id__in=[6,7,8,9,11,12]).values('id','nombre')

        data = ValuesQuerySetToDict(data)

        data_json = simplejson.dumps(data)

        return HttpResponse(data_json, content_type="application/json")


@csrf_exempt
def actualizatrama(request):

    if request.method == 'POST':

        data = json.loads(request.body)

        print 'Actualizar Trama',data

        dni = None
        codigoautorizacion = None
        tarjetabancaria = None
        sexo = None 
        primernombre = None
        segundonombre = None
        apellidos = None

        for d in data:

            if d == 'dni':

                dni = data['dni']

            if d =='codigoautorizacion':

                codigoautorizacion = data['codigoautorizacion']

            if d == 'tarjetacredito':

                tarjetabancaria = data['tarjetacredito']

            if d == 'sexo':

                sexo = data['sexo']

            if d == 'direccion':

                direccion = data['direccion']

            if d == 'distrito':

                distrito = data['distrito']

            if d == 'provincia':

                provincia = data['provincia']

            if d == 'departamento':

                departamento = data['departamento']


            if d == 'primernombre':

                primernombre = data['primernombre']


            if d == 'segundonombre':

                segundonombre = data['segundonombre']


            if d == 'apellidos':

                apellidos = data['apellidos']


            if d == 'fechaefectividad':

                fechaefectividad = data['fechaefectividad']


        base = OrigBaseC01.objects.get(dni=dni)
        base.codigoautorizacion = codigoautorizacion
        base.tarjetacredito = tarjetabancaria
        base.sexo=sexo
        base.direccion = direccion
        base.distrito = distrito
        base.provincia=provincia
        base.departamento=departamento
        base.primernombre = primernombre
        base.segundonombre = segundonombre
        base.apellidos = apellidos
        base.fechaefectividad = fechaefectividad

        base.save()

        data_json = simplejson.dumps(data)


        return HttpResponse(data_json, content_type="application/json")


@csrf_exempt
def actualizabbva(request):

    if request.method == 'POST':

        data = json.loads(request.body)

        print data

        nombre = None
        dni = None
        fecha_nacimiento = None
        telefono1 = None
        telefono2 = None
        mail = None
        cantidad = None
        nombredelproducto = None
        cobertura = None
        direccion = None
        tipo_envio =None
        prima = None
        todo_prima = None
        facebook = None
        lpd= None
        deacuerdo= None
        nomagente = None

        
        for d in data:

            if d == 'nombre':

                nombre = data['nombre']

            if d == 'dni':

                dni = data['dni']

            if d == 'fecha_nacimiento':

                fecha_nacimiento = data['fecha_nacimiento']

            if d == 'telefono1':

                telefono1 = data['telefono1']

            if d == 'telefono2':

                telefono2 = data['telefono2']

            if d == 'mail':

                mail = data['mail']

            if d == 'cantidad':

                cantidad = data['cantidad']

            if d == 'nombredelproducto':

                nombredelproducto = data['nombredelproducto']

            if d == 'cobertura':

                cobertura = data['cobertura']

            if d == 'direccion':

                direccion = data['direccion']

            if d == 'tipo_envio':

                tipo_envio = data['tipo_envio']

            if d == 'prima':

                prima = data['prima']

            if d == 'todo_prima':

                todo_prima = data['todo_prima']

            if d == 'facebook':

                facebook = data['facebook']

            if d == 'lpd':

                deacuerdo = data['lpd']

            if d == 'nomagente':

                nomagente = data['nomagente']

        base = OrigBaseC01.objects.get(dni=dni)
        base.nombre = nombre
        base.dni = dni
        base.fecha_nacimiento = fecha_nacimiento
        base.telefono1 = telefono1
        base.telefono2 = telefono2
        base.mail = mail
        base.cantidad = cantidad
        base.nombredelproducto = nombredelproducto
        base.cobertura = cobertura
        base.direccion = direccion
        base.tipo_envio =tipo_envio
        base.prima = prima
        base.todo_prima = todo_prima
        base.facebook = facebook
        base.deacuerdo = deacuerdo
        base.nombre_agente = nomagente

        base.fecha_actualizar_bbva = datetime.today()-timedelta(hours=5)


        base.save()

        data = ValuesQuerySetToDict(data)

        data_json = simplejson.dumps(data)

        os.system('python /var/www/html/gestion/apis/gestion/audio.py'+' '+str("'"+nomagente+"'")+' '+str(base.dni))

        return HttpResponse(data_json, content_type="application/json")

@csrf_exempt
def ventas(request):

    if request.method == 'POST':

        data = json.loads(request.body)

        print data

        nombre = None
        dni = None
        fecha_nacimiento = None
        telefono1 = None
        telefono2 = None
        mail = None
        cantidad = None
        nombredelproducto = None
        cobertura = None
        direccion = None
        tipo_envio =None
        prima = None
        todo_prima = None
        facebook = None
        lpd= None
        deacuerdo= None
        nomagente = None

        
        for d in data:

            if d == 'nombre':

                nombre = data['nombre']

            if d == 'dni':

                dni = data['dni']

            if d == 'fecha_nacimiento':

                fecha_nacimiento = data['fecha_nacimiento']

            if d == 'telefono1':

                telefono1 = data['telefono1']

            if d == 'telefono2':

                telefono2 = data['telefono2']

            if d == 'mail':

                mail = data['mail']

            if d == 'cantidad':

                cantidad = data['cantidad']

            if d == 'nombredelproducto':

                nombredelproducto = data['nombredelproducto']

            if d == 'cobertura':

                cobertura = data['cobertura']

            if d == 'direccion':

                direccion = data['direccion']

            if d == 'tipo_envio':

                tipo_envio = data['tipo_envio']

            if d == 'prima':

                prima = data['prima']

            if d == 'todo_prima':

                todo_prima = data['todo_prima']

            if d == 'facebook':

                facebook = data['facebook']

            if d == 'lpd':

                deacuerdo = data['lpd']

            if d == 'nomagente':

                nomagente = data['nomagente']

        base = OrigBaseC01.objects.get(dni=dni)
        base.nombre = nombre
        base.dni = dni
        base.fecha_nacimiento = fecha_nacimiento
        base.telefono1 = telefono1
        base.telefono2 = telefono2
        base.mail = mail
        base.cantidad = cantidad
        base.nombredelproducto = nombredelproducto
        base.cobertura = cobertura
        base.direccion = direccion
        base.tipo_envio =tipo_envio
        base.prima = prima
        base.todo_prima = todo_prima
        base.facebook = facebook
        base.deacuerdo = deacuerdo
        
        base.fecha_venta_bbva = datetime.today()-timedelta(hours=5)

        base.save()

        data = ValuesQuerySetToDict(data)

        data_json = simplejson.dumps(data)

        os.system('python /var/www/html/gestion/apis/gestion/audio.py'+' '+str("'"+nomagente+"'")+' '+str(base.dni))


        return HttpResponse(data_json, content_type="application/json")

@csrf_exempt
def venta(request):

    if request.method == 'POST':

        data = json.loads(request.body)

        print data

        nombre = None
        dni = None
        fecha_nacimiento = None
        telefono1 = None
        telefono2 = None
        mail = None
        cantidad = None
        nombredelproducto = None
        cobertura = None
        direccion = None
        tipo_envio =None
        prima = None
        todo_prima = None
        facebook = None
        lpd= None
        deacuerdo= None

        
        for d in data:

            if d == 'nombre':

                nombre = data['nombre']

            if d == 'dni':

                dni = data['dni']

            if d == 'fecha_nacimiento':

                fecha_nacimiento = data['fecha_nacimiento']

            if d == 'telefono1':

                telefono1 = data['telefono1']

            if d == 'telefono2':

                telefono2 = data['telefono2']

            if d == 'mail':

                mail = data['mail']

            if d == 'cantidad':

                cantidad = data['cantidad']

            if d == 'nombredelproducto':

                nombredelproducto = data['nombredelproducto']

            if d == 'cobertura':

                cobertura = data['cobertura']

            if d == 'direccion':

                direccion = data['direccion']

            if d == 'tipo_envio':

                tipo_envio = data['tipo_envio']

            if d == 'prima':

                prima = data['prima']

            if d == 'todo_prima':

                todo_prima = data['todo_prima']

            if d == 'facebook':

                facebook = data['facebook']

            if d == 'lpd':

                deacuerdo = data['lpd']

        base = OrigBaseC01.objects.get(dni=dni)
        base.nombre = nombre
        base.dni = dni
        base.fecha_nacimiento = fecha_nacimiento
        base.telefono1 = telefono1
        base.telefono2 = telefono2
        base.mail = mail
        base.cantidad = cantidad
        base.nombredelproducto = nombredelproducto
        base.cobertura = cobertura
        base.direccion = direccion
        base.tipo_envio =tipo_envio
        base.prima = prima
        base.todo_prima = todo_prima
        base.facebook = facebook
        base.deacuerdo = deacuerdo
        
        base.fecha_venta_bbva = datetime.today()-timedelta(hours=5)

        base.save()

        data = ValuesQuerySetToDict(data)

        data_json = simplejson.dumps(data)

        return HttpResponse(data_json, content_type="application/json")


@csrf_exempt
def acciones(request,contacto):

    if request.method == 'GET':

        data = Tipificacion.objects.filter(contacto_id=contacto).values('accion','accion__nombre').annotate(num_acciones=Count('accion__nombre'))

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

            fmt = '%Y-%m-%d %H:%M:%S'

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
def reportebbva(request,contacto):

    if request.method == 'GET':

        # data = OrigBaseC01.objects.filter(cod_cam=29,mail__isnull=False).values('dni','nombre','telefono1','telefono2',
        #     'mail','tipo_envio','campana','cobertura','cant_afiliados','fecha_nacimiento',
        #     'tipo_tarjeta','observaciones','prima_mensual','todo_prima','cod_cam','cantidad',
        #     'nombredelproducto','tipodecobertura','tipodedocumento','nrotarjetaencriptada',
        #     'tienetarjetadecredito','tarjetasadicionales','recibects','tienelpdp','facebook',
        #     'fecha_vencimiento','nombre_agente','observacion','deacuerdo','contacto__nombre','accion__nombre',
        #     'fecha_tipifica_bbva')


        # 'cantidad','tipodecobertura','tipodedocumento','tienetarjetadecredito','facebook','nombredeagente'
        # 'contacto__nombre','accion__nombre','fecha_tipifica_bbva'

        data = OrigBaseC01.objects.filter(cod_cam=29,mail__isnull=False).values('dni','nombre','telefono1','telefono2','direccion','mail','tipo_envio','cobertura','cant_afiliados','fecha_nacimiento','observaciones','cantidad','nombre_agente','contacto__nombre','accion__nombre','fecha_tipifica_bbva')


        # for j in range(len(data)):

        #     fmt = '%Y-%m-%d %H:%M:%S'

        #         data[x]['fecha_venta_bbva'] = ''

   
        #             base[x]['fecha_venta_bbva'] = OrigBase.objects.get(id_orig_base=base[x]['id_orig_base']).fgestion.strftime(fmt)

        #         base = ValuesQuerySetToDict(base)

        #     data[j]['registros'] = base[0]

        response = HttpResponse(content_type='text/csv')
    
        response['Content-Disposition'] = 'attachment; filename="Resumenbbva.csv"'
    
        writer = csv.writer(response)

        writer.writerow(['dni','nombre','telefono1','telefono2','direccion','mail',
        'tipo_envio','cobertura','cant_afiliados','fecha_nacimiento','observaciones','cantidad','nombre_agente','contacto__nombre','accion__nombre','fecha_tipifica_bbva'])

        print 'Csv...'

        for d in data:

            if d['dni']:
                d['dni'] = d['dni'].encode('ascii','ignore')
                d['dni'] = d['dni'].encode('ascii','replace')

            if d['nombre']:
                d['nombre'] = d['nombre'].encode('ascii','ignore')
                d['nombre'] = d['nombre'].encode('ascii','replace')

            if d['telefono1']:
                d['telefono1'] = d['telefono1'].encode('ascii','ignore')
                d['telefono1'] = d['telefono1'].encode('ascii','replace')

            if d['telefono2']:
                d['telefono2'] = d['telefono2'].encode('ascii','ignore')
                d['telefono2'] = d['telefono2'].encode('ascii','replace')

            if d['mail']:
                d['mail'] = d['mail'].encode('ascii','ignore')
                d['mail'] = d['mail'].encode('ascii','replace')

            if d['tipo_envio']:
                d['tipo_envio'] = d['tipo_envio'].encode('ascii','ignore')
                d['tipo_envio'] = d['tipo_envio'].encode('ascii','replace')

            # if d['campana']:
            #     d['campana'] = d['campana'].encode('ascii','ignore')
            #     d['campana'] = d['campana'].encode('ascii','replace')

            if d['cobertura']:
                d['cobertura'] = d['cobertura'].encode('ascii','ignore')
                d['cobertura'] = d['cobertura'].encode('ascii','replace')

            if d['cant_afiliados']:
                d['cant_afiliados'] = d['cant_afiliados'].encode('ascii','ignore')
                d['cant_afiliados'] = d['cant_afiliados'].encode('ascii','replace')

            if d['fecha_nacimiento']:
                d['fecha_nacimiento'] = d['fecha_nacimiento'].encode('ascii','ignore')
                d['fecha_nacimiento'] = d['fecha_nacimiento'].encode('ascii','replace')

            # if d['tipo_tarjeta']:
            #     d['tipo_tarjeta'] = d['tipo_tarjeta'].encode('ascii','ignore')
            #     d['tipo_tarjeta'] = d['tipo_tarjeta'].encode('ascii','replace')

            if d['observaciones']:
                d['observaciones'] = d['observaciones'].encode('ascii','ignore')
                d['observaciones'] = d['observaciones'].encode('ascii','replace')

            # if d['prima_mensual']:
            #     d['prima_mensual'] = d['prima_mensual'].encode('ascii','ignore')
            #     d['prima_mensual'] = d['prima_mensual'].encode('ascii','replace')

            # if d['todo_prima']:
            #     d['todo_prima'] = d['todo_prima'].encode('ascii','ignore')
            #     d['todo_prima'] = d['todo_prima'].encode('ascii','replace')


            # if d['nombredelproducto']:
            #     d['nombredelproducto'] = d['nombredelproducto'].encode('ascii','ignore')
            #     d['nombredelproducto'] = d['nombredelproducto'].encode('ascii','replace')

            # if d['tipodecobertura']:
            #     d['tipodecobertura'] = d['tipodecobertura'].encode('ascii','ignore')
            #     d['tipodecobertura'] = d['tipodecobertura'].encode('ascii','replace')

            # if d['tipodedocumento']:
            #     d['tipodedocumento'] = d['tipodedocumento'].encode('ascii','ignore')
            #     d['tipodedocumento'] = d['tipodedocumento'].encode('ascii','replace')

            # if d['tienetarjetadecredito']:
            #     d['tienetarjetadecredito'] = d['tienetarjetadecredito'].encode('ascii','ignore')
            #     d['tienetarjetadecredito'] = d['tienetarjetadecredito'].encode('ascii','replace')

            # if d['tarjetasadicionales']:
            #     d['tarjetasadicionales'] = d['tarjetasadicionales'].encode('ascii','ignore')
            #     d['tarjetasadicionales'] = d['tarjetasadicionales'].encode('ascii','replace')

            # if d['recibects']:
            #     d['recibects'] = d['recibects'].encode('ascii','ignore')
            #     d['recibects'] = d['recibects'].encode('ascii','replace')

            # if d['tienelpdp']:
            #     d['tienelpdp'] = d['tienelpdp'].encode('ascii','ignore')
            #     d['tienelpdp'] = d['tienelpdp'].encode('ascii','replace')

            # if d['facebook']:
            #     d['facebook'] = d['facebook'].encode('ascii','ignore')
            #     d['facebook'] = d['facebook'].encode('ascii','replace')

            # if d['fecha_vencimiento']:
            #     d['fecha_vencimiento'] = d['fecha_vencimiento'].encode('ascii','ignore')
            #     d['fecha_vencimiento'] = d['fecha_vencimiento'].encode('ascii','replace')

            if d['nombre_agente']:
                d['nombre_agente'] = d['nombre_agente'].encode('ascii','ignore')
                d['nombre_agente'] = d['nombre_agente'].encode('ascii','replace')

            if d['direccion']:
                d['direccion'] = d['direccion'].encode('ascii','ignore')
                d['direccion'] = d['direccion'].encode('ascii','replace')

            # if d['deacuerdo']:
            #     d['deacuerdo'] = d['deacuerdo'].encode('ascii','ignore')
            #     d['deacuerdo'] = d['deacuerdo'].encode('ascii','replace')

            # if d['contacto']:
            #     d['contacto'] = d['contacto'].encode('ascii','ignore')
            #     d['contacto'] = d['contacto'].encode('ascii','replace')

            # if d['accion']:
            #     d['accion'] = d['accion'].encode('ascii','ignore')
            #     d['accion'] = d['accion'].encode('ascii','replace') 

            # if d['fecha_actualizar_bbva']:
            #     d['fecha_actualizar_bbva'] = d['fecha_actualizar_bbva'].encode('ascii','ignore')
            #     d['fecha_actualizar_bbva'] = d['fecha_actualizar_bbva'].encode('ascii','replace')

            # if d['fecha_venta_bbva']:
            #     d['fecha_venta_bbva'] = d['fecha_venta_bbva'].encode('ascii','ignore')
            #     d['fecha_venta_bbva'] = d['fecha_venta_bbva'].encode('ascii','replace')

            # if d['fecha_tipifica_bbva']:
            #     d['fecha_tipifica_bbva'] = d['fecha_tipifica_bbva'].encode('ascii','ignore')
            #     d['fecha_tipifica_bbva'] = d['fecha_tipifica_bbva'].encode('ascii','replace')



            #     writer.writerow([d['dni'],d['nombre'],d['telefono1'],d['telefono2'],d['mail'],
            # d['tipo_envio'],d['campana'],d['cobertura'],d['cant_afiliados'],d['fecha_nacimiento'],
            # d['tipo_tarjeta'],d['observaciones'],d['prima_mensual'],d['todo_prima'],d['cod_cam'],
            # d['cantidad'],d['nombredelproducto'],d['tipodecobertura'],d['tipodedocumento'],
            # d['tienetarjetadecredito'],d['tarjetasadicionales'],
            # d['recibects'],d['tienelpdp'],d['facebook'],d['fecha_vencimiento'],d['nombre_agente'],
            # d['observacion'],d['deacuerdo'],d['contacto__nombre'],d['accion__nombre'],d['fecha_tipifica_bbva']])

            writer.writerow([d['dni'],d['nombre'],d['telefono1'],d['telefono2'],d['direccion'],d['mail'],d['tipo_envio'],d['cobertura'],d['cant_afiliados'],d['fecha_nacimiento'],d['observaciones'],d['cantidad'],d['nombre_agente'],d['contacto__nombre'],d['accion__nombre'],d['fecha_tipifica_bbva']])

        return response   
   

def generablancos(data):

    e = ''

    for b in range(data):

        e = ' '+ e

    return e

@csrf_exempt
def trama(request,dni):

    if request.method == 'GET':


        base = OrigBaseC01.objects.get(dni=dni)
        
        m = []

        # Tipo de registro - 1
        tipo = '1'
        eb = 1 - len(tipo)
        tipo = tipo + generablancos(eb)

        ccampana = 'PE17008801'
        eb = 10 - len(ccampana)
        ccampana = ccampana + generablancos(eb)

        # DNI
        dni = base.dni
        eb = 15 - len(dni)
        dni = dni + generablancos(eb)


        # Tipo de cobertura - 2
        tcobertura = 'PA'
        eb = 2 - len(tcobertura)
        tcobertura = tcobertura + generablancos(eb)

        base.nombre = base.nombre.encode('ascii','ignore')
        base.nombre = base.nombre.encode('ascii','replace')


        #Nombre Apellido - 50
        nombre = base.nombre
        eb = 50 - len(nombre)
        nombre = nombre + generablancos(eb)
    

        #Nombre del Contratante - 30
        ncontratante = base.primernombre
        eb = 30 - len(ncontratante)
        ncontratante = ncontratante + generablancos(eb)


        #Segundo Nombre del contratante - 15
        if base.segundonombre == None:
            base.segundonombre =''
        scontratante = base.segundonombre
        eb = 15 - len(scontratante)
        scontratante = scontratante + generablancos(eb)


        #Apellidos del contratante - 30
        apcontratante = base.apellidos
        eb = 30 - len(apcontratante)
        apcontratante = apcontratante + generablancos(eb)


        #Direccion 1 - 30
        if base.direccion == None:
            base.direccion =''
        direccion1 = base.direccion
        eb = 30 - len(direccion1)
        direccion1 = direccion1 + generablancos(eb)


        #Direccion 2 - 30
        direccion2 = ''
        eb = 30 - len(direccion2)
        direccion2 = direccion2 + generablancos(eb)


        #Direccion 3 -30
        direccion3 = base.distrito
        eb = 30 - len(direccion3)
        direccion3 = direccion3 + generablancos(eb)

        #Provincia-30
        provincia = base.provincia
        eb = 30 - len(provincia)
        provincia = provincia + generablancos(eb)

        #Departamento-2
        departamento = base.departamento
        eb = 2 - len(departamento)
        departamento = departamento + generablancos(eb)

        #Sexo-2
        sexo =base.sexo
        eb = 2 - len(sexo)
        sexo = sexo + generablancos(eb)

        idioma='02'

        #Poliza
        poliza ='01'
        eb = 2 - len(poliza)
        poliza = poliza + generablancos(eb)

        #transaccion
        transaccion ='NEW'

        #Direccion 4 - 30
        direccion4 = ''
        eb = 30 - len(direccion4)
        direccion4 = direccion4 + generablancos(eb)


        #Telefono de Casa - 20
        if base.telefono2 == None:
            base.telefono2 = ''
        telfcasa = base.telefono2
        eb = 20 - len(telfcasa)
        telfcasa = telfcasa + generablancos(eb)


        #Telefono de trabajo - 20

        if base.telefono1 == None:
            base.telefono1 = ''
        telefonotrabajo = base.telefono1
        eb = 20 - len(telefonotrabajo)
        telefonotrabajo = telefonotrabajo + generablancos(eb)


        dependientes = '00'

        #Fecha de expiracion - 100
        #fexpiracion = '03/17'
        fexpiracion = str(base.fecha_vencimiento).split('-')[1]+'/'+str(base.fecha_vencimiento)[2:4]
        eb = 5- len(fexpiracion)
        fexpiracion = fexpiracion + generablancos(eb)


        #Fecha de Naciomiento - 100
        reference3 = base.codigoautorizacion
        eb = 100 - len(reference3)
        reference3 = reference3 + generablancos(eb)


        #Fecha de Naciomiento - 8
        fechadenacimiento = base.fecha_nacimiento.replace('-','')
        eb = 8 - len(fechadenacimiento)
        fechadenacimiento = fechadenacimiento + generablancos(eb)


        #Email - 40 
        email = base.mail
        eb = 40 - len(email)
        email = email + generablancos(eb)


        #Unit - 100
        uni = ''
        eb = 100 - len(uni)
        uni = uni + generablancos(eb)

        #Datos Especificos del producto - 2080
        datespecpro = ''
        eb = 2080 - len(datespecpro)
        datespecpro = datespecpro + generablancos(eb)

        codigoproductosimple = 'PAP494'
        eb = 60 - len(codigoproductosimple)
        codigoproductosimple = codigoproductosimple + generablancos(eb)


        #Cuenta bancaria - 20
        cuentabancaria = base.tarjetacredito
        eb = 20 - len(cuentabancaria)
        cuentabancaria = cuentabancaria + generablancos(eb)

        #Cuenta bancaria - 20
        fechaefectividad = base.fechaefectividad
        eb = 20 - len(fechaefectividad)
        fechaefectividad = fechaefectividad + generablancos(eb)

        #DNI - 15
        dni = base.dni
        eb = 15 - len(dni)
        dni = dni + generablancos(eb)

        #telefono casa - 20
        telefonocasa = base.telefono1
        eb = 20 - len(telefonocasa)
        telefonocasa = telefonocasa + generablancos(eb)

                #telefono casa - 20
        telefonotrabajo = base.telefono2
        eb = 20 - len(telefonotrabajo)
        telefonotrabajo = telefonotrabajo + generablancos(eb)


        #telefono casa - 20
        vendedor = base.nombre_agente
        eb = 20 - len(vendedor)
        vendedor = vendedor + generablancos(eb)

        print str(base.tipo_tarjeta)[0:10]

        if str(base.tipo_tarjeta)[0:4] == 'Visa':
            codigotarjeta = 'P9'
        if str(base.tipo_tarjeta)[0:10] == 'MasterCard':
            codigotarjeta = 'P8' 
            print 'entre masti'

        print codigotarjeta
        eb = 2 - len(codigotarjeta)
        codigotarjeta = codigotarjeta + generablancos(eb)

        #1PE16015801      PAP407                                                      9999999999999999    08808817       2MO20170101          GRAMIREZ                      P910M CORINA IMELDA MONZON CASTILLO                     CORINA                        IMELDA         MONZON CASTILLO               01AV ignacio merino N 795 URB palermo                         130107                                                                     1301                          ZG          PE044212807                               1955123002  02        0100                          NEW                                     corinamonzoncatillo@hotmail.com                                                                                                                                                                                                                                                                                                                     230230  

        m.append(tipo)#tipo de registro - 1 / 1-1
        m.append(ccampana)#codigo de campana - 10 / 2-11
        m.append('      ') #codigo de producto paquete - 6 / 12-17
        m.append(codigoproductosimple)#codigo de producto simple - 60 / 18-77
        m.append(cuentabancaria)#numero de cuenta bancaria - 20 / 78-97
        m.append(dni)#numero de DNI - 15 / 98-112
        m.append('1')#plan - 1 / 113-113
        m.append('MO')#tipo de cobertura - 2 / 114-115
        m.append(fechaefectividad)#Fecha de efectividad - 8 / 116-123
        m.append(generablancos(10))#codigo de sucursal bancaria - 10 / 124-133
        m.append(vendedor)#codigo de vendedor - 20 / 134-153
        m.append(generablancos(10))#codigo de banco - 10 / 154-163
        m.append(codigotarjeta)#codigo de tarjeta de credito - 2 /164-165
        m.append('10')#metodo de pago - 2 / 166-167
        m.append('M ')#frecuencia de pago - 2 / 168-169
        m.append(nombre)# nombre y apellido del contratante - 50 / 170-219
        m.append(ncontratante)#nombre del contratante - 30 / 220-249
        m.append(scontratante)#segundo nombre del contratante - 15 / 250-264
        m.append(apcontratante)#apellido del contratante - 30 /265-294
        m.append('01')#codigo de tipo de direccion - 2 / 295-296
        m.append(direccion1)#direccion 1 - 30 / 297-326
        m.append(direccion2)#direccion 2 - 30 / 327-356
        m.append(direccion3)#direccion 3 - 30 / 357-386
        m.append(direccion4)#direccion 4 - 30 / 387-416
        m.append(generablancos(15))#filler - 15 / 417-431
        m.append(provincia)#provincia - 30 / 432-461
        m.append(departamento)#departamento - 2 / 462-463
        m.append(generablancos(10))#postal - 10 / 464-473
        m.append('PE')#codigo de pais - 2 / 474-475
        m.append(telefonocasa)#telefono de casa - 20 / 476-495
        m.append(telefonotrabajo)#telefono de trabajo - 20 / 496-515
        m.append(fechadenacimiento)#fecha de nacimiento - 8 / 516-523
        m.append(sexo)#codigo de sexo - 2 / 524-525
        m.append(generablancos(2))#titulo - 2 / 526-527
        m.append(idioma)#idioma - 2 / 528-529
        m.append(generablancos(2))#filler - 2 / 530-531
        m.append(generablancos(2))#filler - 2 / 532-533
        m.append(generablancos(2))#filler - 2 / 534-535
        m.append(generablancos(2))#filler - 2 / 536-537
        m.append(poliza)#indicador de envio de polisa - 2 / 538-539
        m.append(dependientes)#numero de dependientes - 2 / 540-541
        m.append(generablancos(2))#filler - 2 / 542-543
        m.append(generablancos(15))#polisa - 15 / 544-558
        m.append(generablancos(9))#filler - 9 / 559-567
        m.append(transaccion)#codigo de transaccion - 3 / 568-570
        m.append(generablancos(2))#filler - 2 / 571-572
        m.append(generablancos(5))#filler - 5 / 573-577
        m.append(generablancos(30))#filler - 30 / 578-607
        m.append(email)#email - 40 / 608-647
        m.append(uni)#unit - 100 / 648-747
        m.append(generablancos(100))#referencia1 - 100 / 748-847
        m.append(generablancos(100))#referencia2 - 100 / 848-947
        m.append(reference3)#referencia3 - 100 / 948-1047
        m.append(fexpiracion)#fecha de expiracion - 5 / 1048-1052
        m.append(generablancos(10))#fecha de aplicacion - 10 / 1053-1062
        m.append(generablancos(5)) #filler - 5 / 1063-1067
        m.append(generablancos(3))#filler - 3 / 1068-1070
        m.append(generablancos(6))#filler - 6 / 1071-1076
        m.append(generablancos(10))#filler - 10 / 1077-1086
        m.append(generablancos(15))#numero de formulario - 15 / 1087-1001
        m.append(datespecpro)#datos especificos del producto - 2080 / 1002-3181
        data = ''.join(m)

        print 'carater 10' ,data[108]


        
        # data[0:2] = '22323'

        # data[2:4] = 'yeyey'

        print data

        response = HttpResponse(content_type='text/csv')
    
        response['Content-Disposition'] = 'attachment; filename="Trama.txt"'

        response.write(u'\ufeff'.encode('utf8'))
    
        writer = csv.writer(response)

        writer.writerow([data])

        return response   


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

        data = OrigBaseC01.objects.filter(dni=dni,cod_cam=29).values('tipodedocumento','facebook','cobertura','nombredelproducto','cantidad','facebook','mail','telefono1','telefono2','tienetarjetadecredito','tarjetasadicionales','recibects','tienelpdp','id','nombre','dni','cobertura','plan_cobertura','cant_afiliados','direccion','distrito','provincia','departamento','mail','fecha_nacimiento','call','fecha','campana','prima_mensual','todo_prima','telefono1','telefono2','telefono3','telefono4','telefono5','telefono6','telefono7','tipo_tarjeta','tipo_envio','comercial')
        
        
        fmt = '%Y-%b-%d %H:%M:%S'

        for x in range(len(data)):

            if OrigBaseC01.objects.filter(id=data[x]['id']).values('fecha_venta_bbva')[0]['fecha_venta_bbva']:

                data[x]['fecha_venta_bbva'] = OrigBaseC01.objects.get(id=data[x]['id']).fecha_venta_bbva.strftime(fmt)

            if OrigBaseC01.objects.filter(id=data[x]['id']).values('fecha_tipifica_bbva')[0]['fecha_tipifica_bbva']:

                data[x]['fecha_tipifica_bbva'] = OrigBaseC01.objects.get(id=data[x]['id']).fecha_tipifica_bbva.strftime(fmt)


            if OrigBaseC01.objects.filter(id=data[x]['id']).values('fecha_actualizar_bbva')[0]['fecha_actualizar_bbva']:

                data[x]['fecha_actualizar_bbva'] = OrigBaseC01.objects.get(id=data[x]['id']).fecha_actualizar_bbva.strftime(fmt)


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

        print date.today()



        contacto = ''
        estado = ''
        accion=''
        observacion = ''
        fagenda = '1900-01-01'
        phone = ''

        agendax = False

        base = data['base']
        idagente = data['idagente']
        nomagente = data['nomagente']
        dni = data['dni']


        for d in data:

            if d =='contacto':

                contacto = data['contacto']

                if type(contacto)==dict:

                    contacto = data['contacto']['id'] 

            if d == 'accion':

                if type(accion)==dict:

                    accion = data['accion']['id'] 

                accion = data['accion']

            if d =='estado':

                if type(estado)==dict:

                    estado = data['estado']['id'] 

                estado = data['estado']

            if d =='observacion':

                observacion = data['observacion']

            if d =='fecha':

                fecha = data['fecha']

                print fecha

            if d == 'tadicional':

                phone = data['tadicional']


            if d == 'dni':

                dni = data['dni']


            if d == 'mytime':

                mytime = data['mytime']

                fagenda = str(fecha)[0:10]+' '+str(mytime)[11:19]

                #fagenda = datetime.strptime(fagenda,'%Y-%m-%d  %H:%M:%S')

                agendax = True

        ccampana = 3

        if ccampana==3:

            b = OrigBaseC01.objects.get(dni=dni,cod_cam=29)

            print 'b', b

            b.contacto_id = contacto

            b.estado_id = estado

            b.accion_id = accion

            b.observacion = observacion 

            b.id_ori_usuario = idagente

            b.nombre_agente = nomagente

            b.fecha_tipifica_bbva = datetime.today()-timedelta(hours=5)


            # if agendax:

            #     b.fagenda = fagenda-timedelta(hours=5)

            b.tadicional = phone


        if ccampana == 1:

            b = OrigBaseC01.objects.get(dni=dni)
            b.nombre_agente = nombre_agente
            b.observacion = observacion
            b.contacto=contacto

            b.save()



        b.save()

        data = ValuesQuerySetToDict('data')

        data_json = simplejson.dumps(data)

        os.system('python /var/www/html/gestion/apis/gestion/audio.py'+' '+str("'"+nomagente+"'")+' '+str(dni))

        return HttpResponse(data_json, content_type="application/json")