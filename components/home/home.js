
function HomeController($stateParams,$scope,$location,$http,LlamadaService){


        console.log($stateParams)
        
        var ctrl = this;

        url = $location.url()

        // dni = url.split('&')[0].split('=')[1]

        dni = 9118234

        $scope.base = 78

        // $scope.base = url.split('&')[1].split('=')[1]

        $scope.id_agente = 122

        //$scope.id_agente = url.split('&')[2].split('=')[1]

        $scope.nomagente = 'Carla'

        //$scope.nomagente = url.split('&nomagente=')[(url.split('&nomagente=')).length-1]

        // $http.get(host+'saveagente/'+$scope.nomagente+'/'+$scope.base).success(function(data) {
           
        // })


        LlamadaService.cliente(dni).then(function(data) {

            console.log('Datos del dni',data)

            $scope.cliente = data[0]

        })









        $scope.buscardni =function(dni){


            console.log('buscando dni...')



                LlamadaService.listar(dni).then(function(data) {

                $scope.registros = data

                })

        }

        

        $scope.go=function(data){

            console.log('ererer...',data)

               $('#myModal').modal('hide');

               //$location.path('/home/'+'?dni='+data.cliente+'&'+'base='+data.id_orig_base+'&agente='+$scope.id_agente+'&nomagente='+$scope.nomagente)

            window.location.href=host_primary+'gestion/build/#/home?dni='+data.cliente+'&'+'base='+data.id_orig_base+'&agente='+$scope.id_agente+'&nomagente='+$scope.nomagente

            location.reload()
           
        }


          ctrl.deleteHero = function(fono) {

      


            LlamadaService.traebase(fono).then(function(res) {

                console.log('trae..base...',res)

                $scope.pasabase = res[0]

                url = host_primary+'/home?dni='+res[0].cliente+'&'+'base='+res[0].id_orig_base+'&agente='+$scope.id_agente+'&nomagente='+$scope.nomagente
 
                window.location.href= url
                
                })


         

            

            //window.location.href=hero

            //location.reload()

          };






}
