angular
  .module('app')
  .component('ingresarcomponent', {
    templateUrl: 'activak/build/html/html/ingresar/ingresar.html',
    controller: IngresarController
  });


function IngresarController($scope,UserService){



	$scope.ingresar = function(data){

	console.log('Ijjjsjs',UserService.ingresar(data))

	$("#myModal").modal('hide');

	
	swal.close()


	}


}
