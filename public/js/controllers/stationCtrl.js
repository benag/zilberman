angular.module('ganim').controller('stationCtrl', ['$scope', '$stateParams', '$location', '$state', 'global', '$rootScope', '$http', 'orderService',
    function($scope, $stateParams, $location, $state, global, $rootScope, $http, orderService ) {

        $scope.products = [];
        $scope.showCategory = true;

        $http.get('/products')
        .then(function(data){
            $scope.products = data.data;
        })

        $scope.choseProducts = function(index){

            $rootScope.$applyAsync(function() {
                $scope.showCategory = false;
                $scope.product = $scope.products[index];
            })


        };

        $scope.contract = function(){
            swal({
                title: 'Enter Password',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Submit',
                showLoaderOnConfirm: true,
                preConfirm: function (pass) {
                    return new Promise(function (resolve, reject) {
                        if (pass !== 'admin123') {
                            reject('Wrong password')
                        } else {
                            resolve()
                        }
                    })
                },
                allowOutsideClick: false
            }).then(function (email) {
                var docelem = document.documentElement;
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                $rootScope.$applyAsync(function(){
                    $rootScope.showLeftPane = true;
                });

            })
        }

        $scope.expand = function(){
            $rootScope.$applyAsync(function(){
                $rootScope.showLeftPane = false;
            });
            var docelem = document.documentElement;
            if (docelem.requestFullscreen) {
                docelem.requestFullscreen();
            }
            else if (docelem.mozRequestFullScreen) {
                docelem.mozRequestFullScreen();
            }
            else if (docelem.webkitRequestFullScreen) {
                docelem.webkitRequestFullScreen();
            }
            else if (docelem.msRequestFullscreen) {
                docelem.msRequestFullscreen();
            }
        };

        $scope.confirmOrder = function(index){
            swal({
                title: 'Enter Phone Number',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Submit',
                showLoaderOnConfirm: true,
                preConfirm: function (phone) {
                    return new Promise(function (resolve, reject) {
                        $scope.currentPhone = phone;
                        resolve();
                    })
                },
                allowOutsideClick: false
            }).then(function (email) {
                orderService.orderProduct($scope.currentPhone, $scope.product, $scope.product.products[index] ,'phone')
                    .then(function(){
                        swal('Order Confirmed');
                    }).catch(function(err){
                        swal('Oops...',
                            'Please verify your phone is correct and that you are registered with TRIBU Cafe.',
                            'error'
                        );
                    })
            })

        };

        document.onkeydown = function (evt) {
            if (evt.keyCode == 27) evt.preventDefault();

        }


    }
]);