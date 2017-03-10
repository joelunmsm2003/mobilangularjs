angular
  .module('app')
  .component('tipificacioncomponent', {
    templateUrl: 'html/tipificacion/tipificacion.html',
    controller: TipificacionController,
    bindings: {
        pasabase: '='
    }
  

  });





function TipificacionController($filter,$scope,$location,$http,$log,TipificaService,LlamadaService){


      ctrl = this

      url = $location.url()

      // $scope.base = url.split('&')[1].split('=')[1]

      // $scope.idagente = url.split('&')[2].split('=')[1]

      // $scope.nomagente = url.split('&nomagente=')[(url.split('&nomagente=')).length-1]

        dni = 9118234

        $scope.base = 78

        $scope.id_agente = 122

        $scope.nomagente = 'Carla'


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
