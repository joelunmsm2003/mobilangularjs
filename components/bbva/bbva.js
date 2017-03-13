angular
  .module('app')
  .component('bbvacomponent', {
    templateUrl: 'html/bbva/bbva.html',
    controller: BbvaController,
    bindings: {
        onDelete: '&'

    }
  });




function BbvaController($stateParams,$scope,$location,$http,LlamadaService){




        $scope.idagente = $stateParams.idagente

        $scope.nomagente = $stateParams.nomagente

	  $scope.buscardni =function(dni){


                LlamadaService.listar(dni).then(function(data) {

                $scope.registros = data

                })

        }


          $scope.go=function(data){

            console.log('ererer...',data)

               $('#dni').modal('hide');

             $location.path('/bbvacampana/'+data.cliente+'/'+data.id_orig_base+'/'+$scope.idagente+'/'+$scope.nomagente)


                LlamadaService.cliente(dni).then(function(data) {

		            console.log('Datos del dni',data)

		            $scope.cliente = data[0]

		        })

           
        }


          $scope.actualizar =function(cliente){


          	console.log('cliente...',cliente)



        }




	 }