angular
  .module('app')
  .component('bbvachubbcomponent', {
    templateUrl: 'html/bbvachubb/bbvachubb.html',
    controller: BbvachubbController,
    bindings: {
        onDelete: '&'
    }
  });



function BbvachubbController($scope,$location,$http,LlamadaService){
	 }