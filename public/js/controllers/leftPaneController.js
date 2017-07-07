angular.module('ganim').controller('leftPaneController', ['$scope', '$stateParams', '$location', '$state',
    function($scope, $stateParams, $location, $state) {
        $scope.currenet = 'users';
        $scope.goto = function(state){
            $scope.currenet = state;
            $state.go(state);
        }
        $scope.isActive = function(menu){
            return (menu === $scope.currenet);
        }
    }
]);