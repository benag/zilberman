angular.module('ganim').controller('leftPaneController', ['$scope', '$stateParams', '$location', '$state', 'global', '$rootScope','Upload',
    function($scope, $stateParams, $location, $state, global, $rootScope, Upload) {

        $scope.user = {};
        $scope.user.name = global.user.firstName;
        $scope.user.img = global.user.img;


        $rootScope.showLeftPane = true;

        $scope.goto = function(state){
            global.searchUser = undefined;
            $rootScope.current = state;
            $state.go(state,null,{ reload: true });
        };


        $scope.adminImg = (file, errFiles) => {
            if (file) {
                let url = 'http://' + global.getMachine() + '/admin-image';
                file.upload = Upload.upload({ url: url, data: {file: file, user:global.getUserData()} });

                let success = (res) => {
                    global.user.img = res.data;
                    $scope.user.img = global.user.img;
                };
                let error = () => {};
                let event = () => {};

                file.upload.then(success,error, event);
            }
        };

        $scope.isActive = function(menu){
            if (menu === $rootScope.current){
                return true;
            }else{
                return false;
            }
        };
    }
]);