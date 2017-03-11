angular
  .module('app')
  .component('llamadascomponent', {
    templateUrl: 'html/llamadas/llamadas.html',
    controller: LlamadasController

  });





function LlamadasController($stateParams,$scope,$location,$http,LlamadaService){


        url = $location.url()


        dni = $stateParams.dni

        $scope.base = $stateParams.base

        $scope.id_agente = $stateParams.idagente

        $scope.nomagente = $stateParams.nomagente

        LlamadaService.listar(dni).then(function(data) {

        $scope.llamadas = data

        })



}
