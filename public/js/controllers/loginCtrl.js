angular.module('ganim').controller('loginCtrl', ['$scope', '$stateParams', '$location', '$state', 'global', 'userMng',
    function($scope, $stateParams, $location, $state, global, userMng) {


        $scope.user = {};
        $scope.user.email ='';


        $scope.validateAndContinue = function(){
            // 1. look for local storage with date. if exist go to next else ask for validation, or registration
            userMng.getUser($scope.user.email, $scope.user.password )
            .then(function(user){
               $state.go('main');
            }).catch(function(err) {
                console.log(err);
            })
        };

        $scope.login = function(){
            authService.login();

        }
    }
]);