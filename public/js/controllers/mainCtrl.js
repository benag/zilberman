angular.module('ganim').controller('mainCtrl', ['$scope', '$stateParams', '$location','$http', 'Upload','global',
    function($scope, $stateParams, $location,$http, Upload, global) {

        // get first 5
        $scope.page = 0;
        $scope.limit = 5;
        $scope.currentUser = 1;
        $scope.users = [{},{},{},{},{}];
        $scope.newUser = {};
        $scope.newProject= {};
        $scope.mode = 'Edit User';
        $scope.projectMode = 'Update Project';
        $scope.project = {};


        $scope.newProject = function(){
            $scope.projectMode = 'Add Project';

        }
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
        };


        $scope.page = function(number){

            if(number > $scope.users.length) return;
            $scope.currentUser = number;
        };

        $scope.disabled = function(number){
            if(number > $scope.users.length) return true;
            return false;
        };

        $scope.addProject = function(){
          $http.post('/project/' + $scope.users[$scope.currentUser]._id , {project:$scope.project})
        };

        $http.get('/users/'+$scope.page + '/' + $scope.limit)
        .then(function(data){
            $scope.users = data.data.payload;
            $scope.currentUser = 1;

        });

    }
]);