angular
  .module('app')
  .component('bbvacomponent', {
    templateUrl: 'gestion/build/html/bbva/bbva.html',
    controller: bbvaController,
    bindings: {
        onDelete: '&'
    }
  });



function BbvaController($scope,$location,$http,LlamadaService){
	 }