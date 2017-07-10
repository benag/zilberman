angular.module('ganim').controller('mainCtrl', ['$scope', '$stateParams', '$location','$http', 'Upload','global',
    function($scope, $stateParams, $location,$http, Upload, global) {


        $scope.currentUser = 0;
        $scope.currentProject = 0;
        $scope.mode = 'Insert User';
        $scope.state='newUser';
        $scope.projectMode = ''


        $scope.userMng = {
            users:[{}],
            newUser:[{}]
        };


        $scope.init = function(){
            if (global.searchUser){
                $scope.userMng.users = [global.searchUser];
                $scope.currentUser = 0;
                $scope.mode = 'Edit User';
                $scope.state='users';
            }else{
                $scope.currentUser = 0;
                $scope.userMng.newUser =[{}];
                $scope.mode = 'Insert User';
                $scope.state = 'newUser';

            }

        };

        $scope.setMaps = function(){
            var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
            var mapOptions = {
                zoom: 8,
                center: myLatlng,
                scrollwheel: false //we disable de scroll over the map, it is a really annoing when you scroll through page
            }

            var map = new google.maps.Map(document.getElementById("regularMap"), mapOptions);

            var marker = new google.maps.Marker({
                position: myLatlng,
                title:"Regular Map!"
            });

            marker.setMap(map);
        }


        $scope.insertProject = function(){
            $scope.projectMode = 'Add Project';
            $scope.projectState = 'newProject';
            $scope.currentProject = 0;

        };

        $scope.submitProject = function(){
            $http.post('/project/' + $scope.userMng.users[$scope.currentUser]._id , {project:$scope.userMng.users[0].projects[0]})
            .then(function(project){
                alert('project added');
            })
        };

        $scope.submitUser = function(){
            if ($scope.mode === 'Edit User'){
                $http.put('/user',{user: $scope.userMng.users[0]})
                .then(function(user){
                    alert('user updated');
                    $scope.mode = 'Edit User';
                    $scope.state = 'users';
                });
            }else{
                $http.post('/user',{user: $scope.userMng.newUser[0]})
                .then(function(data){
                    alert('users added');
                    $scope.userMng.users[0] = data.data.payload;
                    $scope.currentUser = 0;
                    $scope.currentProject = 0;
                    $scope.userMng.users[0].projects = [{}];
                    $scope.mode = 'Edit User';
                    $scope.state = 'users';

                });
            }

        };

        $scope.setProfession = function(){
            return $scope.userMng[$scope.state][$scope.currentUser].profession ? $scope.userMng[$scope.state][$scope.currentUser].profession : 'Architect'
        };
        $scope.getType = function(){
            return $scope.userMng[$scope.state][$scope.currentUser].type ? $scope.userMng[$scope.state][$scope.currentUser].type: 'Offices';
        };
        $scope.getGender = function(){
            return $scope.userMng[$scope.state][$scope.currentUser].gender ? $scope.userMng[$scope.state][$scope.currentUser].gender: 'Male';
        }
        $scope.uploadFiles = function(file, errFiles) {
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                let url = 'http://' + global.getMachine() + '/profile';
                file.upload = Upload.upload({
                    url: url,
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
        $scope.uploadMaps = function(file, errFiles) {
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: 'http://' + global.getMachine() + '/map',
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    //$scope.users[$scope.currentUser].img = 'http://' + global.getMachine() + '/' + response.data.payload
                    $scope.userMng[$scope.state][$scope.currentUser].projects[currentProject].img = 'http://' + global.getMachine() + '/' + response.data.payload

                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }
        };




    }
]);