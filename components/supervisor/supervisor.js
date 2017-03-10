angular
  .module('app')
  .component('supervisorcomponent', {
    templateUrl: 'html/supervisor/supervisor.html',
    controller: SupervisorController,
    bindings: {
        onDelete: '&'
    }
  });



function SupervisorController($scope,$location,$http,LlamadaService){
	 }