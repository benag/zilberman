angular.module('ganim').controller(
    'addPointsCtrl', function ($uibModalInstance, $http, $scope, $rootScope, user) {

        $scope.user = user;
        $scope.num = '';
        $scope.amount = 0;
        $scope.checked = {};
        $scope.checked.twoAndHalf = false;
        $scope.checked.five = false;
        $scope.checked.seven = false;
        $scope.sum = 0;



        $scope.cancel = () => {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.calculate = (percentage) => {
            $scope.sum = Math.floor($scope.amount*(percentage/100));
        }

        $scope.add = () => {
            $http.post('/points', {sum: $scope.sum, user: $scope.user})
            .then( (user) => {
                $rootScope.$broadcast('add-points', {user: user.config.data.user});
                $uibModalInstance.dismiss('cancel');
            }).catch(err => console.log(err))

        }


    });