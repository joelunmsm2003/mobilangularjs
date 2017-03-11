angular
  .module('app')
  .component('ventachubbcomponent', {
    templateUrl: 'html/ventachubb/ventachubb.html',
    controller: VentachubbController,
    bindings: {
        onDelete: '&'
    }
  });



function VentachubbController($scope,$location,$http,LlamadaService){


	$scope.ventachubb=function(data){


		console.log(data)


	}


	 }