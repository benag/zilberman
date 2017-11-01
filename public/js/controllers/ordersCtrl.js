angular.module('ganim').controller('ordersCtrl', ['$scope', '$stateParams', '$location', '$state', 'global', '$rootScope',
    '$http', 'orderService','$uibModal',
    function($scope, $stateParams, $location, $state, global, $rootScope, $http, orderService, $uibModal ) {

        let _this = $scope;
        _this.orders = [];
        _this.init = async () => {
            $http.get('/orders').then( (orders) => {
                orders.data.map( ( order ) => {
                    order.orders.forEach( product => {
                        _this.orders.push({createdAt: order.createdAt,
                            user: order.user,
                                            name:order.user.firstName + ' ' + order.user.lastName,
                                            title:product.title,
                                            points: product.price,
                                            status: order.status
                                          })
                    });
                })
            });
            console.log(_this.orders);
        };

        _this.openSummery = (index) => {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'orderInfoModal.html',
                controller: 'OrderInstanceCtrl',
                size: undefined,
                appendTo: undefined,
                resolve: {
                    order: function () {
                        return $scope.orders[index];
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                selectedItem.time.end = $scope.end;
                calenderService.addEvent(selectedItem);
                //calenderService.setEvent($scope.selected);
            }, function () {

            });
        }


    }
]);