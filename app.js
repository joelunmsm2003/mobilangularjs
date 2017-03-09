var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    
    $urlRouterProvider.otherwise('/home');

    host='http://localhost:8000'
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'prueba/partial-home.html',
              controller: function($scope,$http) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];

                
                    $http.get(host+'/contactos/').then(function(data) {

                    console.log(data.data)

                    $scope.collection = data.data
                    })
   
            }
        })
                // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: 'prueba/partial-home-list.html',
            controller: function($scope,$http) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];


                    $http.get(host+'/contactos/').then(function(data) {

                    console.log(data.data)

                    $scope.collection = data.data
                    })
   
            }
        })
        
        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                '': { templateUrl: 'prueba/partial-about.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                'columnTwo@about': { 
                    templateUrl: 'prueba/table-data.html',
                    controller: 'scotchController'
                }
            }
            
        });

        $urlRouterProvider.otherwise('/error');

        $locationProvider.html5Mode(true);
        
});

routerApp.controller('scotchController', function($scope,$http) {
    
    $scope.message = 'test';

    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];
    
});