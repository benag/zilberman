angular.module('ganim').controller('searchCtrl', ['$scope', '$stateParams', '$location', '$state', '$http',
    'global', 'userMng','$uibModal','$rootScope',
    function($scope, $stateParams, $location, $state, $http, global, userMng, $uibModal, $rootScope) {

        _this = $scope;
        $scope.sortType = '';
        $scope.reverseCompany = false;
        $scope.reverseFirst = false;
        $scope.reverseLast = false;
        $scope.reversePoints = false;
        $scope.page = 0;
        $scope.limit =500;
        $scope.currentShown = 0;
        $scope.searchParam = 'Company'
        $scope.loading;


        $scope.init = async function(){

            userMng.getUsers(_this.page, _this.limit).then ( (users) => {
                $scope.users = users.payload;
                _this.currentShown = _this.users.length;
            })
        };

        $scope.back = () => {
            _this.page--;
            userMng.getUsers(_this.page, _this.limit).then ( (users) => {
                $scope.users = users.payload;
                _this.currentShown = _this.users.length;
            })
        }

        $scope.next = () => {
            _this.page++;
            userMng.getUsers(_this.page, _this.limit).then((users) => {
                $scope.users = users.payload;
                _this.currentShown = _this.users.length;
            })

        }

        $scope.search = () => {
            if (_this.searchUserParam.length === 0) {
                _this.init()
            }
            if (_this.searchUserParam.length > 1) {
                userMng.getUsersByFilter(_this.searchParam, _this.searchUserParam, 'multiple').then( users => {
                    $scope.users = users.data;
                    _this.currentShown = _this.users.length;
                })
            }
        };

        $scope.remove = function(index){
            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(function () {
                userMng.removeUser($scope.users[index]._id).then( function(){
                    swal(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    $scope.init()
                }).catch(function (err){swal('Error: contact admin')});

            })

        }

        $scope.changeSearchParam = (param) => {
            $scope.searchParam = param;
            $scope.search();
        }

        $scope.deActivate = (index) => {
            userMng.activate($scope.users[index],false).then( users => {
                $scope.init();
                swal('User activated');
            }).catch( err => console.log(err) );
        }

        $scope.activate = (index) => {
            userMng.activate($scope.users[index], true).then( users => {
                $scope.init();
                swal('User activated');
            }).catch( err => console.log(err) );
        }

        $scope.gotoUser = function(index){
            global.searchUser = $scope.users[index];
            $scope.$applyAsync( () => {
                $rootScope.current = 'main'
            });
            $state.go('main');
        };

        $rootScope.$on('add-points', (event, data) => {
            let updatedUser = data.user;
            $scope.users.forEach( (user) => {
                if (user._id === updatedUser._id) {
                    user.points = updatedUser.points;
                }
            })
        });
        $scope.points = (index) => {
            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'addPointsModal.html',
                controller: 'addPointsCtrl',
                size: undefined,
                appendTo: undefined,
                resolve: {
                    user:$scope.users[index]
                }
            });
            $scope.modalInstance.result.then(function (selectedItem) {
                $scope.init();
            }, function () {

            });

        }

    }
]);