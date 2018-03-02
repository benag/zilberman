angular.module('ganim').controller('topNavCtrl', ['$scope', '$stateParams', '$location', '$state', 'global',
    function($scope, $stateParams, $location, $state, global) {

        $scope.isMobile = () => {
            return window.innerWidth < 600
            //return window.screen.width < 800;
        }
        $scope.user = global.getUser();
        $scope.msgText = 'ניהול משתמשים';
        $scope.msgText1 = 'הפניות קיימות בסניף';
        $scope.msgText2 = 'הפניות קיימות בחברה';

        $scope.shoeMng = () => {
            if (window.innerWidth < 600){
                $scope.mngText = 'ניהול';
                $scope.msgText2 = 'הפניות בחברה';
                $scope.msgText1 = 'הפניות בסניף';
            } 
            if (window.innerWidth > 600){
                $scope.mngText = 'ניהול משתמשים';
                $scope.msgText1 = 'הפניות קיימות בסניף';
                $scope.msgText2 = 'הפניות קיימות בחברה';
            } 
            return true;
        }
        $scope.state = (state) => {
            console.log($state.current);
            if (state === 'newentry') global.resetProduct();
            if (state === 'login') global.resetUser();
            $state.go(state,{},{ reload: true });
        };

        $scope.ifstate = (state) => {
            return (window.location.href.indexOf(state) !== -1);

        }


    }
]);