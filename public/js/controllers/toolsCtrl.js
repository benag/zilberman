angular.module('ganim').controller('toolsCtrl', ['$scope', '$stateParams', '$location', '$state','$http',
    function($scope, $stateParams, $location, $state, $http) {

        $scope.token = 'EAABh464bAfgBABoJ0xB3jiNldZArxBGfbE9S88d0wFJSY2ZCTNqtFGMO9btGflis6jE9ZAZC1PtKURR8AERuTbF2ecucwLan56BlRtdfgRw50lPMJQuDT0zrJ4zX3giLuvd69RhTblZA3zgyJLxYAVUvmYr0hJjij356lBzEyO1iwqO3dsyDJxezEdgRf7yoZD';
        $scope.faceBookUser ='';
        $scope.dataArrived = false;
        $scope.facebookData = {};
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '107630506476024',
                xfbml      : false,
                version    : 'v2.9'
            });
            FB.AppEvents.logPageView();
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));


        $scope.options='Page';

        $scope.Upload = function(){
            $http.post('/scan/upload',{facebookData:$scope.facebookData})
            .then(function(){
                alert('User added');
            })
        };
        $scope.scan = function(){
            FB.login(function(response) {
                if (response.authResponse) {
                    //website,'link','description','emails','general_info','mission','phone', 'company_overview','contact_address'
                    //'link','description','emails','general_info','mission','phone', 'company_overview','contact_address','website'
                    FB.api(
                        $scope.faceBookUser
                        ,{fields: ['about','link','description','emails','general_info','mission','phone', 'company_overview','contact_address','website']},
                        function (response) {
                            if (response && !response.error) {
                                $scope.$applyAsync(function(){
                                    $scope.dataArrived = true;
                                    $scope.facebookData = response;
                                })
                            }
                        }
                    );
                    FB.api(
                        $scope.faceBookUser+'/picture'
                        ,function (response) {
                            if (response && !response.error) {
                                $scope.$applyAsync(function(){
                                    $scope.facebookData.img = response;
                                })
                            }
                        }
                    );
                } else {
                    //login cancelled or not every permission accepted
                }
            }, {scope: 'manage_pages'}); //additional permissions

        }
    }
]);