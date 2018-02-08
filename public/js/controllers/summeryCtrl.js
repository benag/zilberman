angular.module('ganim').controller('summeryCtrl', ['$scope', '$stateParams', '$location', '$state','$http',
    function($scope, $stateParams, $location, $state, $http) {

        $http.get('/products')
        .then( (data) => {
            $scope.products = data.data;
        })


    }
]);