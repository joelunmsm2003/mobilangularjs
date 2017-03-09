angular
  .module('app')
  .component('reportbbvachubbcomponent', {
    templateUrl: 'gestion/build/html/reportbbvachubb/reportbbvachubb.html',
    controller: ReportbbvachubbController,
    bindings: {
        onDelete: '&'
    }
  });



function ReportbbvachubbController($scope,$location,$http,LlamadaService){
	 }