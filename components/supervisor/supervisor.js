angular
  .module('app')
  .component('supervisorcomponent', {
    templateUrl: 'gestion/build/html/supervisor/supervisor.html',
    controller: SupervisorController,
    bindings: {
        onDelete: '&'
    }
  });



function SupervisorController($scope,$location,$http,LlamadaService){
	 }