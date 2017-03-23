angular
  .module('app')
  .component('generatramacomponent', {
    templateUrl: 'html/generatrama/generatrama.html',
    controller: GeneratramaController,
    bindings: {
        onDelete: '&'
    }
  });



function GeneratramaController($scope,$location,$http,LlamadaService){
	 }