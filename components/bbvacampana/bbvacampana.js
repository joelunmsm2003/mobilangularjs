function BbvacampanaController($stateParams,$scope,$location,$http){


        console.log($stateParams.dni)
        
        var ctrl = this;

        url = $location.url()

        dni = $stateParams.dni

        $scope.base = $stateParams.base

        $scope.id_agente = $stateParams.idagente

        $scope.nomagente = $stateParams.nomagente






 }