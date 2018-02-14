angular.module('ganim').controller('summeryCtrl', ['$scope', '$stateParams', '$location', '$state','$http', 'global',
    function($scope, $stateParams, $location, $state, $http, global) {

        $http.get('/products')
        .then( (data) => {
            $scope.products = data.data;
        })
        $scope.goToClient = (index) => {
            global.setProduct($scope.products[index]);
        }    

    }
]);