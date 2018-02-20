angular.module('ganim').controller('topNavCtrl', ['$scope', '$stateParams', '$location', '$state', 'global',
    function($scope, $stateParams, $location, $state, global) {

        $scope.isMobile = () => {
            return window.innerWidth < 600
            //return window.screen.width < 800;
        }
        $scope.mngText= 'ניהול משתמשים';

        $scope.shoeMng = () => {
            if (window.innerWidth < 600) $scope.mngText= 'ניהול' ;
            if (window.innerWidth > 600) $scope.mngText= 'ניהול משתמשים' ;
            return true;
        }
        $scope.state = (state) => {
            console.log($state.current);
            if (state === 'newentry') global.resetUser();
            $state.go(state,{},{ reload: true });
        };

        $scope.ifstate = (state) => {
            return (window.location.href.indexOf(state) !== -1);

        }


    }
]);