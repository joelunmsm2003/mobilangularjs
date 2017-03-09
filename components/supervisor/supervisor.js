angular
  .module('app')
  .component('supervisorcomponent', {
    templateUrl: 'gestion/build/html/supervisor/supervisor.html',
    controller: supervisorController,
    bindings: {
        onDelete: '&'
    }
  });



function SupervisorController($scope,$location,$http,LlamadaService){
	 }