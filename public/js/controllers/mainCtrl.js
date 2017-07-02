angular.module('ganim').controller('mainCtrl', ['$scope', '$stateParams', '$location','$http',
    function($scope, $stateParams, $location,$http) {

        // get first 5
        $scope.page = 0;
        $scope.limit = 5;

        $scope.users = [];
        $scope.newUser = {};
        $scope.newProject= {};

        $http.get('/users/'+$scope.page + '/' + $scope.limit, function(){

        });

        $scope.selectClient = function(){
            return true;
        }
    }
]);