angular
  .module('app')
  .component('campanacomponent', {
    templateUrl: 'html/campana/campana.html',
    controller: CampanaController,
    bindings: {
        onDelete: '&'
    }
  });



function CampanaController($scope,$location,$http,LlamadaService){
	 }