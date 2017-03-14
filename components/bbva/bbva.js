angular
  .module('app')
  .component('bbvacomponent', {
    templateUrl: 'html/bbva/bbva.html',
    controller: BbvaController,
    bindings: {
        onDelete: '&'

    }
  });




function BbvaController($state,$stateParams,$scope,$location,$http,LlamadaService,BbvaService){



        dni = $stateParams.dni

        $scope.base = $stateParams.base

        $scope.idagente = $stateParams.idagente

        $scope.nomagente = $stateParams.nomagente




              LlamadaService.cliente(dni).then(function(data) {

                console.log('Ventachub...',data)

                $scope.cliente = data[0]

                })



	  $scope.buscardni =function(dni){


                LlamadaService.cliente(dni).then(function(data) {

                $scope.registros = data

                console.log('data',data[0])

                })

        }


          $scope.go=function(dni){


               $scope.exito = false



                LlamadaService.cliente(dni).then(function(data) {

		            console.log('Datos del dni',data[0])

		            $scope.cliente = data[0]

                if(data[0]){


                   $scope.exito = true


                  $location.path('/bbvacampana/'+dni+'/'+data.id_orig_base+'/'+$scope.idagente+'/'+$scope.nomagente)
                }

		        })

           
        }


         $scope.actualizabbva =function(cliente){


              $('#actualiza').modal('hide');




              BbvaService.actualizar(cliente).then(function(data) {


                      swal({
              title: "Actualizacion BBVA",
              text: "La actualizacion se hizo con exito",
              type: "success",
              showCancelButton: false,
              confirmButtonColor: "#28CC9E",
              confirmButtonText: "Realizar Venta CHUBB",
              closeOnConfirm: true
            },
            function(){


              $state.reload()
              
            });




            })



        }

        var x=0;




        $scope.preguntar =function(preguntas){

            $scope.btnact = false

            if(preguntas==true){

              x=x+1
            }
            else{

              x=x-1
            }

            if(x>=2){

              $scope.btnact = true
            }


            console.log('cliente...',x)





        }





	 }