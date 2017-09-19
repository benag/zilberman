angular.module('ganim').controller(
    'ModalInstanceCtrl', function ($uibModalInstance, items, rooms, $scope, $rootScope) {

    $scope.members = items;
    $scope.rooms = rooms;
    $scope.person = {};
    $scope.room = {};
    $scope.time = {};


    $scope.ok = function () {
        $uibModalInstance.close({person:$scope.person.selected, time: $scope.time, room:$scope.room});
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});