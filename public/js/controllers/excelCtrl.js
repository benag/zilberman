angular.module('ganim').controller('excelCtrl', ['$scope', '$stateParams', '$location', '$state','$http', 'Upload', 'global',
    function($scope, $stateParams, $location, $state, $http, global) {
        $scope.upload = function(file, files) {
            global.uploadFiles(file, files).then(function(res){
                swal('Excel Uploaded');
            })
        }

    }
]);