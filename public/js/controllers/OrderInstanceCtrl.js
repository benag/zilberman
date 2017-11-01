angular.module('ganim').controller(
    'OrderInstanceCtrl', function ($uibModalInstance, order, $scope, $rootScope) {

        $scope.order = order;
        console.log($scope.order);
        $scope.ok = function () {
            $uibModalInstance.close({person:$scope.person.selected, time: $scope.time, room:$scope.room});
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });