angular
  .module('app')
  .component('administradorcomponent', {
    templateUrl: 'html/administrador/administrador.html',
    controller: AdministradorController,
    bindings: {
        onDelete: '&'
    }
  });



function AdministradorController($scope,$location,$http,LlamadaService){
	 }