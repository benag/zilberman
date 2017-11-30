angular.module('ganim').controller('headerCtrl', ['$scope', '$stateParams', '$location', '$state', '$rootScope', 'global',
    function($scope, $stateParams, $location, $state, $rootScope, global) {

        $scope.$state = $state;

        $scope.returnBack = function(){
            $state.go('products');
        }
        $scope.logOut = () => {
            global.logOutUser();
            $state.go('login');
        }


    }
]);