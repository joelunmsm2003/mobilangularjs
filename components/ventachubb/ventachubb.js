angular
  .module('app')
  .component('ventachubbcomponent', {
    templateUrl: 'gestion/build/html/ventachubb/ventachubb.html',
    controller: ventachubbController,
    bindings: {
        onDelete: '&'
    }
  });



function VentachubbController($scope,$location,$http,LlamadaService){
	 }