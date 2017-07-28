angular.module('ganim').controller('productsCtrl', ['$scope', '$stateParams', '$location', '$state', '$http','Upload', 'global', 'productsService',
    function($scope, $stateParams, $location, $state, $http, Upload, global, productsService) {

        $scope.products = [];
        $http.get('/products')
        .then(function(data){
            $scope.products = data.data;
        })


        $scope.updateProduct = function(index){
            productsService.updateProduct($scope.products[index]);

        };
        $scope.uploadProductImg = function(file, errFiles, index){
            if (file) {
                let url = 'http://' + global.getMachine() + '/product-image';
                file.upload = Upload.upload({
                    url: url,
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    $scope.products[index].img = 'http://' + global.getMachine() + '/' + response.data.payload;
                    productsService.updateProduct($scope.products[index]);

                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }

        };

        $scope.gotoProducts = function(index){
            $state.go('subproducts',{product:$scope.products[index]})
        };

        $scope.remove = function(index){
            productsService.remove($scope.products[index])
            .then(function(product){
                $scope.products.splice(index,1);
            })
        }

        $scope.addCategory = function(){

            productsService.createProduct({img:'/material/assets/img/image_placeholder.jpg'}).then(function(product){
                $scope.products.push(product);
            })


        }

    }
]);