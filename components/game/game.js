angular
  .module('app')
  .component('gamecomponent', {
    templateUrl: 'html/game/game.html',
    controller: GameController,
    bindings: {
        onDelete: '&'
    }
  });



function GameController($scope,$location,$http,LlamadaService){
	 }