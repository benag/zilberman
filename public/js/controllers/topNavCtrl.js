angular.module('ganim').controller('topNavCtrl', ['$scope', '$stateParams', '$location', '$state',
    function($scope, $stateParams, $location, $state) {

        
        $scope.state = (state) => {
            $state.go(state,{ reload: true });
        };

        $scope.ifstate = (state) => {
            return (window.location.href.indexOf(state) !== -1);

        }


    }
]);