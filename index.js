angular

.module('app', ['ui.router','ngStorage'])
.service('LlamadaService', LlamadaService)
.service('TipificaService', TipificaService)

.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    


    host='http://localhost:8000/'
    
    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'gestion/build/html/home/home.html',
            controller: function($scope,$http) {

            }
        })

        .state('reporte', {
            url: '/reporte',
            templateUrl: 'gestion/build/html/reporte/reporte.html',
            controller: function($scope,$http) {

            }
        })

        

        $urlRouterProvider.otherwise('/error');

    //$locationProvider.html5Mode(true);
        
});

