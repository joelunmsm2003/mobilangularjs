# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models


class Accion(models.Model):
    nombre = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'accion'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=80)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=30)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Contacto(models.Model):
    nombre = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'contacto'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Estado(models.Model):
    nombre = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'estado'


class OrigBase(models.Model):
    id_orig_base = models.AutoField(primary_key=True)
    telefono = models.IntegerField(blank=True, null=True)
    orden = models.IntegerField()
    cliente = models.CharField(max_length=11)
    id_orig_base_c = models.ForeignKey('OrigBaseC01', models.DO_NOTHING, db_column='id_orig_base_c', blank=True, null=True)  # Field name made lowercase.
    lestado = models.IntegerField(db_column='lEstado')  # Field name made lowercase.
    cod_cam = models.IntegerField()
    llam_estado = models.IntegerField()
    id_ori_usuario = models.IntegerField()
    fechaproceso = models.DateTimeField()
    pre_flag = models.IntegerField()
    pre_estado = models.IntegerField()
    nombre_agente = models.CharField(max_length=100, blank=True, null=True)
    contacto = models.ForeignKey(Contacto, models.DO_NOTHING, db_column='contacto', blank=True, null=True)
    accion = models.ForeignKey(Accion, models.DO_NOTHING, db_column='accion', blank=True, null=True)
    estado = models.ForeignKey(Estado, models.DO_NOTHING, db_column='estado', blank=True, null=True)
    fagenda = models.DateTimeField(blank=True, null=True)
    observacion = models.CharField(max_length=300, blank=True, null=True)
    fgestion = models.DateTimeField(blank=True, null=True)
    tadicional = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'orig_base'


class OrigBaseC01(models.Model):
    fecha_recepcion_bbdd = models.CharField(db_column='FECHA_RECEPCION_BBDD', max_length=100, blank=True, null=True)  # Field name made lowercase.
    call = models.CharField(db_column='CALL', max_length=100, blank=True, null=True)  # Field name made lowercase.
    fecha = models.CharField(db_column='FECHA', max_length=100, blank=True, null=True)  # Field name made lowercase.
    nombre = models.CharField(db_column='NOMBRE', max_length=100, blank=True, null=True)  # Field name made lowercase.
    apellido = models.CharField(db_column='APELLIDO', max_length=100, blank=True, null=True)  # Field name made lowercase.
    dni = models.CharField(db_column='DNI', max_length=100, blank=True, null=True)  # Field name made lowercase.
    plan_cobertura = models.CharField(db_column='PLAN_COBERTURA', max_length=100, blank=True, null=True)  # Field name made lowercase.
    direccion = models.CharField(db_column='DIRECCION', max_length=100, blank=True, null=True)  # Field name made lowercase.
    distrito = models.CharField(db_column='DISTRITO', max_length=100, blank=True, null=True)  # Field name made lowercase.
    provincia = models.CharField(db_column='PROVINCIA', max_length=100, blank=True, null=True)  # Field name made lowercase.
    departamento = models.CharField(db_column='DEPARTAMENTO', max_length=100, blank=True, null=True)  # Field name made lowercase.
    estado = models.CharField(db_column='ESTADO', max_length=100, blank=True, null=True)  # Field name made lowercase.
    zona = models.CharField(db_column='ZONA', max_length=100, blank=True, null=True)  # Field name made lowercase.
    telefono1 = models.CharField(db_column='TELEFONO1', max_length=100, blank=True, null=True)  # Field name made lowercase.
    telefono2 = models.CharField(db_column='TELEFONO2', max_length=100, blank=True, null=True)  # Field name made lowercase.
    mail = models.CharField(db_column='MAIL', max_length=100, blank=True, null=True)  # Field name made lowercase.
    tipo_envio = models.CharField(db_column='TIPO_ENVIO', max_length=100, blank=True, null=True)  # Field name made lowercase.
    campana = models.CharField(db_column='CAMPANA', max_length=100, blank=True, null=True)  # Field name made lowercase.
    comercial = models.CharField(db_column='COMERCIAL', max_length=100, blank=True, null=True)  # Field name made lowercase.
    cobertura = models.CharField(db_column='COBERTURA', max_length=100, blank=True, null=True)  # Field name made lowercase.
    cant_afiliados = models.CharField(db_column='CANT_AFILIADOS', max_length=100, blank=True, null=True)  # Field name made lowercase.
    fecha_nacimiento = models.CharField(db_column='FECHA_NACIMIENTO', max_length=100, blank=True, null=True)  # Field name made lowercase.
    pap = models.CharField(db_column='PAP', max_length=100, blank=True, null=True)  # Field name made lowercase.
    tipo_tarjeta = models.CharField(db_column='TIPO_TARJETA', max_length=100, blank=True, null=True)  # Field name made lowercase.
    telefono3 = models.CharField(db_column='TELEFONO3', max_length=100, blank=True, null=True)  # Field name made lowercase.
    telefono4 = models.CharField(db_column='TELEFONO4', max_length=100, blank=True, null=True)  # Field name made lowercase.
    telefono5 = models.CharField(db_column='TELEFONO5', max_length=100, blank=True, null=True)  # Field name made lowercase.
    telefono6 = models.CharField(db_column='TELEFONO6', max_length=100, blank=True, null=True)  # Field name made lowercase.
    telefono7 = models.CharField(db_column='TELEFONO7', max_length=100, blank=True, null=True)  # Field name made lowercase.
    observaciones = models.CharField(db_column='OBSERVACIONES', max_length=100, blank=True, null=True)  # Field name made lowercase.
    usuario = models.CharField(db_column='USUARIO', max_length=100, blank=True, null=True)  # Field name made lowercase.
    prima_mensual = models.CharField(db_column='PRIMA_MENSUAL', max_length=100, blank=True, null=True)  # Field name made lowercase.
    todo_prima = models.CharField(db_column='TODO_PRIMA', max_length=100, blank=True, null=True)  # Field name made lowercase.
    cod_cam = models.IntegerField()
    lote = models.IntegerField()
    t_ins = models.DateTimeField(db_column='T_INS')  # Field name made lowercase.
    flagdesplegar = models.IntegerField(db_column='flagDesplegar')  # Field name made lowercase.
    flag = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'orig_base_C01'


class Tipificacion(models.Model):
    contacto = models.ForeignKey(Contacto, models.DO_NOTHING, db_column='contacto', blank=True, null=True)
    accion = models.ForeignKey(Accion, models.DO_NOTHING, db_column='accion', blank=True, null=True)
    estado = models.ForeignKey(Estado, models.DO_NOTHING, db_column='estado', blank=True, null=True)
    tipo = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tipificacion'
