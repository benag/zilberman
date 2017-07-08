angular.module('ganim').controller('searchCtrl', ['$scope', '$stateParams', '$location', '$state', '$http', 'global',
    function($scope, $stateParams, $location, $state, $http, global) {

        $scope.page = 0;
        $scope.limit =100;
        $scope.init = function(){
            $http.get('/users/' + $scope.page + '/' + $scope.limit)
            .then(function(data){
                $scope.users = data.data.payload;
            });
        };
        $scope.gotoUser = function(index){
            global.searchUser = $scope.users[index];
            $state.go('main');
        }

    }
]);