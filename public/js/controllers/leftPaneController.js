angular.module('ganim').controller('leftPaneController', ['$scope', '$stateParams', '$location', '$state', 'global',
    function($scope, $stateParams, $location, $state, global) {
        $scope.currenet = 'users';
        $scope.goto = function(state){
            global.searchUser = undefined;
            $scope.currenet = state;
            $state.go(state);
        }

        $scope.isActive = function(menu){
            return (menu === $scope.currenet);
        }
    }
]);