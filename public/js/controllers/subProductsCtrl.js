angular.module('ganim').controller('subProductsCtrl', ['$scope', '$stateParams', '$location', '$state', '$http','Upload', 'global', 'productsService',
    function($scope, $stateParams, $location, $state, $http, Upload, global, productsService) {


        $scope.product = $stateParams.product;

        $scope.updateSubProduct = function(){
            productsService.updateProduct($scope.product);

        };

        $scope.uploadSubProductImg = function(file, errFiles, index){
            if (file) {
                let url = 'http://' + global.getMachine() + '/product-image';
                file.upload = Upload.upload({
                    url: url,
                    data: {file: file}
                });
                file.upload.then(function (response) {
                    $scope.product.products[index].img = 'http://' + global.getMachine() + '/' + response.data.payload;
                    productsService.updateProduct($scope.product);

                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }

        };

        $scope.remove = (index) => {
            let subproduct = $scope.product.products[index];
            //$scope.product.products.splice(index,1);
            productsService.removeSubProduct($scope.product, subproduct).then(function(product){
                $scope.$applyAsync(() => {
                    $scope.product = product;
                })

            })
        };

        $scope.addProduct = function(){
            $scope.product.products.push({img:'/material/assets/img/image_placeholder.jpg'});
            productsService.addSubProduct($scope.product,{img:'/material/assets/img/image_placeholder.jpg'}).then(function(product){
                $scope.product = product;
            })


        }

    }
]);