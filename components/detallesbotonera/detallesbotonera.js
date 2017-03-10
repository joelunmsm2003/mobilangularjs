angular
  .module('app')
  .component('detallesbotoneracomponent', {
    templateUrl: 'html/detallesbotonera/detallesbotonera.html',
    controller: detallesbotoneraController,
    bindings: {
        onDelete: '&'
    }
  });



function DetallesbotoneraController($scope,$location,$http,LlamadaService){
	 }