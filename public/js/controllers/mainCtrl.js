angular.module('ganim').controller('mainCtrl', ['$scope', '$stateParams', '$location', '$state',
    function($scope, $stateParams, $location, $state) {

        $scope.isOpen = false;

        $scope.demo = {
            isOpen: false,
            count: 0,
            selectedDirection: 'left'
        };

        $scope.newEntry = () => {
            $state.go('newentry');
        }


    }
]);