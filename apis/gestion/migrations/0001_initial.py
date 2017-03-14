# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2017-03-14 03:09
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Accion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(blank=True, max_length=1000, null=True)),
            ],
            options={
                'db_table': 'accion',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=80, unique=True)),
            ],
            options={
                'db_table': 'auth_group',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthGroupPermissions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'auth_group_permissions',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthPermission',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('codename', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'auth_permission',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128)),
                ('last_login', models.DateTimeField(blank=True, null=True)),
                ('is_superuser', models.IntegerField()),
                ('username', models.CharField(max_length=150, unique=True)),
                ('first_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=30)),
                ('email', models.CharField(max_length=254)),
                ('is_staff', models.IntegerField()),
                ('is_active', models.IntegerField()),
                ('date_joined', models.DateTimeField()),
            ],
            options={
                'db_table': 'auth_user',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthUserGroups',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'auth_user_groups',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthUserUserPermissions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'auth_user_user_permissions',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Contacto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(blank=True, max_length=1000, null=True)),
            ],
            options={
                'db_table': 'contacto',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoAdminLog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('action_time', models.DateTimeField()),
                ('object_id', models.TextField(blank=True, null=True)),
                ('object_repr', models.CharField(max_length=200)),
                ('action_flag', models.SmallIntegerField()),
                ('change_message', models.TextField()),
            ],
            options={
                'db_table': 'django_admin_log',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoContentType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('app_label', models.CharField(max_length=100)),
                ('model', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'django_content_type',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoMigrations',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('app', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('applied', models.DateTimeField()),
            ],
            options={
                'db_table': 'django_migrations',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoSession',
            fields=[
                ('session_key', models.CharField(max_length=40, primary_key=True, serialize=False)),
                ('session_data', models.TextField()),
                ('expire_date', models.DateTimeField()),
            ],
            options={
                'db_table': 'django_session',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Estado',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(blank=True, max_length=1000, null=True)),
            ],
            options={
                'db_table': 'estado',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='OriAcciones',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('accion', models.IntegerField()),
                ('anx_sup', models.CharField(max_length=20)),
                ('anx_age', models.CharField(max_length=20)),
                ('canal', models.CharField(max_length=20)),
                ('flag', models.IntegerField()),
            ],
            options={
                'db_table': 'ori_acciones',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='OriAcd',
            fields=[
                ('id_ori_acd', models.AutoField(primary_key=True, serialize=False)),
                ('did_campana', models.CharField(db_column='DID_Campana', max_length=45)),
                ('numero_llamado', models.CharField(db_column='Numero_Llamado', max_length=45)),
                ('numero_entrante', models.CharField(db_column='Numero_Entrante', max_length=45)),
                ('channel_entrante', models.CharField(db_column='Channel_Entrante', max_length=50)),
                ('tiempo', models.CharField(db_column='Tiempo', max_length=15)),
                ('flag', models.IntegerField()),
                ('uniqueid', models.CharField(max_length=30)),
                ('fin', models.IntegerField()),
                ('age_nombre', models.CharField(blank=True, max_length=100, null=True)),
                ('tie_ing', models.DateTimeField()),
                ('tie_acd', models.DateTimeField()),
                ('tie_tra', models.DateTimeField()),
                ('tie_con', models.DateTimeField()),
                ('tie_fin', models.DateTimeField()),
            ],
            options={
                'db_table': 'ori_acd',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='OriCampana',
            fields=[
                ('id_ori_campana', models.AutoField(primary_key=True, serialize=False)),
                ('campana_nombre', models.CharField(max_length=80)),
                ('campana_tipo', models.IntegerField()),
                ('campana_tipo_detalle', models.IntegerField()),
                ('campana_estado', models.IntegerField()),
                ('campana_gestion', models.CharField(max_length=100)),
                ('agregistrados', models.IntegerField(db_column='AgRegistrados')),
                ('agocupados', models.IntegerField(db_column='AgOcupados')),
                ('agdetenidos', models.IntegerField(db_column='AgDetenidos')),
                ('agpausados', models.IntegerField(db_column='AgPausados')),
                ('campana_canales', models.IntegerField()),
                ('bas_tot', models.IntegerField()),
                ('bas_pro', models.IntegerField()),
                ('bas_pro_con', models.IntegerField()),
                ('bas_pro_noc', models.IntegerField()),
                ('bas_pro_ocu', models.IntegerField()),
                ('bas_pro_ven', models.IntegerField()),
                ('bas_pro_nov', models.IntegerField()),
                ('bas_pro_age', models.IntegerField()),
                ('campana_activa', models.IntegerField()),
                ('bas_pen', models.IntegerField()),
            ],
            options={
                'db_table': 'ori_campana',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='OriChat',
            fields=[
                ('id_ori_chat', models.AutoField(primary_key=True, serialize=False)),
                ('chat_fhora', models.DateTimeField()),
                ('id_ori_usuario', models.IntegerField()),
                ('nombre_usuario', models.CharField(max_length=50)),
                ('id_ori_super', models.IntegerField()),
                ('nombre_super', models.CharField(max_length=50)),
                ('chat_mensaje', models.CharField(max_length=200)),
                ('flag', models.IntegerField()),
            ],
            options={
                'db_table': 'ori_chat',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='OriEstados',
            fields=[
                ('id_ori_estados', models.AutoField(primary_key=True, serialize=False)),
                ('cod_estado', models.IntegerField()),
                ('txt_estado', models.CharField(max_length=15)),
                ('id_ori_usuario', models.IntegerField()),
                ('f_inicio', models.DateTimeField()),
                ('f_fin', models.DateTimeField()),
                ('flag', models.IntegerField()),
            ],
            options={
                'db_table': 'ori_estados',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='OrigBase',
            fields=[
                ('id_orig_base', models.AutoField(primary_key=True, serialize=False)),
                ('telefono', models.IntegerField(blank=True, null=True)),
                ('orden', models.IntegerField()),
                ('cliente', models.CharField(max_length=11)),
                ('id_orig_base_c', models.IntegerField(blank=True, db_column='id_orig_base_C', null=True)),
                ('lestado', models.IntegerField(db_column='lEstado')),
                ('cod_cam', models.IntegerField()),
                ('llam_estado', models.IntegerField()),
                ('id_ori_usuario', models.IntegerField()),
                ('fechaproceso', models.DateTimeField()),
                ('pre_flag', models.IntegerField()),
                ('pre_estado', models.IntegerField()),
                ('nombre_agente', models.CharField(blank=True, max_length=100, null=True)),
                ('contacto', models.IntegerField(blank=True, null=True)),
                ('accion', models.IntegerField(blank=True, null=True)),
                ('estado', models.IntegerField(blank=True, null=True)),
                ('fagenda', models.DateTimeField(blank=True, null=True)),
                ('observacion', models.CharField(blank=True, max_length=300, null=True)),
                ('fgestion', models.DateTimeField(blank=True, null=True)),
                ('tadicional', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'orig_base',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='OriGrabaciones',
            fields=[
                ('id_ori_grabaciones', models.AutoField(primary_key=True, serialize=False)),
                ('id_ori_campana', models.IntegerField()),
                ('id_ori_usuario', models.IntegerField()),
                ('id_ori_llamadas', models.IntegerField()),
                ('fecha_hora', models.DateTimeField()),
                ('txt_audio', models.CharField(max_length=200)),
                ('tproyecto', models.CharField(max_length=20)),
                ('llam_origen', models.CharField(max_length=20)),
                ('llam_destino', models.CharField(max_length=20)),
                ('flag', models.IntegerField()),
            ],
            options={
                'db_table': 'ori_grabaciones',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='OriLlamadas',
            fields=[
                ('id_ori_llamadas', models.AutoField(primary_key=True, serialize=False)),
                ('age_ip', models.CharField(blank=True, max_length=20, null=True)),
                ('age_codigo', models.CharField(blank=True, max_length=10, null=True)),
                ('cam_codigo', models.IntegerField(blank=True, null=True)),
                ('llam_numero', models.CharField(blank=True, max_length=20, null=True)),
                ('llam_estado', models.IntegerField(blank=True, null=True)),
                ('llam_flag', models.IntegerField(blank=True, null=True)),
                ('llam_uniqueid', models.CharField(blank=True, max_length=45, null=True)),
                ('tipo', models.IntegerField(blank=True, null=True)),
                ('f_origen', models.DateTimeField()),
                ('canal1', models.CharField(blank=True, max_length=50, null=True)),
                ('canal2', models.CharField(blank=True, max_length=50, null=True)),
                ('flagfin', models.IntegerField(blank=True, db_column='flagFIN', null=True)),
                ('v_tring', models.IntegerField(blank=True, null=True)),
                ('v_retry', models.IntegerField(blank=True, null=True)),
                ('v_tipbusc', models.IntegerField(blank=True, null=True)),
                ('duration', models.IntegerField(blank=True, null=True)),
                ('bill', models.IntegerField(blank=True, null=True)),
                ('tregistro', models.CharField(max_length=11)),
                ('gestion_editid1', models.CharField(blank=True, max_length=20, null=True)),
                ('gestion_editid2', models.CharField(blank=True, max_length=20, null=True)),
                ('gestion_editid3', models.CharField(blank=True, max_length=20, null=True)),
                ('f_llam_discador', models.DateTimeField()),
                ('f_llam_resuelve', models.DateTimeField()),
                ('f_llam_fin', models.DateTimeField()),
                ('f_fingestion', models.DateTimeField()),
                ('hc', models.IntegerField(db_column='HC')),
                ('dur', models.IntegerField(db_column='DUR')),
            ],
            options={
                'db_table': 'ori_llamadas',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='OriUsuario',
            fields=[
                ('id_ori_usuario', models.AutoField(primary_key=True, serialize=False)),
                ('usuario_logeo', models.CharField(max_length=20)),
                ('usuario_nombre', models.CharField(max_length=80)),
                ('usuario_clave', models.CharField(max_length=60)),
                ('usuario_tipo', models.CharField(max_length=60)),
                ('id_ori_campana', models.IntegerField()),
                ('usuario_ip', models.CharField(max_length=20)),
                ('usuario_estado', models.IntegerField()),
                ('usuario_gestion', models.IntegerField()),
                ('usuario_destino', models.CharField(max_length=20)),
                ('usuario_canal', models.CharField(max_length=50)),
                ('usuario_anexo', models.CharField(max_length=5)),
                ('usuario_duracion', models.DateTimeField()),
                ('gestion_editid1', models.CharField(max_length=100)),
                ('gestion_editid2', models.CharField(max_length=20)),
                ('gestion_editid3', models.CharField(max_length=200)),
                ('gestion_editid4', models.CharField(max_length=100)),
                ('gestion_editid5', models.CharField(max_length=20)),
                ('gestion_editid6', models.CharField(max_length=20)),
                ('gestion_editid7', models.CharField(max_length=20)),
                ('gestion_editid8', models.CharField(max_length=20)),
                ('gestion_editid9', models.CharField(max_length=20)),
                ('gestion_editid10', models.CharField(max_length=20)),
                ('incall_cant', models.IntegerField()),
                ('incall_dur', models.IntegerField()),
                ('outcall_cant', models.IntegerField()),
                ('outcall_dur', models.IntegerField()),
                ('in_did', models.BigIntegerField(db_column='in_DID')),
                ('in_did2', models.BigIntegerField()),
                ('cod_int', models.CharField(max_length=11)),
                ('gestion_editid11', models.CharField(max_length=20)),
                ('usuario_telefonia', models.IntegerField()),
                ('flag_mon', models.IntegerField()),
                ('audio', models.CharField(max_length=100)),
                ('bill', models.IntegerField()),
                ('id_ori_llamadas', models.IntegerField()),
                ('acd', models.IntegerField()),
                ('abandonada_in', models.IntegerField()),
                ('abandonada_out', models.IntegerField()),
                ('age_base', models.IntegerField()),
                ('age_procesadas', models.IntegerField()),
                ('age_pendientes', models.IntegerField()),
                ('checa', models.IntegerField()),
                ('tproyecto', models.CharField(db_column='tProyecto', max_length=20)),
                ('tbase', models.CharField(db_column='tBase', max_length=20)),
                ('est_ag_predictivo', models.IntegerField()),
                ('contesta', models.IntegerField()),
                ('no_contesta', models.IntegerField()),
                ('colas', models.CharField(max_length=300)),
                ('segmentos', models.CharField(max_length=300)),
                ('skill', models.CharField(max_length=300)),
                ('idusuario_servicio', models.IntegerField()),
                ('kalive01', models.IntegerField()),
                ('kalive02', models.IntegerField()),
                ('en_pausa', models.TimeField()),
                ('en_llamada', models.TimeField()),
                ('libre', models.TimeField()),
                ('acw', models.TimeField()),
                ('en_pausa_cnt', models.IntegerField()),
                ('en_llamada_cnt', models.IntegerField()),
                ('libre_cnt', models.IntegerField()),
                ('acw_cnt', models.IntegerField()),
                ('tipo_disc', models.CharField(max_length=10)),
                ('cose_tipo', models.IntegerField()),
                ('cose_id', models.IntegerField()),
                ('cose_valor', models.CharField(max_length=80)),
                ('mod1', models.IntegerField()),
                ('mod2', models.IntegerField()),
                ('mod3', models.IntegerField()),
                ('mod4', models.IntegerField()),
                ('mod5', models.IntegerField()),
                ('mod6', models.IntegerField()),
                ('lis_camp', models.CharField(max_length=300)),
                ('lis_rep', models.CharField(max_length=200)),
                ('mod7', models.IntegerField()),
                ('mod8', models.IntegerField()),
                ('mod9', models.IntegerField()),
                ('mod10', models.IntegerField()),
                ('mod11', models.IntegerField()),
                ('mod12', models.IntegerField()),
                ('usuario_password', models.CharField(max_length=10)),
                ('filtro_campag', models.IntegerField()),
                ('id_chat', models.IntegerField()),
                ('mod13', models.IntegerField()),
                ('mod14', models.IntegerField()),
                ('fecha_ingreso', models.DateTimeField()),
                ('dni', models.CharField(max_length=8)),
                ('supervisor', models.IntegerField()),
                ('lis_super', models.CharField(max_length=2000)),
                ('numero_llamado', models.BigIntegerField(db_column='Numero_Llamado')),
                ('categoria', models.CharField(max_length=7)),
                ('age_intera', models.IntegerField()),
                ('tie_intera', models.DateTimeField()),
                ('tie_gestion', models.DateTimeField()),
                ('tie_estado', models.DateTimeField()),
                ('user', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'ori_usuario',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Tipificacion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contacto', models.IntegerField(blank=True, null=True)),
                ('accion', models.IntegerField(blank=True, null=True)),
                ('estado', models.IntegerField(blank=True, null=True)),
                ('tipo', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'tipificacion',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='OrigBaseC01',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_recepcion_bbdd', models.CharField(blank=True, db_column='FECHA_RECEPCION_BBDD', max_length=100, null=True)),
                ('call', models.CharField(blank=True, db_column='CALL', max_length=100, null=True)),
                ('fecha', models.CharField(blank=True, db_column='FECHA', max_length=100, null=True)),
                ('nombre', models.CharField(blank=True, db_column='NOMBRE', max_length=100, null=True)),
                ('apellido', models.CharField(blank=True, db_column='APELLIDO', max_length=100, null=True)),
                ('dni', models.CharField(blank=True, db_column='DNI', max_length=100, null=True)),
                ('plan_cobertura', models.CharField(blank=True, db_column='PLAN_COBERTURA', max_length=100, null=True)),
                ('direccion', models.CharField(blank=True, db_column='DIRECCION', max_length=100, null=True)),
                ('distrito', models.CharField(blank=True, db_column='DISTRITO', max_length=100, null=True)),
                ('provincia', models.CharField(blank=True, db_column='PROVINCIA', max_length=100, null=True)),
                ('departamento', models.CharField(blank=True, db_column='DEPARTAMENTO', max_length=100, null=True)),
                ('estado', models.CharField(blank=True, db_column='ESTADO', max_length=100, null=True)),
                ('zona', models.CharField(blank=True, db_column='ZONA', max_length=100, null=True)),
                ('telefono1', models.CharField(blank=True, db_column='TELEFONO1', max_length=100, null=True)),
                ('telefono2', models.CharField(blank=True, db_column='TELEFONO2', max_length=100, null=True)),
                ('mail', models.CharField(blank=True, db_column='MAIL', max_length=100, null=True)),
                ('tipo_envio', models.CharField(blank=True, db_column='TIPO_ENVIO', max_length=100, null=True)),
                ('campana', models.CharField(blank=True, db_column='CAMPANA', max_length=100, null=True)),
                ('comercial', models.CharField(blank=True, db_column='COMERCIAL', max_length=100, null=True)),
                ('cobertura', models.CharField(blank=True, db_column='COBERTURA', max_length=100, null=True)),
                ('cant_afiliados', models.CharField(blank=True, db_column='CANT_AFILIADOS', max_length=100, null=True)),
                ('fecha_nacimiento', models.CharField(blank=True, db_column='FECHA_NACIMIENTO', max_length=100, null=True)),
                ('pap', models.CharField(blank=True, db_column='PAP', max_length=100, null=True)),
                ('tipo_tarjeta', models.CharField(blank=True, db_column='TIPO_TARJETA', max_length=100, null=True)),
                ('telefono3', models.CharField(blank=True, db_column='TELEFONO3', max_length=100, null=True)),
                ('telefono4', models.CharField(blank=True, db_column='TELEFONO4', max_length=100, null=True)),
                ('telefono5', models.CharField(blank=True, db_column='TELEFONO5', max_length=100, null=True)),
                ('telefono6', models.CharField(blank=True, db_column='TELEFONO6', max_length=100, null=True)),
                ('telefono7', models.CharField(blank=True, db_column='TELEFONO7', max_length=100, null=True)),
                ('telefonofijo', models.IntegerField(blank=True, db_column='TELEFONOFIJO', null=True)),
                ('observaciones', models.CharField(blank=True, db_column='OBSERVACIONES', max_length=100, null=True)),
                ('usuario', models.CharField(blank=True, db_column='USUARIO', max_length=100, null=True)),
                ('prima_mensual', models.CharField(blank=True, db_column='PRIMA_MENSUAL', max_length=100, null=True)),
                ('todo_prima', models.CharField(blank=True, db_column='TODO_PRIMA', max_length=100, null=True)),
                ('cod_cam', models.IntegerField()),
                ('lote', models.IntegerField()),
                ('t_ins', models.DateTimeField(db_column='T_INS')),
                ('flagdesplegar', models.IntegerField(db_column='flagDesplegar')),
                ('flag', models.IntegerField()),
                ('cantidad', models.IntegerField(blank=True, db_column='CANTIDAD', null=True)),
                ('nombredelproducto', models.CharField(blank=True, db_column='NOMBREDELPRODUCTO', max_length=1000, null=True)),
                ('tipodecobertura', models.CharField(blank=True, db_column='TIPODECOBERTURA', max_length=1000, null=True)),
                ('tipodedocumento', models.CharField(blank=True, db_column='TIPODEDOCUMENTO', max_length=100, null=True)),
                ('nrotarjetaencriptada', models.CharField(blank=True, db_column='NROTARJETAENCRIPTADA', max_length=1000, null=True)),
                ('tienetarjetadecredito', models.CharField(blank=True, db_column='TIENETARJETADECREDITO', max_length=100, null=True)),
                ('tarjetasadicionales', models.CharField(blank=True, db_column='TARJETASADICIONALES', max_length=1000, null=True)),
                ('recibects', models.CharField(blank=True, db_column='RECIBECTS', max_length=100, null=True)),
                ('tienelpdp', models.CharField(blank=True, db_column='TIENELPDP', max_length=100, null=True)),
            ],
            options={
                'db_table': 'orig_base_C01',
                'managed': True,
            },
        ),
    ]
