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


        var defered = $q.defer();
        var promise = defered.promise;

        $http({

        url: host+"tipifica",
        data: data,
        method: 'POST'
        }).
        success(function(data) {


        return promise;

        })

    }


    function contacto() {

            var def = $q.defer();

            console.log('jdjdjdjdj',host+'contactos')

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

            $http.get(host+'listaacciones/').success(function(data) {

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


