angular.module('ganim').controller('loginCtrl', ['$scope', '$stateParams', '$location', '$state', 'global',
    function($scope, $stateParams, $location, $state, global) {


        $scope.user ={};
        $scope.validateAndContinue = function(){
            // 1. look for local storage with date. if exist go to next else ask for validation, or registration
            if ($scope.user.email === 'danrolls@gmail.com' && $scope.user.password === 'dan'){
                global.user.name = 'Dan Rolls';
                $state.go('main');
            }
        };

        $scope.login = function(){
            authService.login();

        }
    }
]);