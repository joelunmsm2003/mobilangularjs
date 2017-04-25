function UbigeoService ($http,$q,$log,$localStorage) {  


    return {
        departamento:departamento,
        provincia:provincia,
        distrito:distrito


    }



    function departamento() {


            var def = $q.defer();

            $http.get(host+'departamentos/').success(function(data) {

                    def.resolve(data);
                })
               
            return def.promise;
        }


    function provincia(departamento) {


            var def = $q.defer();

            $http.get(host+'provincia/'+departamento).success(function(data) {

                    def.resolve(data);
                })
               
            return def.promise;
        }

    function distrito(provincia) {


            var def = $q.defer();

            $http.get(host+'distrito/'+provincia).success(function(data) {

                    def.resolve(data);
                })
               
            return def.promise;
        }

    }