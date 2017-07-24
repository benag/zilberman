angular.module('ganim').controller('productsCtrl', ['$scope', '$stateParams', '$location', '$state', '$http','Upload', 'global',
    function($scope, $stateParams, $location, $state, $http, Upload, global) {

        $scope.products = [];
        $http.get('/products')
        .then(function(data){
            $scope.products = data.payload;
        })

        $scope.uploadProductImg = function(file, errFiles, index){
            if (file) {
                let url = 'http://' + global.getMachine() + '/product-image';
                file.upload = Upload.upload({
                    url: url,
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    $scope.products[index].img = 'http://' + global.getMachine() + '/' + response.data.payload;

                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }

        }

        $scope.addCategory = function(){
            $scope.products.push({img:'/material/assets/img/image_placeholder.jpg'})
        }

    }
]);