angular.module('ganim').controller('mainCtrl', ['$scope', '$stateParams', '$location',
    function($scope, $stateParams, $location) {

        $scope.selectClient = function(){
            return true;
        }
    }
]);