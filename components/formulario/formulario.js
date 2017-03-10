angular
  .module('app')
  .component('formulariocomponent', {
    templateUrl: 'html/formulario/formulario.html',
    controller: FormularioController,
    bindings: {
        onDelete: '&'
    }
  });



function FormularioController($scope,$location,$http,LlamadaService){

        var ctrl = this;

		// Saca de la URL solo el DNI


		url = $location.url()



		// dni = url.split('&')[0].split('=')[1]

  //       $scope.base = url.split('&')[1].split('=')[1]

  //       $scope.id_agente = url.split('&')[2].split('=')[1]

  //       $scope.nomagente = url.split('&')[3].split('=')[1]


          dni = 9118234

        $scope.base = 78

        $scope.id_agente = 122

        $scope.nomagente = 'Carla'



        LlamadaService.cliente(dni).then(function(data) {

            console.log('Datos del dni',data)

            $scope.cliente = data[0]

        })

     
        $scope.llamar = function(data){

            ctrl.onDelete({hero: data});

        }






	

}
