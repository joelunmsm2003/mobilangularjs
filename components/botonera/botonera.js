angular
  .module('app')
  .component('botoneracomponent', {
    templateUrl: 'html/botonera/botonera.html',
    controller: BotoneraController,
    bindings: {
        onDelete: '&'
    }
  });



function BotoneraController($scope,$location,$http,LlamadaService){
	 }