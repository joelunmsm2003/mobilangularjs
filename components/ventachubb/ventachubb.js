angular
  .module('app')
  .component('ventachubbcomponent', {
    templateUrl: 'html/ventachubb/ventachubb.html',
    controller: VentachubbController,
    bindings: {
        onDelete: '&'
    }
  });



function VentachubbController($state,$stateParams,$scope,$location,$http,LlamadaService,BbvaService){



        dni = $stateParams.dni

        $scope.base = $stateParams.base

        $scope.idagente = $stateParams.idagente

        $scope.nomagente = $stateParams.nomagente


              LlamadaService.cliente(dni).then(function(data) {

                console.log('Ventachub...',data)

                $scope.cliente = data[0]

                })




         $scope.actualizabbva =function(cliente){



              BbvaService.actualizar(cliente).then(function(data) {


                      swal({
              title: "Actualizacion BBVA",
              text: "La actualizacion se hizo con exito",
              type: "success",
              showCancelButton: false,
              confirmButtonColor: "#5bc0de",
              confirmButtonText: "Realizar Venta CHUBB",
              closeOnConfirm: true
            },
            function(){


              $state.reload()
              
            });




            })



        }


	 }