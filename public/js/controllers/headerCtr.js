angular.module('ganim').controller('headerCtrl', ['$scope', '$stateParams', '$location', '$state', '$rootScope', 'global',
    function($scope, $stateParams, $location, $state, $rootScope, global) {

        $scope.logOut = () => {
            global.logOutUser();
            $state.go('login');
        }


    }
]);