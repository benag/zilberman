angular.module('ganim').controller('leftPaneController', ['$scope', '$stateParams', '$location', '$state', 'global',
    function($scope, $stateParams, $location, $state, global) {
        $scope.currenet = 'users';
        $scope.user = {};
        $scope.user.name = global.user.name;

        $scope.goto = function(state){
            global.searchUser = undefined;
            $scope.current = state;
            $state.go(state,null,{ reload: true });
        };

        $scope.isActive = function(menu){
            return (menu === $scope.currenet);
        };
    }
]);