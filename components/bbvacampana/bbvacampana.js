function BbvacampanaController(LlamadaService,BbvaService,$stateParams,$scope,$location,$http,UserService){


        console.log($stateParams.dni)
        
        var ctrl = this;

        url = $location.url()

        dni = $stateParams.dni

        $scope.ndni = $stateParams.dni

        $scope.base = $stateParams.base

        $scope.id_agente = $stateParams.idagente

        $scope.nomagente = $stateParams.nomagente




        LlamadaService.cliente(dni).then(function(data) {

        console.log('Datos del dni',data[0])

        $scope.cliente = data[0]


        })


                  $scope.go=function(dni){

                  

               $scope.exito = false

                LlamadaService.cliente(dni).then(function(data) {

		            console.log('Datos del dni',data[0])

		            $scope.cliente = data[0]

                if(data[0]){


                  BbvaService.noactualiza(dni).then(function(data) {



                  })



                   $scope.exito = true

                  $('#campana').addClass('bounceInLeft');

                  $location.path('/bbvacampana/'+dni+'/'+data.id_orig_base+'/'+$scope.idagente+'/'+$scope.nomagente)


                }

		        })

           
        }







 }