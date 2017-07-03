angular.module('ganim').controller('mainCtrl', ['$scope', '$stateParams', '$location','$http', 'Upload','global',
    function($scope, $stateParams, $location,$http, Upload, global) {

        // get first 5
        $scope.page = 0;
        $scope.limit = 5;
        $scope.currentUser = 3;
        $scope.users = [{},{},{},{},{}];
        $scope.newUser = {};
        $scope.newProject= {};
        $scope.mode = 'Edit User';


        $scope.insertUser = function(){

            $scope.currentUser = 0;
            $scope.mode = 'Insert User';

        };

        $scope.submitUser = function(){
            console.log($scope.users[0]);
            $http.post('/user',{user: $scope.users[$scope.currentUser]})
            .then(function(){
                alert('users added');
            })
        };

        $scope.uploadFiles = function(file, errFiles) {
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: 'http://localhost:4000/profile',
                    data: {file: file}
                });

                file.upload.then(function (response) {
                   $scope.users[$scope.currentUser].img = 'http://' + global.getMachine() + '/' + response.data.payload

                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }
        }


        $http.get('/users/'+$scope.page + '/' + $scope.limit, function(users){
            $scope.users = users;
            if (users.length < 5){
                var length = users.length;
                for (var i = 0; i < 5 - length; i++){
                    $scope.users.push(
                        {

                        }
                    )
                }
            }


        });

    }
]);