angular
  .module('app')
  .component('bbvachubbcomponent', {
    templateUrl: 'gestion/build/html/bbvachubb/bbvachubb.html',
    controller: bbvachubbController,
    bindings: {
        onDelete: '&'
    }
  });



function BbvachubbController($scope,$location,$http,LlamadaService){
	 }