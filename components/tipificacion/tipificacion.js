angular
  .module('app')
  .component('tipificacioncomponent', {
    templateUrl: 'html/tipificacion/tipificacion.html',
    controller: TipificacionController,
    bindings: {
        pasabase: '=',
        recupero:'@'
    }
  

  });





function TipificacionController($state,$stateParams,$filter,$scope,$location,$http,$log,TipificaService,LlamadaService){


      ctrl = this


      $scope.recupero =this.recupero

      url = $location.url()

      dni = $stateParams.dni


      $('.bbva').show()



        $scope.base = $stateParams.base

        $scope.idagente = $stateParams.idagente

        $scope.nomagente = $stateParams.nomagente




              LlamadaService.cliente(dni).then(function(data) {

                console.log('Tipifica...',data)

                $scope.cliente = data[0]

                })



      console.log('uauau',$location.url().split('/')[1])

      if($location.url().split('/')[1]=='bbvacampana'){

              $scope.bbvamuestra = false

      }



      dni = $stateParams.dni

      $scope.base = $stateParams.base

      $scope.idagente = $stateParams.idagente


      console.log('agente.....',$scope.idagente)

      $scope.nomagente = $stateParams.nomagente


      $scope.resultado={}

      TipificaService.contacto().then(function(data) { $scope.contacto = data })

      TipificaService.todosestados().then(function(data) { $scope.estados = data  })

      LlamadaService.base($scope.base).then(function(data) {

        console.log('base...',data)

        $scope.resultado = data[0]

        $scope.resultado.contacto = $filter('filter')($scope.contacto,{'id' : $scope.resultado.contacto})[0]     

        //console.log('dhhd',$scope.todosestados)

        //$scope.resultado.estado = $filter('filter')($scope.todosestados,{'id' : $scope.resultado.estado})[0]     

      
      })

      TipificaService.acciones().then(function(data) {

      console.log('acciones',data)

      $scope.listaaciones = data

      console.log('acciones',$scope.resultado.accion)

      })

      $scope.muestraagendar= false

      $scope.tipifica =function(data){


            if(data.contacto==6 && !data.accion){

                swal({
                  title: "Tipificacion Error",
                  text: "Seleccionar una accion para que puedas tipificar",
                  type: "error",
                  showCancelButton: false,
                  confirmButtonColor: "#5bc0de",
                  confirmButtonText: "Cerrar",
                  closeOnConfirm: true
                },
                function(){
                  
                });

                
            }
            else{

                data.dni = dni

                data.base = $scope.base

                data.idagente = $scope.idagente 

                data.nomagente = $scope.nomagente

                TipificaService.tipifica(data).then(function(data) {

                console.log('dhhd')

                swal({
                  title: "Tipificacion",
                  text: "Tus cambios se guardaron con exito",
                  type: "success",
                  showCancelButton: false,
                  confirmButtonColor: "#5bc0de",
                  confirmButtonText: "Cerrar",
                  closeOnConfirm: true
                },
                function(){

                  $scope.cliente=''
                  $state.reload()

                  
                });

                })


               // $('.bbva').hide()



             
                


            }

           



      }




      $scope.getestados =function(data){

            TipificaService.estado(data).then(function(data) {

            $scope.estados = data

            })
      }

      $scope.tipificashow = true


      $scope.tipificamal = function(){


          swal({
              title: "Tipificacion no permitida",
              text: "Realizar venta primero",
              type: "error",
              showCancelButton: false,
              confirmButtonColor: "#5bc0de",
              confirmButtonText: "Cerrar",
              closeOnConfirm: true
            },
            function(){
              
            });



      }


      $scope.traeacciones =function(data){

        $scope.tipificashow = true


        console.log('tarslsls',data)

        if(data== 7){


          if ($scope.cliente.fecha_venta_bbva){

            console.log('144444444443')

            $scope.tipificashow = true
          }
          else{

            $scope.tipificashow = false


            console.log('200000')

          }


        }




        TipificaService.accion(data).then(function(data) {

        $scope.listaaciones = data

        console.log('Acciones..',data)

        })

      } 

          





      

    
   







}
