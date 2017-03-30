* Sistema Call Center Activak 

Sistema para la gestion 


** Para iniciar

/
run.sh

** Instalacion

** Archivos de configuracion

*** Frontend

index.js (Modificar los parametros)

    host='http://192.168.40.231:8000/'

    host_primary='http://192.168.40.231/'

*** Backend

/apis/apis
settings.py
DATABASES

** Run

./run.sh


** Instalacion

npm install

Backend

pip Django==1.9.7
pip django-cors-headers==2.0.2
pip django-jwt-auth==0.0.2
pip MySQL-python==1.2.3

