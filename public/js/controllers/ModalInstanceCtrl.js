angular.module('ganim').controller(
    'ModalInstanceCtrl', function ($uibModalInstance, items, rooms, $scope, $rootScope) {

    $scope.members = items;
    $scope.rooms = rooms;
    $scope.person = {};
    $scope.time = {};


    $scope.ok = function () {
        $uibModalInstance.close({person:$scope.person.selected, time: $scope.time});
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.refresh = (val) => {
        if (val > 2) {
            userMng.getUsersByFilter('name', val, 'multiple').then( users => {
                $scope.members = users.data;
            })
        }
    }
});