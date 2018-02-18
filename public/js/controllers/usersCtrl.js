angular.module('ganim').controller('usersCtrl', ['$scope', '$stateParams', '$location', '$state',
    function($scope, $stateParams, $location, $state) {

        $scope.loading = true;

        $http.get('/users').then((data) => {
            $scope.users = data.data;
        })

        $scope.sendLink = function(phone) {

        }


    }
]);