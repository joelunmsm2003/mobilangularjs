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

            $scope.base=data[0]

        })



	 }



  $scope.actualizatrama=function(data){



     BbvaService.actualizatrama(data).then(function(data) {

      console.log(data)

                       swal({
              title: "Trama Actualizada",
              text: "La actualizacion se hizo con exito",
              type: "success",
              showCancelButton: false,
              confirmButtonColor: "#28CC9E",
              confirmButtonText: "Cerrar",
              closeOnConfirm: true
            },
            function(){


       
              
            });




        })



   }



	}

