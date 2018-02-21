angular.module('ganim').controller('usersCtrl', ['$scope', '$stateParams', '$location', '$state','httpService',
    function($scope, $stateParams, $location, $state, httpService) {

        $scope.loading = true;
        $scope.phone = ''
        httpService.get('/users').then((data) => {
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
            httpService.post('/user/update', $scope.user[index])
            .then(() =>{
                toastr.info('משתמש עודכן');
            }).catch( (err) => {
                toastr.error('תקלה בעדכון משתמש');
            })
        }
        $scope.sendLink = function(phone) {
            httpService.post('/user/link',{phone:$scope.phone})
            .then( (data) => {
                toastr.info('לינק נשלח');
            }).catch( (err) => {
                toastr.error('תקלה בשליחת סמס');
            })
        
        }


    }
]);