var routerApp = angular.module('app', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    
    $urlRouterProvider.otherwise('/home');

    host='http://localhost:8000'
    
    $stateProvider
        
        .state('andy', {
            url: '/andy',
            templateUrl: 'prueba/build/html/andy/andy.html',
            controller: function($scope,$http) {

            }
        })
        


        $urlRouterProvider.otherwise('/error');

        //$locationProvider.html5Mode(true);
        
});

