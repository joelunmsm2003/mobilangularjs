var routerApp = angular.module('app', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    


    host='http://localhost:8000'
    
    $stateProvider
        
        .state('system', {
            url: '/system',
            templateUrl: 'prueba/build/html/system/system.html',
            controller: function($scope,$http) {

            }
        })
        .state('agente', {
            url: '/agente',
            templateUrl: 'prueba/build/html/agente/agente.html',
            controller: function($scope,$http) {
                

            }
        })
        

    $urlRouterProvider.otherwise('/error');

    //$locationProvider.html5Mode(true);
        
});

