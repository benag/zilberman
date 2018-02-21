angular.module('ganim').controller('usersCtrl', ['$scope', '$stateParams', '$location', '$state','$http',
    function($scope, $stateParams, $location, $state, $http) {

        $scope.loading = true;
        $scope.phone = ''
        $http.get('/users').then((data) => {
            $scope.loading = false;
            $scope.users = data.data;
            $scope.users.forEach((user) => {
                user.uRole = String(user.uRole);
                user.name = user.uName + ' ' + user.uFamily;
                user.uStatus = String(user.uStatus);
            })
            console.log($scope.users);
        })

        $scope.upadte = (index) =>{
            // $http.post('/user/update', $scope.usersp[index])
            // .then(() =>{
            //     toastr.info('משתמש עודכן');
            // }).catch( (err) => {
            //     toastr.error('תקלה בעדכון משתמש');
            // })
        }
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