angular
  .module('app')
  .component('llamadascomponent', {
    templateUrl: '../html/llamadas/llamadas.html',
    controller: LlamadasController

  });





function LlamadasController($scope,$location,$http,LlamadaService){


        // Saca de la URL solo el DNI

        console.log('hshshshsh')

        url = $location.url()

        console.log('url.....',url.split('&')[0].split('=')[1])

        dni = url.split('&')[0].split('=')[1]


        LlamadaService.listar(dni).then(function(data) {

        $scope.llamadas = data

        console.log('LlamadasController...',data)

        })






}
