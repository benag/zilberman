angular.module('ganim').controller('ModalInstanceCtrl', function ($uibModalInstance, items, rooms, $scope, $rootScope) {

    $scope.members = items;
    $scope.rooms = rooms;
    $scope.person = { value: $scope.members[0] };
    $scope.room = {};
    $scope.time = {};


    $scope.ok = function () {
        $uibModalInstance.close({person:$scope.person.value, time: $scope.time, room:$scope.room});
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});