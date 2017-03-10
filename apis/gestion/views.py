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

def generablancos(data):

    e = ''

    for b in range(data):

        e = ' '+ e

    return e

@csrf_exempt
def trama(request):

    if request.method == 'GET':

        
        m = []

        # Tipo de registro - 1
        tipo = '1'
        eb = 1 - len(tipo)
        tipo = tipo + generablancos(eb)


        # Codigo de Producto Paquete - 6
        cproducto = '7272'
        eb = 6 - len(cproducto)
        cproducto = cproducto + generablancos(eb)


        # DNI
        dni = '72748565'
        eb = 15 - len(dni)
        dni = dni + generablancos(eb)


        # Tipo de cobertura - 2
        tcobertura = '1'
        eb = 2 - len(tcobertura)
        tcobertura = tcobertura + generablancos(eb)


        #Nombre Apellido - 50
        nombrea = 'Eurieds'
        eb = 50 - len(nombrea)
        nombrea = nombrea + generablancos(eb)
    

        #Nombre del Contratante - 30
        ncontratante = 'Manuel'
        eb = 30 - len(ncontratante)
        ncontratante = ncontratante + generablancos(eb)


        #Segundo Nombre del contratante - 30
        scontratante = 'Eurieds'
        eb = 30 - len(scontratante)
        scontratante = scontratante + generablancos(eb)


        #Apellidos del contratante - 30
        apcontratante = 'Eurieds'
        eb = 30 - len(apcontratante)
        apcontratante = apcontratante + generablancos(eb)


        #Direccion 1 - 30
        direccion1 = 'Eurieds'
        eb = 30 - len(direccion1)
        direccion1 = direccion1 + generablancos(eb)


        #Direccion 2 - 30
        direccion2 = 'Eurieds'
        eb = 30 - len(direccion2)
        direccion2 = direccion2 + generablancos(eb)


        #Direccion 3 -30
        direccion3 = 'Eurieds'
        eb = 30 - len(direccion3)
        direccion3 = direccdireccion4ion3 + generablancos(eb)


        #Direccion 4 - 30
        direccion4 = 'Eurieds'
        eb = 30 - len(direccion4)
        direccion4 = direccion4 + generablancos(eb)


        #Telefono de Casa - 20
        telfcasa = 'Eurieds'
        eb = 20 - len(telfcasa)
        telfcasa = telfcasa + generablancos(eb)


        #Telefono de trabajo - 20
        telftrabajo = 'Eurieds'
        eb = 20 - len(telftrabajo)
        telftrabajo = telftrabajo + generablancos(eb)


        #Fecha de Naciomiento - 8
        fechadenacimiento = 'Eurieds'
        eb = 8 - len(fechadenacimiento)
        fechadenacimiento = fechadenacimiento + generablancos(eb)


        #Email - 40 
        email = 'Eurieds'
        eb = 40 - len(email)
        email = email + generablancos(eb)


        #Unit - 100
        uni = 'Eurieds'
        eb = 100 - len(uni)
        uni = uni + generablancos(eb)


        #Datos Especificos del producto - 2080
        datespecpro = 'Eurieds'
        eb = 2080 - len(datespecpro)
        datespecpro = datespecpro + generablancos(eb)




        m.append('1')#tipo de registro - 1
        m.append('          ')#codigo de capana - 10
        m.append('      ')#codigo de producto paquete - 6
        m.append('                                                            ')#codigo de producto simple - 60
        m.append('                    ')#numero de cuenta bancaria - 20
        m.append(dni)#numero de DNI - 15
        m.append(' ')#plan - 1
        m.append(cobertura)#tipo de cobertura - 2
        m.append('        ')#Fecha de efectividad - 8
        m.append('          ')#codigo de sucursal bancaria - 10
        m.append('                    ')#codigo de vendedor - 20
        m.append('          ')#codigo de banco - 10
        m.append('  ')#codigo de tarjeta de credito - 2
        m.append('  ')#metodo de pago - 2
        m.append('  ')#frecuencia de pago - 2
        m.append('                                                  ')# nombre y apellido del contratante - 50
        m.append('                              ')#nombre del contratante - 30
        m.append('                              ')#segundonombre del contratante - 30
        m.append('  ')#codigo de tipo de direccion - 2
        m.append('                              ')#direccion 1 - 30
        m.append('                              ')#direccion 2 - 30
        m.append('                              ')#direccion 3 - 30
        m.append('                              ')#direccion 4 - 30
        m.append('               ')#fillar - 15
        m.append('                              ')#provincia - 30
        m.append('  ')#departamento - 2
        m.append('          ')#postal - 10
        m.append('  ')#codigo de pais - 2
        m.append('                    ')#telefono de casa - 20
        m.append('                    ')#telefono de trabajo - 20
        m.append('        ')#fecha de nacimiento - 8
        m.append('  ')#codigo de sexo - 2
        m.append('  ')#titulo - 2
        m.append('  ')#idioma - 2
        m.append('  ')#filler - 2
        m.append('  ')#filler - 2
        m.append('  ')#filler - 2
        m.append('  ')#filler - 2
        m.append('  ')#indicador de envio de polisa - 2
        m.append('  ')#numero de dependientes - 2
        m.append('  ')#filler - 2
        m.append('               ')#polisa - 15
        m.append('         ')#filler - 9
        m.append('   ')#codigo de transaccion - 3
        m.append('  ')#filler - 2
        m.append('     ')#filler - 5
        m.append('                              ')#filler - 30
        m.append('                                        ')#email - 40
        m.append('                                                                                                    ')#unit - 100
        m.append('                                                                                                    ')#referencia1 - 100
        m.append('                                                                                                    ')#referencia2 - 100
        m.append('                                                                                                    ')#referencia3 - 100
        m.append('     ')#fecha de expiracion - 5
        m.append('          ')#fecha de aplicacion - 10
        m.append('     ')#filler - 5
        m.append('   ')#filler - 3
        m.append('      ')#filler - 6
        m.append('          ')#filler - 10
        m.append('               ')#numero de formulario - 15
        m.append('                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ')#datos especificos del producto - 2080




        data = ''.join(m)


      

        
        # data[0:2] = '22323'

        # data[2:4] = 'yeyey'

        # print data

        response = HttpResponse(content_type='text/csv')
    
        response['Content-Disposition'] = 'attachment; filename="Trama.csv"'
    
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
        idagente = data['idagente']
        nomagente = data['nomagente']

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

        b.id_ori_usuario = idagente

        b.nombre_agente = nomagente

        if agendax:

            b.fagenda = fagenda-timedelta(hours=5)

        b.tadicional = phone



        b.save()

        data = ValuesQuerySetToDict('data')

        data_json = simplejson.dumps(data)

        return HttpResponse(data_json, content_type="application/json")