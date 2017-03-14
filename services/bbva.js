function BbvaService ($http,$q,$log,$localStorage) {  


    return {
        buscardni:buscardni,
        actualizar:actualizar,
        ventas:ventas,
        actualizarchubb:actualizarchubb

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





        function ventas(dni){


        var defered = $q.defer();
        var promise = defered.promise;

        $http({

        url: host+"ventas",
        data: data,
        method: 'POST'
        }).
        success(function(data) {


        return promise;

        })

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