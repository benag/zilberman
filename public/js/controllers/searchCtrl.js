angular.module('ganim').controller('searchCtrl', ['$scope', '$stateParams', '$location', '$state', '$http', 'global', 'userMng',
    function($scope, $stateParams, $location, $state, $http, global, userMng) {

        _this = $scope;
        $scope.sortType = '';
        $scope.reverseCompany = false;
        $scope.reverseFirst = false;
        $scope.reverseLast = false;
        $scope.reversePoints = false;
        $scope.page = 0;
        $scope.limit =50;
        $scope.currentShown = 0;


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
            userMng.getUsers(_this.page, _this.limit).then ( (users) => {
                $scope.users = users.payload;
                _this.currentShown = _this.users.length;
            })

        }

        $scope.byCompany = () =>{

        };

        $scope.byName = () => {

        };
        $scope.remove = function(index){
            userMng.removeUser($scope.users[index]._id).then( function(){
                swal('User deleted');
                $scope.init()
            }).catch(function (err){swal('Error: contact admin')});
        }

        $scope.gotoUser = function(index){
            global.searchUser = $scope.users[index];
            $state.go('main');
        }

    }
]);