angular.module('ganim').controller('leftPaneController', ['$scope', '$stateParams', '$location', '$state', 'global', '$rootScope',
    function($scope, $stateParams, $location, $state, global, $rootScope) {
        $scope.currenet = 'users';
        $scope.user = {};
        $scope.user.name = global.user.name;

        $rootScope.showLeftPane = true;
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