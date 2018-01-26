angular.module('ganim').controller('topNavCtrl', ['$scope', '$stateParams', '$location', '$state',
    function($scope, $stateParams, $location, $state) {

        $scope.state = (state) => {
            window.location.href = 'http://localhost:3000/index.html#!/' + state;
            //$state.go('summery');
        };

        $scope.ifstate = (state) => {
            return (window.location.href.indexOf(state) !== -1);

        }


    }
]);