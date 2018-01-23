angular.module('ganim').controller('loginCtrl', ['$scope', '$stateParams', '$location', '$state', 'global', 'userMng', '$timeout',
    function($scope, $stateParams, $location, $state, global, userMng, $http) {


        $scope.user = {};
        $scope.user.email ='';
        $scope.sms = false;
        $scope.showLogin = true;
        let $page = $('.full-page');
        let image_src = $page.data('image');

        if(image_src !== undefined){
            let image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>';
            $page.append(image_container);
        }

        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700);


        $scope.validateAndContinue = function(){
            // 1. look for local storage with date. if exist go to next else ask for validation, or registration
            userMng.getUser($scope.user.email, $scope.user.password )
            .then(function(user){
               global.setUserData(user);
               $state.go('station');
            }).catch(function(err) {
                console.log(err);
                    swal('Wrong user name or password');
            })
        };

        $scope.changeToRegister = () => {
            $scope.user ={};
            $scope.showLogin = false;
        };
        $scope.changeToLogin = () => {
            $scope.user ={};
            $scope.showLogin = true;
        };

        $scope.register = () => {
            $http.post('/register', {id:$scope.user.id,phone:user.phone, email:user.email, name:user.name, password:user.password})
            .then( (data) => {

            })
            .catch((err) => {

            })
        };

        $scope.login = function(){

            $state.go('newentry');
            //authService.login()
            //.then( () => {
            //    $scope.sms = true;
            //})


        }
    }
]);