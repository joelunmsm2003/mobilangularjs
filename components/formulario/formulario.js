angular
  .module('app')
  .component('formulariocomponent', {
    templateUrl: 'html/formulario/formulario.html',
    controller: FormularioController,
    bindings: {
        onDelete: '&'
    }
  });



function FormularioController($scope,$stateParams,$location,$http,LlamadaService){

        var ctrl = this;

		// Saca de la URL solo el DNI


		url = $location.url()


    dni = $stateParams.dni





        LlamadaService.cliente(dni).then(function(data) {

            console.log('Datos del dni',data)

            $scope.cliente = data[0]

        })

     
        $scope.llamar = function(data){

            ctrl.onDelete({hero: data});

        }






	

}
