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
        onDelete: '&',
        recupero: '@'

    }
  });




function BbvaController($state,$stateParams,$scope,$location,$http,LlamadaService,BbvaService){



        dni = $stateParams.dni


        console.log('lolololololo',this.recupero)



        $scope.base = $stateParams.base

        $scope.idagente = $stateParams.idagente

        $scope.nomagente = $stateParams.nomagente




              LlamadaService.cliente(dni).then(function(data) {

                console.log('Ventachub...',data)

                $scope.cliente = data[0]

                })

    $scope.buscardni =function(cliente){

      console.log('SADASDSADASDSAD',cliente)



        }

	  $scope.buscardni =function(dni){


                LlamadaService.cliente(dni).then(function(data) {

                $scope.registros = data

                console.log('data',data[0])

                })

        }


          $scope.go=function(dni){


               $scope.exito = false

               $('.bbva').show();



                LlamadaService.cliente(dni).then(function(data) {

		            console.log('Datos del dni',data[0])

		            $scope.cliente = data[0]

                if(data[0]){


                   $scope.exito = true

                  $('#campana').addClass('bounceInLeft');

                  $location.path('/bbvacampana/'+dni+'/'+data.id_orig_base+'/'+$scope.idagente+'/'+$scope.nomagente)


                }

		        })

           
        }


         $scope.actualizabbva =function(cliente){


              cliente.nomagente = $scope.nomagente


              $('#actualiza').modal('hide');




              BbvaService.actualizar(cliente).then(function(data) {


                      swal({
              title: "Actualizacion BBVA",
              text: "La actualizacion se hizo con exito",
              type: "success",
              showCancelButton: false,
              confirmButtonColor: "#28CC9E",
              confirmButtonText: "Realizar Venta CHUBB",
              closeOnConfirm: true
            },
            function(){


              $state.reload()
              
            });




            })



        }

        var x=0;




        $scope.preguntar =function(preguntas){

            $scope.btnact = false

            if(preguntas==true){

              x=x+1
            }
            else{

              x=x-1
            }

            if(x>=2){

              $scope.btnact = true
            }


            console.log('cliente...',x)





        }





	 }
function BbvacampanaController(LlamadaService,$stateParams,$scope,$location,$http){


        console.log($stateParams.dni)
        
        var ctrl = this;

        url = $location.url()

        dni = $stateParams.dni

        $scope.base = $stateParams.base

        $scope.id_agente = $stateParams.idagente

        $scope.nomagente = $stateParams.nomagente


        LlamadaService.cliente(dni).then(function(data) {

        console.log('Datos del dni',data[0])

        $scope.cliente = data[0]


        })


                  $scope.go=function(dni){

               $scope.exito = false

                LlamadaService.cliente(dni).then(function(data) {

		            console.log('Datos del dni',data[0])

		            $scope.cliente = data[0]

                if(data[0]){


                   $scope.exito = true

                  $('#campana').addClass('bounceInLeft');

                  $location.path('/bbvacampana/'+dni+'/'+data.id_orig_base+'/'+$scope.idagente+'/'+$scope.nomagente)


                }

		        })

           
        }







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
  .component('campanacomponent', {
    templateUrl: 'html/campana/campana.html',
    controller: CampanaController,
    bindings: {
        onDelete: '&'
    }
  });



function CampanaController($scope,$location,$http,LlamadaService){
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
  .component('generatramacomponent', {
    templateUrl: 'html/generatrama/generatrama.html',
    controller: GeneratramaController,
    bindings: {
        onDelete: '&'
    }
  });

  


function GeneratramaController($scope,$location,$http,BbvaService){




	$scope.agregar=function(data){


		 BbvaService.generatrama(data).then(function(data) {

            console.log('Datos del trama',data)

            $scope.base=data[0]

        })



	 }



  $scope.actualizatrama=function(data){



     BbvaService.actualizatrama(data).then(function(data) {

      console.log(data)

                       swal({
              title: "Trama Actualizada",
              text: "La actualizacion se hizo con exito",
              type: "success",
              showCancelButton: false,
              confirmButtonColor: "#28CC9E",
              confirmButtonText: "Cerrar",
              closeOnConfirm: true
            },
            function(){


       
              
            });




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

               $location.path('/home/'+data.cliente+'/'+data.id_orig_base+'/'+$scope.idagente+'/'+$scope.nomagente)


               


           
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




function InicioController($stateParams,$scope,$location,$http,LlamadaService){



}

angular
  .module('app')
  .component('llamadascomponent', {
    templateUrl: 'html/llamadas/llamadas.html',
    controller: LlamadasController

  });





function LlamadasController($stateParams,$scope,$location,$http,LlamadaService){


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
        pasabase: '=',
        recupero:'@'
    }
  

  });





function TipificacionController($state,$stateParams,$filter,$scope,$location,$http,$log,TipificaService,LlamadaService){


      ctrl = this

      url = $location.url()

      dni = $stateParams.dni


      $('.bbva').show()



        $scope.base = $stateParams.base

        $scope.idagente = $stateParams.idagente

        $scope.nomagente = $stateParams.nomagente




              LlamadaService.cliente(dni).then(function(data) {

                console.log('Tipifica...',data)

                $scope.cliente = data[0]

                })



      console.log('uauau',$location.url().split('/')[1])

      if($location.url().split('/')[1]=='bbvacampana'){

              $scope.bbvamuestra = false

      }



      dni = $stateParams.dni

      $scope.base = $stateParams.base

      $scope.idagente = $stateParams.idagente


      console.log('agente.....',$scope.idagente)

      $scope.nomagente = $stateParams.nomagente


      $scope.resultado={}

      TipificaService.contacto().then(function(data) { $scope.contacto = data })

      TipificaService.todosestados().then(function(data) { $scope.estados = data  })

      LlamadaService.base($scope.base).then(function(data) {

        console.log('base...',data)

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


            if(data.contacto==8 && !data.accion){

                swal({
                  title: "Tipificacion Error",
                  text: "Seleccionar una accion para que puedas tipificar",
                  type: "error",
                  showCancelButton: false,
                  confirmButtonColor: "#5bc0de",
                  confirmButtonText: "Cerrar",
                  closeOnConfirm: true
                },
                function(){
                  
                });

                
            }
            else{

                data.dni = dni

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

                  $scope.cliente=''
                  $state.reload()

                  
                });

                })


               // $('.bbva').hide()



             
                


            }

           



      }




      $scope.getestados =function(data){

            TipificaService.estado(data).then(function(data) {

            $scope.estados = data

            })
      }

      $scope.tipificashow = true


      $scope.tipificamal = function(){


          swal({
              title: "Tipificacion no permitida",
              text: "Realizar venta primero",
              type: "error",
              showCancelButton: false,
              confirmButtonColor: "#5bc0de",
              confirmButtonText: "Cerrar",
              closeOnConfirm: true
            },
            function(){
              
            });



      }


      $scope.traeacciones =function(data){

        $scope.tipificashow = true


        console.log('tarslsls',data)

        if(data== 7){


          if ($scope.cliente.fecha_venta_bbva){

            console.log('144444444443')

            $scope.tipificashow = true
          }
          else{

            $scope.tipificashow = false


            console.log('200000')

          }


        }




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
        onDelete: '&',
        recupero: '@'
    }
  });



function VentachubbController($state,$stateParams,$scope,$location,$http,LlamadaService,BbvaService){


  
        dni = $stateParams.dni

        $scope.base = $stateParams.base

        $scope.idagente = $stateParams.idagente

        $scope.nomagente = $stateParams.nomagente


              LlamadaService.cliente(dni).then(function(data) {

                console.log('Ventachub...',data)

                $scope.cliente = data[0]

                })


            $scope.calcprimatotal=function(cliente){


              console.log('dattatata',cliente)

              if(cliente.cantidad==0){

                cliente.todo_prima = 25
              }
              else{

                cliente.todo_prima = cliente.cantidad*25

              }

              


            }


         $scope.ventabbva =function(cliente){


              cliente.nomagente = $scope.nomagente

              BbvaService.venta(cliente).then(function(data) {


                      swal({
              title: "Venta CHUBB",
              text: "La venta se hizo con exito",
              type: "success",
              showCancelButton: false,
              confirmButtonColor: "#28CC9E",
              confirmButtonText: "Cerrar",
              closeOnConfirm: true
            },
            function(){


              $state.reload()
              
            });




            })



        }


	 }


function VentarecuperoController($scope,$location,$http,LlamadaService,$stateParams){



        console.log($stateParams.dni)
        
        var ctrl = this;

        url = $location.url()

        dni = $stateParams.dni

        $scope.base = $stateParams.base

        $scope.id_agente = $stateParams.idagente

        $scope.nomagente = $stateParams.nomagente


        LlamadaService.cliente(dni).then(function(data) {

        console.log('Datos del dni',data[0])

        $scope.cliente = data[0]


        })


                  $scope.go=function(dni){

               $scope.exito = false

                LlamadaService.cliente(dni).then(function(data) {

		            console.log('Datos del dni',data[0])

		            $scope.cliente = data[0]

                if(data[0]){


                   $scope.exito = true

                  $('#campana').addClass('bounceInLeft');

                  $location.path('/recupero/'+dni+'/'+data.id_orig_base+'/'+$scope.idagente+'/'+$scope.nomagente)


                }

		        })

           
        }




	 }