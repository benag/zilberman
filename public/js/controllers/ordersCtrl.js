angular.module('ganim').controller('ordersCtrl', ['$scope', '$stateParams', '$location', '$state', 'global', '$rootScope',
    '$http', 'orderService','$uibModal',
    function($scope, $stateParams, $location, $state, global, $rootScope, $http, orderService, $uibModal ) {

        let _this = $scope;
        _this.orders = [];
        _this.init = async () => {
            console.log('init orders');
            $http.get('/orders').then( (orders) => {
                orders.data.map( ( order ) => {
                    order.orders.forEach( product => {
                        _this.orders.push
                        ({
                            _id:order._id,
                            createdAt: order.createdAt,
                            user: order.user || {},
                            name: order.user ? (order.user.firstName || '' + ' ' + order.user.lastName || '') : '',
                            title: product ? product.title : '',
                            points: product ? product.price : '',
                            status: order.status
                        })
                    });
                })
            });
        };


        _this.openSummery = (index) => {

            _this.modalInstance = $uibModal.open({
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
            _this.modalInstance.result.then(function (selectedItem) {
                _this.init();
            }, function () {

            });
        }


    }
]);