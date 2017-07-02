angular.module('ganim').controller('loginCtrl', ['$scope', '$stateParams', '$location', '$state',
    function($scope, $stateParams, $location, $state) {
        $scope.validateAndContinue = function(){
            // 1. look for local storage with date. if exist go to next else ask for validation, or registration
            $state.go('main');

        };
        $scope.login = function(){
            authService.login();

        }
    }
]);