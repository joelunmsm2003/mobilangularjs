killall -9 node
gulp watch&

# cd ../server
# npm start&

cd ./apis
python manage.py runserver 0.0.0.0:1000&
echo 3 > /proc/sys/vm/drop_caches
subl
