angular
  .module('app')
  .component('administradorcomponent', {
    templateUrl: 'html/administrador/administrador.html',
    controller: AdministradorController,
    bindings: {
        onDelete: '&'
    }
  });



function AdministradorController($scope,$location,$http,LlamadaService){
	 }
angular
  .module('app')
  .component('bbvacomponent', {
    templateUrl: 'html/bbva/bbva.html',
    controller: BbvaController,
    bindings: {
        onDelete: '&'

    }
  });




function BbvaController($scope,$location,$http,LlamadaService){

	 }
angular
  .module('app')
  .component('bbvachubbcomponent', {
    templateUrl: 'html/bbvachubb/bbvachubb.html',
    controller: BbvachubbController,
    bindings: {
        onDelete: '&'
    }
  });



function BbvachubbController($scope,$location,$http,LlamadaService){
	 }
angular
  .module('app')
  .component('botoneracomponent', {
    templateUrl: 'html/botonera/botonera.html',
    controller: BotoneraController,
    bindings: {
        onDelete: '&'
    }
  });



function BotoneraController($scope,$location,$http,LlamadaService){
	 }
angular
  .module('app')
  .component('detallesbotoneracomponent', {
    templateUrl: 'html/detallesbotonera/detallesbotonera.html',
    controller: DetallesbotoneraController,
    bindings: {
        onDelete: '&'
    }
  });




function DetallesbotoneraController($scope,$location,$http,LlamadaService){
	 }
angular
  .module('app')
  .component('formulariocomponent', {
    templateUrl: 'html/formulario/formulario.html',
    controller: FormularioController,
    bindings: {
        onDelete: '&'
    }
  });



function FormularioController($scope,$stateParams,$location,$http,LlamadaService){

        var ctrl = this;

		// Saca de la URL solo el DNI


		url = $location.url()


    dni = $stateParams.dni





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
  .component('gamecomponent', {
    templateUrl: 'html/game/game.html',
    controller: GameController,
    bindings: {
        onDelete: '&'
    }
  });



function GameController($scope,$location,$http,LlamadaService){
	 }
angular
  .module('app')
  .component('headercomponent', {
    templateUrl: 'html/header/header.html',
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
    templateUrl: 'html/historial/historial.html',
    controller: HistorialController

  });





function HistorialController($scope,$location,$http){



        // Gestion 


		url = $location.url()

		dni = url.split('=')[1]





}


function HomeController($stateParams,$scope,$location,$http,LlamadaService){


        console.log($stateParams.dni)
        
        var ctrl = this;

        url = $location.url()

        dni = $stateParams.dni

        $scope.base = $stateParams.base

        $scope.id_agente = $stateParams.idagente

        $scope.nomagente = $stateParams.nomagente

        LlamadaService.cliente(dni).then(function(data) {

            console.log('Datos del dni',data)

            $scope.cliente = data[0]

        })


        $scope.buscardni =function(dni){


                LlamadaService.listar(dni).then(function(data) {

                $scope.registros = data

                })

        }

        

        $scope.go=function(data){

            console.log('ererer...',data)

               $('#myModal').modal('hide');

               //$location.path('/home/'+'?dni='+data.cliente+'&'+'base='+data.id_orig_base+'&agente='+$scope.id_agente+'&nomagente='+$scope.nomagente)

            window.location.href=host_primary+'gestion/build/#/home?dni='+data.cliente+'&'+'base='+data.id_orig_base+'&agente='+$scope.id_agente+'&nomagente='+$scope.nomagente

            location.reload()
           
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
  .component('ingresarcomponent', {
    templateUrl: 'html/ingresar/ingresar.html',
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
    templateUrl: 'html/llamadas/llamadas.html',
    controller: LlamadasController

  });





function LlamadasController($scope,$location,$http,LlamadaService){


        url = $location.url()


        dni = $stateParams.dni

        $scope.base = $stateParams.base

        $scope.id_agente = $stateParams.idagente

        $scope.nomagente = $stateParams.nomagente

        LlamadaService.listar(dni).then(function(data) {

        $scope.llamadas = data

        })



}

angular
  .module('app')
  .component('newusercomponent', {
    templateUrl: 'html/newuser/newuser.html',
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
    templateUrl: 'html/perfil/perfil.html',
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
    templateUrl: 'html/redirect/redirect.html',
    controller: RedirectController
  });



function RedirectController($scope,KineService){


	


}

angular
  .module('app')
  .component('reportbbvachubbcomponent', {
    templateUrl: 'html/reportbbvachubb/reportbbvachubb.html',
    controller: ReportbbvachubbController,
    bindings: {
        onDelete: '&'
    }
  });



function ReportbbvachubbController($scope,$location,$http,LlamadaService){
	 }


function ReporteController($scope,$location,$http,TipificaService){



	  TipificaService.acciones().then(function(data) {

      console.log('acciones',data)

      $scope.listaaciones = data


      })


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
    templateUrl: 'html/signup/signup.html',
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
  .component('supervisorcomponent', {
    templateUrl: 'html/supervisor/supervisor.html',
    controller: SupervisorController,
    bindings: {
        onDelete: '&'
    }
  });



function SupervisorController($scope,$location,$http,LlamadaService){
	 }
angular
  .module('app')
  .component('homecomponent', {
    templateUrl: 'html/system/system.html',
    controller: SystemController

  });





function SystemController($scope,$location,$http,LlamadaService){

	

}
angular
  .module('app')
  .component('tipificacioncomponent', {
    templateUrl: 'html/tipificacion/tipificacion.html',
    controller: TipificacionController,
    bindings: {
        pasabase: '='
    }
  

  });





function TipificacionController($stateParams,$filter,$scope,$location,$http,$log,TipificaService,LlamadaService){


      ctrl = this

      url = $location.url()

      dni = $stateParams.dni

      $scope.base = $stateParams.base

      $scope.id_agente = $stateParams.idagente

      $scope.nomagente = $stateParams.nomagente


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

            data.idagente = $scope.idagente 

            data.nomagente = $scope.nomagente

            TipificaService.tipifica(data).then(function(data) {

            console.log('dhhd')

            swal({
              title: "Tipificacion",
              text: "Tus cambios se guardaron con exito",
              type: "success",
              showCancelButton: false,
              confirmButtonColor: "#5bc0de",
              confirmButtonText: "Cerrar",
              closeOnConfirm: true
            },
            function(){
              
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

          





      

    
   







}

angular
  .module('app')
  .component('ventachubbcomponent', {
    templateUrl: 'html/ventachubb/ventachubb.html',
    controller: VentachubbController,
    bindings: {
        onDelete: '&'
    }
  });



function VentachubbController($scope,$location,$http,LlamadaService){


	$scope.venta=function(data){


		console.log(data)


	}


	 }