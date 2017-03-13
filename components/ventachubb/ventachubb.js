angular
  .module('app')
  .component('ventachubbcomponent', {
    templateUrl: 'html/ventachubb/ventachubb.html',
    controller: VentachubbController,
    bindings: {
        onDelete: '&'
    }
  });



function VentachubbController($stateParams,$scope,$location,$http,LlamadaService){



        dni = $stateParams.dni

        $scope.base = $stateParams.base

        $scope.idagente = $stateParams.idagente

        $scope.nomagente = $stateParams.nomagente


              LlamadaService.cliente(dni).then(function(data) {

                console.log('Ventachub...',data)

                $scope.cliente = data[0]

                })


	$scope.ventachubb=function(data){


		console.log(data)


	}


	 }