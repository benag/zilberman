angular.module('ganim').controller(
    'ModalInstanceEditCtrl', function ($uibModalInstance, items, rooms, eventDB, eventCal,  $scope, $rootScope) {

        $scope.members = items;
        $scope.rooms = rooms;
        $scope.person = {};
        $scope.room = {};
        $scope.time = {};
        $scope.person.selected = eventDB.user;
        $scope.room.selected = eventDB.room;
        $scope.time.startTime = eventCal.start._d;
        $scope.time.endTime = eventCal.end._d;

        $scope.ok = function () {
            $uibModalInstance.close({person:$scope.person.selected, time: $scope.time, room:$scope.room});
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.remove = function () {
            $rootScope.$broadcast('delete_event', {id:eventCal.id});
            $uibModalInstance.dismiss('cancel');
        };
    });