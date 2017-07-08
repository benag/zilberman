angular.module('ganim').controller('mainCtrl', ['$scope', '$stateParams', '$location','$http', 'Upload','global',
    function($scope, $stateParams, $location,$http, Upload, global) {

        // get first 5
        //$scope.page = 0;
        //$scope.limit = 5;

        //$scope.newUser = {};
        $scope.currentUser = 0;
        $scope.currentProject = 0;
        $scope.mode = 'Insert User';
        $scope.state='users';
        $scope.projectState = 'projects';
        $scope.projectMode = 'Update Project';
        $scope.userMng = {
            users:[{},{},{},{},{}],
            newUser:[{}]
        };
        $scope.projectMng = {
            projects:[{},{},{},{},{}],
            newProject:[{}]
        };



        $scope.init = function(){
            if (global.searchUser){
                $scope.userMng.users = [global.searchUser];
                $scope.currentUser = 0;
            }else{
                $scope.currentUser = 0;
                $scope.userMng.newUser =[{}];
                $scope.mode = 'Insert User';
                $scope.state = 'newUser';


                //$http.get('/users/' + $scope.page + '/' + $scope.limit)
                //.then(function(data){
                //    $scope.userMng.users = data.data.payload;
                //    $scope.currentUser = 0;
                //});
            }

        };


        //$scope.loadNext = function(){
        //    $scope.page++;
        //    $http.get('/users/' + $scope.page + '/' + $scope.limit)
        //    .then(function(data){
        //        $scope.userMng.users = data.data.payload;
        //        $scope.currentUser = 0;
        //    });
        //
        //};
        //
        //$scope.loadBack = function(){
        //    $scope.page--;
        //    $http.get('/users/' + $scope.page + '/' + $scope.limit)
        //    .then(function(data){
        //        $scope.userMng.users = data.data.payload;
        //        $scope.currentUser = 0;
        //    });
        //};

        $scope.insertProject = function(){
            $scope.projectMode = 'Add Project';
            $scope.projectState = 'newProject';
            $scope.currentProject = 0;

        };

        $scope.submitProject = function(){
            $http.post('/project/' + $scope.userMng.users[$scope.currentUser]._id , {project:$scope.projectMng.newProject[0]})
        };


        $scope.insertUser = function(){

            $scope.currentUser = 0;
            $scope.mode = 'Insert User';
            $scope.state = 'newUser';

        };

        $scope.submitUser = function(){

            $http.post('/user',{user: $scope.userMng[$scope.state][0]})
            .then(function(){
                alert('users added');
                $scope.mode = 'Edit User';
                $scope.state = 'users';
            });
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
                   //$scope.users[$scope.currentUser].img = 'http://' + global.getMachine() + '/' + response.data.payload
                    $scope.userMng[$scope.state][$scope.currentUser].img = 'http://' + global.getMachine() + '/' + response.data.payload

                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }
        };

        //$scope.options = 'Edit';
        //
        //$scope.setOptions = function(option){
        //    $scope.options = option;
        //};

        //$scope.getPage = function(number){
        //
        //    if(number > $scope.userMng.users.length) return;
        //    $scope.currentUser = number;
        //};
        //
        //$scope.disabled = function(number){
        //    if(number > $scope.userMng.users.length) return true;
        //    return false;
        //};




    }
]);