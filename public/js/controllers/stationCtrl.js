angular.module('ganim').controller('stationCtrl', ['$scope', '$stateParams', '$location', '$state', 'global', '$rootScope', '$http', 'orderService',
    function($scope, $stateParams, $location, $state, global, $rootScope, $http, orderService ) {

        $scope.products = [];
        $scope.showCategory = true;
        $scope.orders = 0;
        $scope.basket = {};

        $http.get('/products')
        .then(function(data){
            $scope.products = data.data;
        });


        $scope.order = () => {
            let orders =[];
            let total = 0;
            $rootScope.menus.forEach( (menu) => {
                menu.offerings.forEach( (offer) => {
                    if (offer.amount > 0) {
                        total = total + offer.amount*offer.credits;
                        orders.push({
                            categoryId: menu._id,
                            offerId: offer._id
                        })
                    }
                })
            });
            let user = global.getUserData();
            if (total > user.total ) global.alert('Not enough points left');
            return httpService.post('/order/process', {orders:orders, user:global.getUserData(), total:total});
        };

        $scope.gotoProducts = function(index){

            $scope.identifyUser(() => {
                $rootScope.$applyAsync(function() {
                    $scope.showCategory = false;
                    $scope.product = $scope.products[index];
                })
            }).catch(() => swal('Cannot identify user'));


        };

        $rootScope.contract = function(){
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

        $scope.resetUserAndOrderData = () => {
            $scope.user = {};
        };

        $scope.identifyUser = (cb) => {
            swal({
                title: 'Enter Phone Number',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Submit',
                showLoaderOnConfirm: true,
                preConfirm: function (phone) {
                    return new Promise(function (resolve, reject) {
                        $scope.currentPhone = phone;
                        $scope.user = userMng.getUsersBy().then( (user) => {
                            $scope.user = user;
                            resolve();
                        })

                    })
                },
                allowOutsideClick: false
            }).then(cb);

        };

        $scope.orderProduct = (index) => {

        };

        $scope.submitBasket = () => {
            orderService.orderProduct($scope.currentPhone, $scope.product, $scope.product.products[index] ,'phone')
                .then(function(){
                    swal('Order Confirmed');
                }).catch(function(err){
                    swal('Oops...',
                        'Please verify your phone is correct and that you are registered with TRIBU Cafe.',
                        'error'
                    );
                })
        }
        //$scope.confirmOrder = function(index){
        //    swal({
        //        title: 'Enter Phone Number',
        //        input: 'text',
        //        showCancelButton: true,
        //        confirmButtonText: 'Submit',
        //        showLoaderOnConfirm: true,
        //        preConfirm: function (phone) {
        //            return new Promise(function (resolve, reject) {
        //                $scope.currentPhone = phone;
        //                resolve();
        //            })
        //        },
        //        allowOutsideClick: false
        //    }).then(function (email) {
        //        orderService.orderProduct($scope.currentPhone, $scope.product, $scope.product.products[index] ,'phone')
        //            .then(function(){
        //                swal('Order Confirmed');
        //            }).catch(function(err){
        //                swal('Oops...',
        //                    'Please verify your phone is correct and that you are registered with TRIBU Cafe.',
        //                    'error'
        //                );
        //            })
        //    })
        //
        //};

        document.onkeydown = function (evt) {
            if (evt.keyCode == 27) evt.preventDefault();

        }


    }
]);