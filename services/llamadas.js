function LlamadaService ($http,$q,$log,$localStorage) {  
    return {
        listar: listar,
        base:base,
        cliente:cliente,
        traebase:traebase

    }



    function crear(data,photo){

        console.log('Creando...',data,photo)

        var file = photo;
        var defered = $q.defer();
        var promise = defered.promise;

        $http({

        url: host+"kine/",
        data: data,
        method: 'POST'
        }).
        success(function(data) {

        console.log('Kine.....',data)


            /// Agregando Foto para esta kine

            var fd = new FormData();

            fd.append('file', file);

            fd.append('id', data);

            $http.post(host+'uploadphoto/', fd, {
                
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined

            }

            })

            .success(function(data){

                console.log(data)

            })


        return promise;

        })

    }


    function listar(dni) {


            console.log('DNI...',dni,host)

            var def = $q.defer();

            $http.get(host+'llamadas/'+dni).success(function(data) {

                    def.resolve(data);
                })
               
            return def.promise;
        }


        function traebase(fono) {

            var def = $q.defer();

            $http.get(host+'traebase/'+fono).success(function(data) {

                    def.resolve(data);
                })
               
            return def.promise;
        }



    function base(id) {


            var def = $q.defer();

            $http.get(host+'base/'+id).success(function(data) {

                    def.resolve(data);
                })
               
            return def.promise;
        }

      function cliente(dni) {


        console.log('DNI...',dni)

        var def = $q.defer();

        $http.get(host+'cliente/'+dni).success(function(data) {

                def.resolve(data);
            })
           
        return def.promise;
    }



}



