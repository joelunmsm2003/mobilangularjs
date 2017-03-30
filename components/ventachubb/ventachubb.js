angular
  .module('app')
  .component('ventachubbcomponent', {
    templateUrl: 'html/ventachubb/ventachubb.html',
    controller: VentachubbController,
    bindings: {
        onDelete: '&',
        recupero: '@'
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

              if(cliente.cantidad==0){

                cliente.todo_prima = 25
              }
              else{

                cliente.todo_prima = cliente.cantidad*25

              }

              


            }


         $scope.ventabbva =function(cliente){


              cliente.nomagente = $scope.nomagente

              BbvaService.venta(cliente).then(function(data) {


                      swal({
              title: "Venta CHUBB",
              text: "La venta se hizo con exito",
              type: "success",
              showCancelButton: false,
              confirmButtonColor: "#28CC9E",
              confirmButtonText: "Cerrar",
              closeOnConfirm: true
            },
            function(){


              $state.reload()
              
            });




            })



        }


	 }