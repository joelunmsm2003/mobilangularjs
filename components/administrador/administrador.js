angular
  .module('app')
  .component('administradorcomponent', {
    templateUrl: 'gestion/build/html/administrador/administrador.html',
    controller: AdministradorController,
    bindings: {
        onDelete: '&'
    }
  });



function AdministradorController($scope,$location,$http,LlamadaService){
	 }