angular.module('ganim').controller('meetupsCtrl', ['$scope', '$stateParams', '$location', '$state', 'calenderService',
    '$uibModal', '$log', '$document', 'userMng', 'roomMng','$rootScope',
    function($scope, $stateParams, $location, $state, calenderService, $uibModal, $log, $document, userMng, roomMng, $rootScope) {



        $scope.searchUserParam ='';
        $scope.person = {};


        userMng.getUsersByFilter('name', ' ', 'multiple').then( users => {
            $scope.users = users.data;
        })

        roomMng.getRooms()
        .then(function(rooms){
            $rootScope.rooms = rooms.data;
            if (!$rootScope.room || !$rootScope.room.selected){
                $rootScope.room = {selected: $rootScope.rooms[0]};
                calenderService.initCalender($scope, $rootScope.room.selected );
            }
        }).catch(function(err){ console.log(err)});

        $scope.timepicker ='';

        $scope.animationsEnabled = true;

        $scope.roomSelected = (index) => {
            $rootScope.room.selected = $rootScope.rooms[index];
            $state.go($state.$current, null, { reload: true });
            calenderService.initCalender($scope, $rootScope.room.selected );
        };


        $scope.edit = function(eventDB, eventCal, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModalEditContent.html',
                controller: 'ModalInstanceEditCtrl',
                size: undefined,
                appendTo: parentElem,
                resolve: {
                    items: function () {
                        return $scope.users;
                    },
                    rooms: function() {
                        return $scope.rooms;
                    },
                    eventDB: function () {
                        return eventDB;
                    },
                    eventCal: function () {
                        return eventCal;
                    }

                }
            });

            modalInstance.result.then(function (selectedItem) {
                selectedItem.time.start = selectedItem.time.startTime;
                selectedItem.time.end = selectedItem.time.endTime;
                calenderService.updateEvent(selectedItem);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.open = function (start, end, size, parentSelector) {

            $scope.start = start;
            $scope.end = end;
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                appendTo: parentElem,
                resolve: {
                    items: function () {
                        return $scope.users;
                    },
                    rooms: function() {
                        return $scope.rooms;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                selectedItem.time.start = $scope.start;
                selectedItem.time.end = $scope.end;
                selectedItem.room = $rootScope.room.selected;
                calenderService.addEvent(selectedItem);
                //calenderService.setEvent($scope.selected);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

    }
]);