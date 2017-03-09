angular
  .module('app')
  .component('signupcomponent', {
    templateUrl: 'gestion/build/html/signup/signup.html',
    controller: SignupController
  });


function SignupController($scope,UserService){

	
	$scope.creauser = function(data){

	
		UserService.crear(data, function(response) {

		console.log('iiiii',response);


		})

		    
		//UserService.ingresar(data)
	}


}
