angular
  .module('app')
  .component('tipificacioncomponent', {
    templateUrl: 'html/tipificacion/tipificacion.html',
    controller: TipificacionController,
    bindings: {
        pasabase: '='
    }
  

  });





function TipificacionController($stateParams,$filter,$scope,$location,$http,$log,TipificaService,LlamadaService){


      ctrl = this

      url = $location.url()

      dni = $stateParams.dni

      $scope.base = $stateParams.base

      $scope.id_agente = $stateParams.idagente

      $scope.nomagente = $stateParams.nomagente


      $scope.resultado={}

      TipificaService.contacto().then(function(data) { $scope.contacto = data })

      TipificaService.todosestados().then(function(data) { $scope.estados = data  })

      LlamadaService.base($scope.base).then(function(data) {

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
              
            });

            })

      }




      $scope.getestados =function(data){

            TipificaService.estado(data).then(function(data) {

            $scope.estados = data

            })
      }


      $scope.traeacciones =function(data){

        TipificaService.accion(data).then(function(data) {

        $scope.listaaciones = data

        console.log('Acciones..',data)

        })

      } 

          





      

    
   







}
