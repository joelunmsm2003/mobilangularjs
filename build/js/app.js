function LlamadaService ($http,$q,$log,$localStorage) {  
    return {
        listar: listar,
        base:base,
        cliente:cliente,
        traebase:traebase

    }



    function crear(data,photo){

        console.log('Creando...',data,photo)

        var file = photo;
        var defered = $q.defer();
        var promise = defered.promise;

        $http({

        url: host+"kine/",
        data: data,
        method: 'POST'
        }).
        success(function(data) {

        console.log('Kine.....',data)


            /// Agregando Foto para esta kine

            var fd = new FormData();

            fd.append('file', file);

            fd.append('id', data);

            $http.post(host+'uploadphoto/', fd, {
                
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined

            }

            })

            .success(function(data){

                console.log(data)

            })


        return promise;

        })

    }


    function listar(dni) {


            console.log('DNI...',dni)

            var def = $q.defer();

            $http.get(host+'llamadas/'+dni).success(function(data) {

                    def.resolve(data);
                })
               
            return def.promise;
        }


        function traebase(fono) {

            var def = $q.defer();

            $http.get(host+'traebase/'+fono).success(function(data) {

                    def.resolve(data);
                })
               
            return def.promise;
        }



    function base(id) {


            var def = $q.defer();

            $http.get(host+'base/'+id).success(function(data) {

                    def.resolve(data);
                })
               
            return def.promise;
        }

      function cliente(dni) {


        console.log('DNI...',dni)

        var def = $q.defer();

        $http.get(host+'cliente/'+dni).success(function(data) {

                def.resolve(data);
            })
           
        return def.promise;
    }



}




function TipificaService ($http,$q,$log,$localStorage) {  


    return {
        contacto: contacto,
        accion:accion,
        estado:estado,
        tipifica:tipifica,
        acciones:acciones,
        todosestados:todosestados



    }

    function todosestados(){

        var def = $q.defer();

        $http.get(host+'todosestados').success(function(data) {

        def.resolve(data);
        
        })

        return def.promise;
    }


    function tipifica(data){


        var defered = $q.defer();
        var promise = defered.promise;

        $http({

        url: host+"tipifica",
        data: data,
        method: 'POST'
        }).
        success(function(data) {


        return promise;

        })

    }


    function contacto() {

            var def = $q.defer();

            console.log('jdjdjdjdj',host+'contactos')

            $http.get(host+'contactos').success(function(data) {

                    def.resolve(data);
                })
               
            return def.promise;
        }

    function accion(contacto) {


            var def = $q.defer();

            $http.get(host+'acciones/'+contacto).success(function(data) {

                    def.resolve(data);
                })
               
            return def.promise;
        }


     function acciones() {


            var def = $q.defer();

            $http.get(host+'listaacciones/').success(function(data) {

                    def.resolve(data);
                })
               
            return def.promise;
        }


    function estado(accion) {


            var def = $q.defer();

            $http.get(host+'estados/'+accion).success(function(data) {

                    def.resolve(data);
                })
               
            return def.promise;
        }




}




function UserService ($http,$q,$log,$localStorage,$location,$localStorage) {  
    return {
        ingresar: ingresar,
        crear:crear,
        perfil:perfil,
        salir:salir
    }


    function ingresar (data){


        console.log('ingresar...',data)

        var defered = $q.defer();
        var promise = defered.promise;

        $http({

        url: host+"api-token-auth/",
        data: data,
        method: 'POST'
        }).
        success(function(data) {


        console.log(data)

        $localStorage.token = data.token;

        $location.path('/perfil')


        return promise;

        })


    }

    function salir (){

        delete $localStorage.token;

        $location.path('/')

    }




    function crear (data){

        console.log('ingresar...',data)

        var defered = $q.defer();

        var promise = defered.promise;

        $http({

        url: host+"registra/",
        data: data,
        method: 'POST'
        }).
        success(function(data) {

                $http({

                url: host+"api-token-auth/",
                data: data,
                method: 'POST'
                }).
                success(function(data) {


                console.log(data)

                $localStorage.token = data.token;

                 $location.path('/anuncio')

                })

        return promise;

        })

    }

    function perfil (){

        var defered = $q.defer();

        var promise = defered.promise;

        $http.get(host+'perfil/')

        .success(function(data) {

        console.log('perfil',data)

        defered.resolve(data);

        })

        return promise

    }


}





angular

.module('app', ['ngSanitize','angular-input-stars','rzModule','ui.router','ngStorage','ui.bootstrap','ngAnimate','ngTouch','ngScrollTo','flow','xeditable','ngResource','gettext','ngMap','ngLocale','tmh.dynamicLocale','wyvernzora.un-svg'])
      
.config(routesConfig)
.service('LlamadaService', LlamadaService)
.service('TipificaService', TipificaService)

   .directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }])

function routesConfig($stateProvider, $urlRouterProvider, $locationProvider,$httpProvider) {

	$stateProvider

		.state('andy',{
			url : '/andy',
			template: "<andycomponent></andycomponent>",

		})

		.state('anuncio',{
			url : '/anuncio',
			template: "<anunciocomponent></anunciocomponent>",

		})

		.state('redirect',{
			url : '/redirect',
			template: "<redirectcomponent></redirectcomponent>",

		})

		.state('perfil',{
			url : '/perfil',
			template: "<perfilcomponent></perfilcomponent>",

		})

		.state('reporte',{
			url : '/reporte',
			template: "<reportecomponent></reportecomponent>",

		})

		.state('home',{
			url : '/home',
			template: "<homecomponent></homecomponent>",

		});


		$urlRouterProvider.otherwise('/error');


	host = 'http://localhost:8000/'

	host_primary = 'http://localhost:8080/'

	$locationProvider.html5Mode(true);

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


}
angular
  .module('app')
  .component('alumnoscomponent', {
    templateUrl: '../html/alumnos/alumnos.html',
    controller: AlumnosController,
    bindings: {
      alumnos: '='
    }
  });



function AlumnosController($scope){

	this.alumnos

	.then(function(data) {

            $scope.alumnos=data

            console.log('UA',data)
        
    })








}

angular
  .module('app')
  .component('andycomponent', {
    templateUrl: 'html/andy/andy.html',
    controller: AndyController
  });


function AndyController(){

}

angular
  .module('app')
  .component('colecomponent', {
    templateUrl: 'html/colegio/colegio.html',
    controller: ColeController
  });


function ColeController(ColegioServicio){


	console.log('cole..',ColegioServicio.alumnos())

}

angular
  .module('app')
  .component('formulariocomponent', {
    templateUrl: '../html/formulario/formulario.html',
    controller: FormularioController,
    bindings: {
        onDelete: '&'
    }
  });



function FormularioController($scope,$location,$http,LlamadaService){

        var ctrl = this;

		// Saca de la URL solo el DNI


		url = $location.url()

        console.log('url.....',url.split('&')[0].split('=')[1])

		dni = url.split('&')[0].split('=')[1]

        $scope.base = url.split('&')[1].split('=')[1]

        $scope.id_agente = url.split('&')[2].split('=')[1]

        $scope.nomagente = url.split('&')[3].split('=')[1]



        LlamadaService.cliente(dni).then(function(data) {

            console.log('Datos del dni',data)

            $scope.cliente = data[0]

        })

     
        $scope.llamar = function(data){

            ctrl.onDelete({hero: data});

        }






	

}

angular
  .module('app')
  .component('headercomponent', {
    templateUrl: '../html/header/header.html',
    controller: HeaderController,
     bindings: {
        onSidebar: '&'
    }
  });



function HeaderController($scope,$location,$localStorage,UserService){

    var ctrl = this;


    ctrl.sidebar = function() {

    
      ctrl.onSidebar();

      
    };

    $scope.search = function(){

      console.log('data')

    }

   $scope.salir = function () {

      UserService.salir()

    }


  if($localStorage.token){

    console.log('TOKEN',$localStorage.token)

    $scope.token = $localStorage.token



    UserService.perfil().then(function(data) {

           $scope.perfil = data[0]
        
    })





  }


}

angular
  .module('app')
  .component('historialcomponent', {
    templateUrl: '../html/historial/historial.html',
    controller: HistorialController

  });





function HistorialController($scope,$location,$http){



        // Gestion 


		url = $location.url()

		dni = url.split('=')[1]





}

angular
  .module('app')
  .component('homecomponent', {
    templateUrl: '../html/home/home.html',
    controller: HomeController

  });





function HomeController($scope,$location,$http,LlamadaService){

        console.log('URL...',$location.url())

        var ctrl = this;

        url = $location.url()

        console.log('url.....',url.split('&')[0].split('=')[1])

        console.log('urlaaa.',url.split('&nomagente=')[(url.split('&nomagente=')).length-1])

        dni = url.split('&')[0].split('=')[1]

        $scope.base = url.split('&')[1].split('=')[1]

        $scope.id_agente = url.split('&')[2].split('=')[1]

        $scope.nomagente = url.split('&nomagente=')[(url.split('&nomagente=')).length-1]

        $http.get(host+'saveagente/'+$scope.nomagente+'/'+$scope.base).success(function(data) {
           
        })


        LlamadaService.cliente(dni).then(function(data) {

            console.log('Datos del dni',data)

            $scope.cliente = data[0]

        })






        var formData = { base: $scope.base };

        var postData = 'myData='+JSON.stringify(formData);

        $http({

        method : 'POST',
        url : host+'/base.php',
        data: postData,
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}  

        }).success(function(res){

            $scope.agentereal = res[0]

            

        })

        // $scope.goperson =function(data){


        //     window.location.href='/calidad/#/home?dni='+data+'&'+'base=123'

        //     location.reload()

        // }


        $scope.searchdni =function(dni){



                LlamadaService.listar(dni).then(function(data) {

                $scope.registros = data

                })

        }

        

        $scope.go=function(data){

            console.log('ererer...',data)

               $('#myModal').modal('hide');

               //$location.path('/home/'+'?dni='+data.cliente+'&'+'base='+data.id_orig_base+'&agente='+$scope.id_agente+'&nomagente='+$scope.nomagente)

            window.location.href=host_primary+'/home?dni='+data.cliente+'&'+'base='+data.id_orig_base+'&agente='+$scope.id_agente+'&nomagente='+$scope.nomagente

            //location.reload()
           
        }


          ctrl.deleteHero = function(fono) {

      


            LlamadaService.traebase(fono).then(function(res) {

                console.log('trae..base...',res)

                $scope.pasabase = res[0]

                url = host_primary+'/home?dni='+res[0].cliente+'&'+'base='+res[0].id_orig_base+'&agente='+$scope.id_agente+'&nomagente='+$scope.nomagente
 
                window.location.href= url
                
                })


         

            

            //window.location.href=hero

            //location.reload()

          };






}

angular
  .module('app')
  .component('anunciocomponent', {
    templateUrl: '../html/anuncio/anuncio.html',
    controller: AnuncioController
  });



function AnuncioController($scope,UserService,$localStorage){


	console.log('$localStorage',$localStorage)


	

		console.log(UserService.perfil())
	





}

angular
  .module('app')
  .component('ingresarcomponent', {
    templateUrl: '../html/ingresar/ingresar.html',
    controller: IngresarController
  });


function IngresarController($scope,UserService){



	$scope.ingresar = function(data){

	console.log('Ijjjsjs',UserService.ingresar(data))

	$("#myModal").modal('hide');

	
	swal.close()


	}


}

angular
  .module('app')
  .component('llamadascomponent', {
    templateUrl: '../html/llamadas/llamadas.html',
    controller: LlamadasController

  });





function LlamadasController($scope,$location,$http,LlamadaService){


        // Saca de la URL solo el DNI

        console.log('hshshshsh')

        url = $location.url()

        console.log('url.....',url.split('&')[0].split('=')[1])

        dni = url.split('&')[0].split('=')[1]


        LlamadaService.listar(dni).then(function(data) {

        $scope.llamadas = data

        console.log('LlamadasController...',data)

        })






}

angular
  .module('app')
  .component('newusercomponent', {
    templateUrl: '../html/newuser/newuser.html',
    controller: NewuserController
  });



function NewuserController($location,$scope,KineService,UserService,$http){


	$scope.setFile = function(element) {

		    $scope.currentFile = element.files[0];

		    var reader = new FileReader();

		    reader.onload = function(event) {

		    $scope.upload =true

		    $scope.image_source = event.target.result

		    $scope.$apply()

		    console.log('hdhdhd',$scope.myFile)

    		}
    // when the file is read it triggers the onload event above.
    reader.readAsDataURL(element.files[0]);

    }

    $scope.uploadFile = function(data){

    	var file = $scope.myFile;

    	    var fd = new FormData();

    	    console.log(file)

       fd.append('file', file);
    
       $http.post(host+'uploadphoto/', fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
       })
    
       .success(function(data){



       })

            
	};



	$scope.user = {}

	UserService.perfil().then(function(data) {

           $scope.perfil = data[0]

           $scope.user.name = $scope.perfil.first_name

           $scope.user.phone = $scope.perfil.phone

          
        
    })

	

	$scope.newuser = function(data){

		console.log('gfgfgf',data)

	}

	

	$scope.createuser = function(data){

		console.log(data)

			

		KineService.crear(data,$scope.myFile)

		$location.path('/perfil')




			
	}



	KineService.distritos().then(function(data) {

           $scope.distritos = data
        
    })

    

}

angular
  .module('app')
  .component('perfilcomponent', {
    templateUrl: '../html/perfil/perfil.html',
    controller: PerfilController
  });



function PerfilController($state,$location,$localStorage,$scope,UserService,KineService,$filter){


	$scope.host = host


	


		UserService.perfil().then(function(response) {

		$scope.perfil = response[0]

		$scope.user_id = $scope.perfil['id']

		console.log('user...',$scope.user_id)

		
    })
	


	KineService.listar().then(function(data) {




$scope.kines = $filter('filter')(data,{ 'user_id' : $scope.user_id})



    })

    $scope.reload = function(){

    	$state.reload()
    }






}

angular
  .module('app')
  .component('redirectcomponent', {
    templateUrl: '../html/redirect/redirect.html',
    controller: RedirectController
  });



function RedirectController($scope,KineService){


	


}

angular
  .module('app')
  .component('reportecomponent', {
    templateUrl: '/activak/build/html/reporte/reporte.html',
    controller: ReporteController

  });



function ReporteController($scope,$location,$http){


	/// Contador de tipo de Contacto

	function gestiontotal(){

				
			    $http.get(host+"/gestionado").success(function(response) {

		     	console.log('Respuesta del BAckend...',response)

		     	for(i in response){

		     		console.log('dato...',response[i].contador)

		     		// if(response[i])

		     		if(response[i].contacto==1){

		     			$scope.totaltitular = response[i].contador

		     		}

		     		if(response[i].contacto==2){

		     			$scope.totaltercero = response[i].contador

		     		}

		     		if(response[i].contacto==3){

		     			$scope.totalnocontacto = response[i].contador

		     		}

		     		$scope.totalgestion  = parseInt($scope.totaltitular) + parseInt($scope.totaltercero) +parseInt($scope.totalnocontacto)
		     	}


		    });

	}

	function efectividadtotal(){

				
			    $http.get(host+"/efectividad.php").success(function(response) {

		     	console.log('Respuesta del Efectividad...',response)


		     	for(i in response){

		     		console.log('Efectividad...11',response[i])

		     	
		     		if(response[i].contacto==1 && response[i].accion==1){

		     		console.log('Efectividad...',response[i])

		     		}


				}

	


		    });

	}


	gestiontotal()

	efectividadtotal()



	//setInterval(function(){ gestiontotal() }, 1000);






}

angular
  .module('app')
  .component('signupcomponent', {
    templateUrl: '../html/signup/signup.html',
    controller: SignupController
  });


function SignupController($scope,UserService){

	
	$scope.creauser = function(data){

	
		UserService.crear(data, function(response) {

		console.log('iiiii',response);


		})

		    
		//UserService.ingresar(data)
	}


}

angular
  .module('app')
  .component('tipificacioncomponent', {
    templateUrl: '../html/tipificacion/tipificacion.html',
    controller: TipificacionController,
    bindings: {
        pasabase: '='
    }
  

  });





function TipificacionController($filter,$scope,$location,$http,$log,TipificaService,LlamadaService){


      ctrl = this

      url = $location.url()

      $scope.base = url.split('&')[1].split('=')[1]

      $scope.resultado={}

      TipificaService.contacto().then(function(data) { $scope.contacto = data })

      TipificaService.todosestados().then(function(data) { $scope.estados = data  })

      LlamadaService.base($scope.base).then(function(data) {

        $scope.resultado = data[0]

        $scope.resultado.contacto = $filter('filter')($scope.contacto,{'id' : $scope.resultado.contacto})[0]     

        //console.log('dhhd',$scope.todosestados)

        //$scope.resultado.estado = $filter('filter')($scope.todosestados,{'id' : $scope.resultado.estado})[0]     

      
      })

      TipificaService.acciones().then(function(data) {

      console.log('acciones',data)

      $scope.listaaciones = data

      console.log('acciones',$scope.resultado.accion)

      })

      $scope.muestraagendar= false

      $scope.tipifica =function(data){

            data.base = $scope.base

            TipificaService.tipifica(data, function(response) {


              swal({
              title: "Sweet!",
              text: "Here's a custom image.",
              imageUrl: "images/thumbs-up.jpg"
            });

            })

      }




      $scope.getestados =function(data){

            TipificaService.estado(data).then(function(data) {

            $scope.estados = data

            })
      }


      $scope.traeacciones =function(data){

        TipificaService.accion(data).then(function(data) {

        $scope.listaaciones = data

        console.log('Acciones..',data)

        })

      } 

            
// Datetime

  $scope.muestratime = false
  
  $scope.agendar = function(data) {
  
   
    $scope.changed()

    $scope.muestratime = true

  };

  $scope.today = function() {
    $scope.dt = null;
  };

  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.inlineOptions = {
     minDate: new Date(),
    showWeeks: false
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };



  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];


  // Time

  $scope.mytime = null;

  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    var d = new Date();
    d.setHours( 0 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.update()



  $scope.clear = function() {
    $scope.mytime = null;
  };


         $scope.searchdni =function(data){


                


                var formData = { dni: data };

                var postData = 'myData='+JSON.stringify(formData);


                $http({

                method : 'POST',
                url : host+'/llamadas.php',
                data: postData,
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}  

                }).success(function(res){

                    $scope.registros = res

                    console.log('dnis.....',$scope.registros)

                })


        }

      

    
   







}
