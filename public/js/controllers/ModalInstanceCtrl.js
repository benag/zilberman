angular.module('ganim').controller('ModalInstanceCtrl', function ($uibModalInstance, items, $scope, $rootScope) {

    $scope.members = items;
    $scope.person = { value: $scope.members[0] };

    $scope.ok = function () {
        $uibModalInstance.close($scope.person.value);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});