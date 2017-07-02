angular.module('ganim').controller('leftPaneController', ['$scope', '$stateParams', '$location', '$state',
    function($scope, $stateParams, $location, $state) {
        $scope.currenet = 'users';
        $scope.isActive = function(menu){
            return (menu === $scope.currenet);
        }
    }
]);