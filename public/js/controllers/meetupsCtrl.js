angular.module('ganim').controller('meetupsCtrl', ['$scope', '$stateParams', '$location', '$state', 'calenderService','$uibModal', '$log', '$document', 'userMng',
    function($scope, $stateParams, $location, $state, calenderService, $uibModal, $log, $document, userMng) {

        calenderService.initCalender($scope);
        userMng.getUsers()
        .then(function(users){
            $scope.itemArray = users;
        }).catch()

        $scope.timepicker ='';

        $scope.animationsEnabled = true;

        $scope.open = function (size, parentSelector) {
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
                        return $scope.itemArray;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
                //calenderService.setEvent($scope.selected);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

    }
]);