import MySQLdb
import requests
import datetime
import json
import time
import sys

name = sys.argv[1]

dni = sys.argv[2]

db = MySQLdb.connect(host="192.168.40.4",user="root",passwd="1q2w3e4r5t",db="orionc7") 

cur = db.cursor()

cur.execute("SELECT audio FROM ori_usuario where usuario_nombre = %s ", (name))



y = cur.fetchall()

audio = [item for item in y]

print 'audioooooo',audio

audio = audio[0][0]

print 'Audio..............',audio

db1 = MySQLdb.connect(host="192.168.40.4",user="root",passwd="1q2w3e4r5t",db="OrionC7_ges") 

cur = db1.cursor()

cur.execute("UPDATE ventarecupero set audio=%s where nombre_agente = %s and dni = %s",(audio,name,dni))

db1.commit()



