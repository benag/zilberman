angular.module('ganim').controller('searchCtrl', ['$scope', '$stateParams', '$location', '$state', '$http', 'global', 'userMng','$http',
    '$rootScope', function($scope, $stateParams, $location, $state, $http, global, userMng, $rootScope, $http) {

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
            if (_this.searchUserParam.length > 2) {
                userMng.getUsersByFilter(_this.searchParam, _this.searchUserParam, 'multiple').then( users => {
                    $scope.users = users.data;
                    _this.currentShown = _this.users.length;
                })
            }
        };

        $scope.remove = function(index){
            userMng.removeUser($scope.users[index]._id).then( function(){
                swal('User deleted');
                $scope.init()
            }).catch(function (err){swal('Error: contact admin')});
        }

        $scope.activate = (index) => {
            userMng.activate($scope.users[index]).then( users => {
                $scope.init();
                swal('User activated');
            }).catch( err => console.log(err) );
        }

        $scope.gotoUser = function(index){
            global.searchUser = $scope.users[index];
            $rootScope.current = 'main'
            $state.go('main');
        }

    }
]);