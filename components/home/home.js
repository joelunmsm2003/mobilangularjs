
function HomeController($scope,$location,$http,LlamadaService){




        var ctrl = this;

        url = $location.url()

        dni = url.split('&')[0].split('=')[1]

        $scope.base = url.split('&')[1].split('=')[1]

        $scope.id_agente = url.split('&')[2].split('=')[1]

        $scope.nomagente = url.split('&nomagente=')[(url.split('&nomagente=')).length-1]

        // $http.get(host+'saveagente/'+$scope.nomagente+'/'+$scope.base).success(function(data) {
           
        // })


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


        $scope.buscardni =function(dni){


            console.log('buscando dni...')



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
