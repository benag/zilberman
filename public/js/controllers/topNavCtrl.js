angular.module('ganim').controller('topNavCtrl', ['$scope', '$stateParams', '$location', '$state',
    function($scope, $stateParams, $location, $state) {

        //et domain = $location.domain();
        //console.log(domain);
        $scope.state = (state) => {
            if (window.location.href.indexOf(state) !== -1){
                window.location.reload()
            }else{
                window.location.href = 'http://18.221.178.131:3000/index.html#!/' + state;
            }

            //$state.go('summery');
        };

        $scope.ifstate = (state) => {
            return (window.location.href.indexOf(state) !== -1);

        }


    }
]);