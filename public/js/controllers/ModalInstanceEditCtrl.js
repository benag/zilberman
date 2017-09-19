angular.module('ganim').controller(
    'ModalInstanceEditCtrl', function ($uibModalInstance, items, rooms, eventDB, eventCal,  $scope, $rootScope) {

        $scope.members = items;
        $scope.rooms = rooms;
        $scope.person = {};
        $scope.room = {};
        $scope.time = {};
        $scope.person.selected = eventDB.user;
        $scope.room.selected = eventDB.room;
        $scope.time.startTime =

        $scope.ok = function () {
            $uibModalInstance.close({person:$scope.person.selected, time: $scope.time, room:$scope.room});
        };

        $scope.remove = function () {
            $rootScope.$broadCast('delete_event', {id:eventCal.id});
            $uibModalInstance.dismiss('cancel');
        };
    });