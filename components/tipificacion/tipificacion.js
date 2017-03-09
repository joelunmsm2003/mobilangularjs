angular
  .module('app')
  .component('tipificacioncomponent', {
    templateUrl: '../html/tipificacion/tipificacion.html',
    controller: TipificacionController,
    bindings: {
        pasabase: '='
    }
  

  });





function TipificacionController($scope,$location,$http,$log,TipificaService){


    ctrl = this

    url = $location.url()

    $scope.base = url.split('&')[1].split('=')[1]



    TipificaService.contacto().then(function(data) {

    $scope.contacto = data

    })







    var formData = { base: $scope.base };

    var postData = 'myData='+JSON.stringify(formData);

    $http({

    method : 'POST',
    url : host+'/obtienebase.php',
    data: postData,
    headers : {'Content-Type': 'application/x-www-form-urlencoded'}  

    }).success(function(res){


            $scope.baseresult = res[0]

            $http.get(host+"/contacto.php/").success(function(data) {

                  $scope.contacto = data
    
            });


            // console.log('contacto',$scope.baseresult.contacto)
  
    })



    $scope.muestraagendar= false




    $scope.tipifica =function(data){

      data.base = $scope.base

      console.log(data)


      TipificaService.tipifica(data, function(response) {

      console.log('iojjkjkjk',response);

      })


    }



    




      

        $scope.getestados =function(data){


      

                TipificaService.estado(data).then(function(data) {

                $scope.estados = data

                console.log('Acciones...',data)

                })


        }


            $scope.traeacciones =function(data){


        
                      
                TipificaService.accion(data).then(function(data) {

                $scope.listaaciones = data

             

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

  $scope.changed = function () {
 
     console.log('FEcha...',$scope.dt.getDate(),$scope.mytime)


                fagenda = JSON.stringify($scope.dt).split(':')[0].split('T')[0].split('"')[1]+' '+$scope.mytime.getHours()+':'+$scope.mytime.getMinutes()

                console.log('Agenda...',fagenda) 


                var formData = { fagenda: fagenda,base:$scope.base };

                var postData = 'myData='+JSON.stringify(formData);

                $http({

                method : 'POST',
                url : host+'/agendar.php',
                data: postData,
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}  

                }).success(function(res){

                    console.log('llamadas..ooo..',res);

                    $scope.llamadas = res


                })
  };

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
