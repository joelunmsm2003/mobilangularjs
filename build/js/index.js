var routerApp = angular.module('app', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    


    host='http://localhost:8000'
    
    $stateProvider
        
        .state('home', {
            url: '/home',
            templateUrl: 'prueba/build/html/home/home.html',
            controller: function($scope,$http) {

            }
        })

        

    $urlRouterProvider.otherwise('/error');

    //$locationProvider.html5Mode(true);
        
});

