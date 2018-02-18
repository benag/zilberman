angular.module('ganim').controller('usersCtrl', ['$scope', '$stateParams', '$location', '$state','$http',
    function($scope, $stateParams, $location, $state, $http) {

        $scope.loading = true;

        $http.get('/users').then((data) => {
            $scope.users = data.data;
        })

        $scope.sendLink = function(phone) {
            $http.post('/user/link',{phone:phone})
            .then( () => {
                toastr.info('לינק נשלח');
            })
        }


    }
]);