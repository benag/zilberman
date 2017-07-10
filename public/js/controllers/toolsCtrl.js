angular.module('ganim').controller('toolsCtrl', ['$scope', '$stateParams', '$location', '$state','$http',
    function($scope, $stateParams, $location, $state, $http) {

        $scope.token = '';
        $scope.faceBookUser ='';
        $scope.dataArrived = false;
        $scope.facebookData = {};
        $scope.userType = 'Page';
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

        $scope.setOption = function(option){
            $scope.options = option;
        };

        $scope.getIDFromURL= function(user){
            return $http.get('https://graph.facebook.com/' + user + '?access_token='+$scope.token);
        };


        $scope.Upload = function(){
            $http.post('/scan/upload',{facebookData:$scope.facebookData})
            .then(function(){
                alert('User added');
            })
        };

        $scope.getFacebookUserData = function(userId){
            FB.api(
                userId
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
                userId+'/picture'
                ,function (response) {
                    if (response && !response.error) {
                        $scope.$applyAsync(function(){
                            $scope.facebookData.img = response;
                        })
                    }
                }
            );
        };

        $scope.getFacebookCompanyData = function(){
            FB.api(
                $scope.faceBookUser
                ,{fields: ['about','email','first_name','last_name','gender','website']},
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
        }
        $scope.scan = function(){
            FB.login(function(response) {
                if (response.authResponse) {
                    $scope.token = response.authResponse.accessToken;
                    //if ($scope.options === 'User'){
                    //    let array = $scope.faceBookUser.split('/');
                    //    let userName = array.pop();
                    //    $scope.getIDFromURL(userName)
                    //    .then(function(userObj){
                    //        $scope.getFacebookUserData(userObj.id)
                    //    })
                    //}else{
                        $scope.getFacebookCompanyData();
                    //}
                } else {
                    //login cancelled or not every permission accepted
                }
            }, {scope: 'manage_pages'}); //additional permissions

        }
    }
]);