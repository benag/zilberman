angular.module('ganim').controller('leftPaneController', ['$scope', '$stateParams', '$location', '$state', 'global', '$rootScope',
    function($scope, $stateParams, $location, $state, global, $rootScope) {

        $scope.user = {};
        $scope.user.name = global.user.name;

        $rootScope.showLeftPane = true;
        $scope.goto = function(state){
            global.searchUser = undefined;
            $rootScope.current = state;
            $state.go(state,null,{ reload: true });
        };


        $scope.isActive = function(menu){
            if (menu === $rootScope.current){
                return true;
            }else{
                return false;
            }
        };
    }
]);