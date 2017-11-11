angular.module('ganim').controller('loginCtrl', ['$scope', '$stateParams', '$location', '$state', 'global', 'userMng', '$timeout',
    function($scope, $stateParams, $location, $state, global, userMng, $timeout) {


        $scope.user = {};
        $scope.user.email ='';
        let $page = $('.full-page');
        let image_src = $page.data('image');

        if(image_src !== undefined){
            let image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>';
            $page.append(image_container);
        }

        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)


        $scope.validateAndContinue = function(){
            // 1. look for local storage with date. if exist go to next else ask for validation, or registration
            userMng.getUser($scope.user.email, $scope.user.password )
            .then(function(user){
               global.setUserData(user);
               $state.go('main');
            }).catch(function(err) {
                console.log(err);
                    swal('Wrong user name or password');
            })
        };

        //$scope.login = function(){
        //    authService.login();
        //
        //}
    }
]);