
function HomeController($stateParams,$scope,$location,$http,LlamadaService){


        console.log($stateParams.dni)
        
        var ctrl = this;

        url = $location.url()

        dni = $stateParams.dni

        $scope.base = $stateParams.base

        $scope.id_agente = $stateParams.idagente

        $scope.nomagente = $stateParams.nomagente

        LlamadaService.cliente(dni).then(function(data) {

            console.log('Datos del dni',data)

            $scope.cliente = data[0]

        })


        $scope.buscardni =function(dni){


                LlamadaService.listar(dni).then(function(data) {

                console.log(data)

                $scope.registros = data

                })

        }

        

        $scope.go=function(data){

            console.log('ererer...',data)

               $('#myModal').modal('hide');

               $location.path('/home/'+data.cliente+'/'+data.id_orig_base+'/'+$scope.idagente+'/'+$scope.nomagente)


               


           
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
