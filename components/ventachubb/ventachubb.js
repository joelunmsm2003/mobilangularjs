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



function VentachubbController($state,$stateParams,$scope,$location,$http,LlamadaService,BbvaService,UbigeoService,$filter){


  
        dni = $stateParams.dni


         UbigeoService.departamento().then(function(data) {

            console.log('departamentos...',data)

            $scope.departamentos=data


            })


        $scope.recupero = this.recupero

        console.log('recuperoventa----',$scope.recupero)

        $scope.base = $stateParams.base

        $scope.idagente = $stateParams.idagente

        $scope.nomagente = $stateParams.nomagente



              LlamadaService.cliente(dni).then(function(data) {

                console.log('Ventachub...',data)

                $scope.cliente = data[0]



                console.log('departamento......',$scope.dept)
  

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



          $scope.buscaprovincia =function(departamento){


            console.log(departamento)


               UbigeoService.provincia(departamento).then(function(data) {

            console.log('provincia...',data)

            $scope.provincia=data


            })






          }

           $scope.buscadistrito =function(provincia){


            console.log(departamento)


               UbigeoService.distrito(provincia).then(function(data) {

            console.log('distrito...',data)

            $scope.distrito=data


            })






          }


         $scope.ventabbva =function(cliente){


            console.log('ubigeo...',$scope.dept,$scope.prov,$scope.dist)

              cliente.departamento = $scope.dept

              cliente.provincia = $scope.provincia

              cliente.distrito =$scope.dist


              cliente.recupero = $scope.recupero

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