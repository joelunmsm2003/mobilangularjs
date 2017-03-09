angular
  .module('app')
  .component('ventachubbcomponent', {
    templateUrl: 'gestion/build/html/ventachubb/ventachubb.html',
    controller: VentachubbController,
    bindings: {
        onDelete: '&'
    }
  });



function VentachubbController($scope,$location,$http,LlamadaService){
	 }