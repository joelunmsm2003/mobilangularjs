function BbvaService ($http,$q,$log,$localStorage) {  


    return {
        buscardni:buscardni,
        actualizar:actualizar,
        venta:venta,
        actualizarchubb:actualizarchubb,
        trama:trama,
        generatrama:generatrama,
        actualizatrama:actualizatrama,
        preguntas:preguntas

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


}