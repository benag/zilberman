angular.module('ganim').controller('topNavCtrl', ['$scope', '$stateParams', '$location', '$state',
    function($scope, $stateParams, $location, $state) {

        $scope.isMobile = () => {
            return window.screen.width < 800;
        }
        $scope.state = (state) => {
            console.log($state.current);
            $state.go(state,{},{ reload: true });
        };

        $scope.ifstate = (state) => {
            return (window.location.href.indexOf(state) !== -1);

        }


    }
]);