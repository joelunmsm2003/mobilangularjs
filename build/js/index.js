angular

.module('app', ['ui.router','ngStorage'])
.service('LlamadaService', LlamadaService)
.service('TipificaService', TipificaService)
.service('UserService', UserService)

.config(function($stateProvider, $urlRouterProvider,$locationProvider,$httpProvider) {
    


    host='http://localhost:8000/'

    host_primary='http://localhost/'
    
    $stateProvider

        .state('home', {
            url: '/home/:dni/:base/:idadente/:nomagente',
            templateUrl: 'html/home/home.html',
            controller: HomeController
        })

        .state('reporte', {
            url: '/reporte',
            templateUrl: 'html/reporte/reporte.html',
            controller: ReporteController
        })





        
        $urlRouterProvider.otherwise('/reporte');

    //$locationProvider.html5Mode(true);

    $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript'; 
$httpProvider.defaults.headers.post['Content-Type'] = 'multipart/form-data; charset=utf-8';



    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
    return {
        'request': function (config) {
            config.headers = config.headers || {};
            if ($localStorage.token) {
                config.headers.Authorization = 'Bearer ' + $localStorage.token;
            }
            return config;
        },
        'responseError': function(response) {
            if(response.status === 401 || response.status === 403) {

                $location.path('/redirect');
            }
            return $q.reject(response);
        }
    };
    }]);

        
});

