angular.module('ganim').controller(
    'OrderInstanceCtrl', function ($uibModalInstance, order, $scope, $http, $rootScope) {

        $scope.order = order;
        console.log($scope.order);

        $scope.ok = function () {
            $uibModalInstance.close({person:$scope.person.selected, time: $scope.time, room:$scope.room});
        };

        $scope.approve = () => {
            $http.post('/order/approve', {order:$scope.order}).then( () => swal('Order approved!') )
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });