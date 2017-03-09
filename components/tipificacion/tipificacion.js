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
