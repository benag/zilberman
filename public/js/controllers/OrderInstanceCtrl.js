angular.module('ganim').controller(
    'OrderInstanceCtrl', function ($uibModalInstance, order, $scope, $http, $rootScope) {

        $scope.order = order;
        console.log($scope.order);
        //
        //$scope.ok = function () {
        //
        //};

        $scope.approve = () => {
            $http.post('/order/approve', {order:$scope.order}).then( () => {
                //$rootScope.$broadcast('refreshOrders')
                swal('Order approved!')
                $uibModalInstance.close()
            }).catch(err => swal(err.data) )
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });