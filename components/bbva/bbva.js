angular
  .module('app')
  .component('bbvacomponent', {
    templateUrl: 'html/bbva/bbva.html',
    controller: BbvaController,
    bindings: {
        onDelete: '&',
        recupero: '@'

    }
  });




function BbvaController($state,$stateParams,$scope,$location,$http,LlamadaService,BbvaService,UserService){


        $ctrl =this

        dni = $stateParams.dni

        $scope.recuperoventa = this.recupero


        UserService.agentes().then(function(data) {



        $scope.agentes = data


        })



        console.log('lolololololo',this.recupero)



        $scope.base = $stateParams.base

        $scope.idagente = $stateParams.idagente

        $scope.nomagente = $stateParams.nomagente




              LlamadaService.cliente(dni).then(function(data) {

                console.log('Ventachub...',data)

                $scope.cliente = data[0]

                })

    $scope.recuperoventafunction =function(data){

      console.log('SADASDSADASDSAD',data)

       // $location.path('/recupero/'+dni+'/'+cliente.id_orig_base+'/'+$scope.idagente+'/'+$scope.nomagente)



        }

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


            $('.bbva').show()

                  $('#campana').addClass('bounceInLeft');

                  $location.path('/recupero/'+dni+'/'+data.id_orig_base+'/'+$scope.idagente+'/'+$scope.nomagente)


                }

		        })

           
        }


         $scope.actualizabbva =function(cliente){



                    $('#actualiza').modal('hide')
                  $('.modal-backdrop').remove();


              cliente.nomagente = $scope.nomagente





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




        $scope.preguntar =function(res){

            res.dni = $stateParams.dni


            contadorpre = 0

            if (res.a ==true){

              contadorpre = contadorpre+1
            }


            if (res.b ==true){

              contadorpre = contadorpre+1
            }


            if (res.c ==true){

              contadorpre = contadorpre+1
            }


            if (res.d ==true){

              contadorpre = contadorpre+1
            }

            console.log('contador',contadorpre)

            $scope.btnact = false

 
            if(contadorpre>=2){

              $scope.btnact = true
            }


            console.log('cliente...',res)

            BbvaService.preguntas(res).then(function(data) {



            })





        }





	 }