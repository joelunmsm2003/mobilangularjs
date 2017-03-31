function BbvaService ($http,$q,$log,$localStorage) {  


    return {
        buscardni:buscardni,
        actualizar:actualizar,
        venta:venta,
        actualizarchubb:actualizarchubb,
        trama:trama,
        generatrama:generatrama,
        actualizatrama:actualizatrama,
        preguntas:preguntas,
        ticket:ticket,
        noactualiza:noactualiza


    }

        function buscardni(dni){


        var defered = $q.defer();
        var promise = defered.promise;

        $http({

        url: host+"buscardni",
        data: data,
        method: 'POST'
        }).
        success(function(data) {


        return promise;

        })

    }


        function preguntas(data){


        var def = $q.defer();

        $http({

        url: host+"preguntas",
        data: data,
        method: 'POST'
        }).
        success(function(data) {

        def.resolve(data);

        })

        return def.promise;

    }



        function generatrama(data){


        var def = $q.defer();

        $http({

        url: host+"generatrama",
        data: data,
        method: 'POST'
        }).
        success(function(data) {

        def.resolve(data);

        })

        return def.promise;

    }



        function actualizatrama(data){


        var def = $q.defer();

        $http({

        url: host+"actualizatrama",
        data: data,
        method: 'POST'
        }).
        success(function(data) {

        def.resolve(data);

        })

        return def.promise;

    }






    function actualizar(data){


        var def = $q.defer();

        $http({

        url: host+"actualizabbva",
        data: data,
        method: 'POST'
        }).
        success(function(data) {

        def.resolve(data);

        })

        return def.promise;

    }



    function trama(data){


        $http({

        url: host+"trama",
        data: data,
        method: 'POST'
        }).
        success(function(data) {

        def.resolve(data);

        })

        return def.promise;

    }








        function venta(data){


        var def = $q.defer();

        $http({

        url: host+"ventas",
        data: data,
        method: 'POST'
        }).
        success(function(data) {

        def.resolve(data);

        })

        return def.promise;



    }







        function actualizarchubb(dni){





        var defered = $q.defer();
        var promise = defered.promise;

        $http({

        url: host+"actualizarchubb",
        data: data,
        method: 'POST'
        }).
        success(function(data) {


        return promise;

        })

    }

    function ticket(dni) {


            var def = $q.defer();

            $http.get(host+'ticket/'+dni).success(function(data) {

                    def.resolve(data);
                })
               
            return def.promise;
        }


    function noactualiza(dni) {


            var def = $q.defer();

            $http.get(host+'noactualiza/'+dni).success(function(data) {

                    def.resolve(data);
                })
               
            return def.promise;
        }




}
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




function TipificaService ($http,$q,$log,$localStorage) {  


    return {
        contacto: contacto,
        accion:accion,
        estado:estado,
        tipifica:tipifica,
        acciones:acciones,
        todosestados:todosestados

    }

    function todosestados(){

        var def = $q.defer();

        $http.get(host+'todosestados').success(function(data) {

        def.resolve(data);
        
        })

        return def.promise;
    }


    function tipifica(data){


        var def = $q.defer();

        $http({

        url: host+"tipifica",
        data: data,
        method: 'POST'
        }).
        success(function(data) {

        def.resolve(data);

        })

        return def.promise;

    }


    function contacto() {

            var def = $q.defer();

            $http.get(host+'contactos').success(function(data) {

                    def.resolve(data);

                })
               
            return def.promise;
        }

    function accion(contacto) {


            var def = $q.defer();

            $http.get(host+'acciones/'+contacto).success(function(data) {

                    def.resolve(data);
                })
               
            return def.promise;
        }


     function acciones() {


            var def = $q.defer();

            $http.get(host+'listaacciones').success(function(data) {

                    def.resolve(data);
                })
               
            return def.promise;
        }


    function estado(accion) {


            var def = $q.defer();

            $http.get(host+'estados/'+accion).success(function(data) {

                    def.resolve(data);
                })
               
            return def.promise;


        }
      


}



function UserService ($http,$q,$log,$localStorage,$location,$localStorage) {  
    return {
        ingresar: ingresar,
        crear:crear,
        perfil:perfil,
        salir:salir,
        agentes:agentes
    }


    function ingresar (data){

        console.log('ingresar...',data)

        var defered = $q.defer();
        var promise = defered.promise;

        $http({

        url: host+"api-token-auth/",
        data: data,
        method: 'POST'
        }).
        success(function(data) {


        console.log(data)

        $localStorage.token = data.token;

        $location.path('/perfil')


        return promise;

        })


    }

    function salir (){

        delete $localStorage.token;

        $location.path('/')

    }

        function agentes() {


            var def = $q.defer();

            $http.get(host+'agentes').success(function(data) {

                    def.resolve(data);
                })
               
            return def.promise;
        }





    function crear (data){

        console.log('ingresar...',data)

        var defered = $q.defer();

        var promise = defered.promise;

        $http({

        url: host+"registra/",
        data: data,
        method: 'POST'
        }).
        success(function(data) {

                $http({

                url: host+"api-token-auth/",
                data: data,
                method: 'POST'
                }).
                success(function(data) {


                console.log(data)

                $localStorage.token = data.token;

                 $location.path('/anuncio')

                })

        return promise;

        })

    }

    function perfil (){

        var defered = $q.defer();

        var promise = defered.promise;

        $http.get(host+'perfil/')

        .success(function(data) {

        console.log('perfil',data)

        defered.resolve(data);

        })

        return promise

    }


}



