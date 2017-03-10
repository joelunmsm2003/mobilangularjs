angular
  .module('app')
  .component('detallesbotoneracomponent', {
    templateUrl: 'html/detallesbotonera/detallesbotonera.html',
    controller: DetallesbotoneraController,
    bindings: {
        onDelete: '&'
    }
  });




function DetallesbotoneraController($scope,$location,$http,LlamadaService){
	 }