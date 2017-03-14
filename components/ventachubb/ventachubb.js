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


            $scope.calcprimatotal=function(cliente){


              console.log('dattatata',cliente)

              cliente.todo_prima = cliente.cantidad*25



            }


         $scope.actualizabbva =function(cliente){



              BbvaService.actualizar(cliente).then(function(data) {


                      swal({
              title: "Venta CHUBB",
              text: "La venta se hizo con exito",
              type: "success",
              showCancelButton: false,
              confirmButtonColor: "#5bc0de",
              confirmButtonText: "Cerrar",
              closeOnConfirm: true
            },
            function(){


              $state.reload()
              
            });




            })



        }


	 }