angular.module('ganim').controller('summeryCtrl', ['$scope', '$stateParams', '$location', '$state','$http', 'global',
    function($scope, $stateParams, $location, $state, $http, global) {
        $scope.loading = true;
        $http.get('/products')
        .then( (data) => {
            $scope.loading = false;
            $scope.products = data.data;
        })
        $scope.goToClient = (index) => {
            global.setProduct($scope.products[index]);
            $state.go('newentry');
        }    

    }
]);