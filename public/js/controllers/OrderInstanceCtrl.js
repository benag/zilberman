angular.module('ganim').controller(
    'OrderInstanceCtrl.js', function ($uibModalInstance, items, rooms, $scope, $rootScope) {



        $scope.ok = function () {
            $uibModalInstance.close({person:$scope.person.selected, time: $scope.time, room:$scope.room});
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });