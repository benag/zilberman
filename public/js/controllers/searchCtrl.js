angular.module('ganim').controller('searchCtrl', ['$scope', '$stateParams', '$location', '$state', '$http', 'global', 'userMng',
    function($scope, $stateParams, $location, $state, $http, global, userMng) {

        s = $scope;
        $scope.sortType = '';
        $scope.reverseCompany = false;
        $scope.reverseFirst = false;
        $scope.reverseLast = false;
        $scope.reversePoints = false;
        $scope.page = 0;
        $scope.limit =100;


        $scope.init = function(){
            userMng.getUsers(s.page,s.limit).then (function(users){ $scope.users = users;})
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