angular
  .module('app')
  .component('generatramacomponent', {
    templateUrl: 'html/generatrama/generatrama.html',
    controller: GeneratramaController,
    bindings: {
        onDelete: '&'
    }
  });

  


function GeneratramaController($scope,$location,$http,BbvaService){




	$scope.agregar=function(data){


		 BbvaService.generatrama(data).then(function(data) {

            console.log('Datos del trama',data)

            $scope.base=data

        })



	 }



  $scope.genera_trama=function(data){


     BbvaService.trama(data).then(function(data) {

      console.log(data)


        })



   }



	}

