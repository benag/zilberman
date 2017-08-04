angular.module('ganim').controller('loginCtrl', ['$scope', '$stateParams', '$location', '$state', 'global', 'userMng',
    function($scope, $stateParams, $location, $state, global, userMng) {


        $scope.user ={};


        $scope.validateAndContinue = function(){
            // 1. look for local storage with date. if exist go to next else ask for validation, or registration
            userMng.getUser($scope.user.email, $scope.user.password )
            .then(function(user){
                global.login = true;
                global.user= user;
                $state.go('main');
            })
        };

        $scope.login = function(){
            authService.login();

        }
    }
]);