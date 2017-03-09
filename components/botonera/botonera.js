angular
  .module('app')
  .component('botoneracomponent', {
    templateUrl: 'gestion/build/html/botonera/botonera.html',
    controller: botoneraController,
    bindings: {
        onDelete: '&'
    }
  });



function BotoneraController($scope,$location,$http,LlamadaService){
	 }