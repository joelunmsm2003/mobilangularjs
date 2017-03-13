angular

.module('app', ['ui.router','ngStorage'])
.service('LlamadaService', LlamadaService)
.service('TipificaService', TipificaService)

.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    


    host='http://192.168.40.4:8000/'

    host_primary='http://192.168.40.4/'
    
    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'html/home/home.html',
            controller: HomeController
        })

        .state('reporte', {
            url: '/reporte',
            templateUrl: 'html/reporte/reporte.html',
            controller: function($scope,$http) {

            }
        })


        
        $urlRouterProvider.otherwise('/reporte');

    //$locationProvider.html5Mode(true);
        
});

