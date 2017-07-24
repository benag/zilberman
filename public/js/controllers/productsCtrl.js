angular.module('ganim').controller('productsCtrl', ['$scope', '$stateParams', '$location', '$state', '$http',
    function($scope, $stateParams, $location, $state, $http) {

        $scope.products = [];
        $http.get('/products')
        .then(function(data){
            $scope.products = data.payload;
        })

        $scope.addCategory = function(){
            $scope.products.push({img:'/material/assets/img/image_placeholder.jpg'})
        }

    }
]);