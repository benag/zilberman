angular.module('ganim').controller('usersCtrl', ['$scope', '$stateParams', '$location', '$state','$http',
    function($scope, $stateParams, $location, $state, $http) {

        $scope.loading = true;
        $scope.phone = ''
        $http.get('/users').then((data) => {
            $scope.users = data.data;
        })

        $scope.sendLink = function(phone) {
            $http.post('/user/link',{phone:$scope.phone})
            .then( (data) => {
                toastr.info('לינק נשלח');
            }).catch( (err) => {
                toastr.error('תקלה בשליחת סמס');
            })
        
        }


    }
]);