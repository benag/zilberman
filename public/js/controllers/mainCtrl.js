angular.module('ganim').controller('mainCtrl', ['$scope', '$stateParams', '$location','$http',
    function($scope, $stateParams, $location,$http) {

        // get first 5
        $scope.page = 0;
        $scope.limit = 5;
        $scope.currentUser = 3;
        $scope.users = [];
        $scope.newUser = {};
        $scope.newProject= {};

        $http.get('/users/'+$scope.page + '/' + $scope.limit, function(users){
            $scope.users = users;
            if (users.length < 5){
                var length = users.length;
                for (var i = 0; i < 5 - length; i++){
                    $scope.users.push(
                        {

                        }
                    )
                }
            }


        });

        $scope.addUser = function(){
            $scope.currentUser = 6;

        }
    }
]);