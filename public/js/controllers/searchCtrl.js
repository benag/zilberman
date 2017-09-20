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
        $scope.gotoUser = function(index){
            global.searchUser = $scope.users[index];
            $state.go('main');
        }

    }
]);