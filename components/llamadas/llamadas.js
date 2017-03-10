angular
  .module('app')
  .component('llamadascomponent', {
    templateUrl: 'html/llamadas/llamadas.html',
    controller: LlamadasController

  });





function LlamadasController($scope,$location,$http,LlamadaService){


        // Saca de la URL solo el DNI


        url = $location.url()


        // dni = url.split('&')[0].split('=')[1]

        dni = 9118234

        $scope.base = 78

        $scope.id_agente = 122

        $scope.nomagente = 'Carla'


        LlamadaService.listar(dni).then(function(data) {

        $scope.llamadas = data

        })






}
