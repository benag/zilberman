angular.module('ganim').controller('mainCtrl', ['$scope', '$stateParams', '$location','$http', 'Upload','global', 'projectMng',
    function($scope, $stateParams, $location,$http, Upload, global, projectMng) {


        $scope.currentProject = 0;
        $scope.mode = 'Insert User';
        $scope.state='newUser';
        $scope.projectMode = '';


        $scope.user = {};

        $scope.projectMng = projectMng;

        $scope.init = function(){
            if (global.searchUser){
                $scope.user = global.searchUser;
                $scope.mode = 'Edit User';
                $scope.projectMng.setUser($scope.user);
            }else{
                $scope.user ={};
                $scope.mode = 'Insert User';
                $scope.projectMng.setUser($scope.user);
            }

        };
        $scope.isActive = function(number){

            return number <= $scope.projectMng.projects.length;

        }
        $scope.newProject = function(){
            $scope.projectMng.newProject();
        }

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
        };


        $scope.insertProject = function(){
            $scope.projectMode = 'Add Project';
            $scope.projectState = 'newProject';
            $scope.currentProject = 0;

        };

        $scope.submitProject = function(){
            $http.post('/project/' + $scope.user._id , {project:$scope.user.projects[0]})
            .then(function(project){
                alert('project added');
            })
        };

        $scope.submitUser = function(){
            if ($scope.mode === 'Edit User'){
                $http.put('/user',{user: $scope.user})
                .then(function(user){
                    alert('Member updated');
                    $scope.mode = 'Edit User';
                });
            }else{
                $http.post('/user',{user: $scope.user})
                .then(function(data){
                    alert('Member added');
                    $scope.user = data.data.payload;
                    $scope.currentProject = 0;
                    $scope.user.projects = [{}];
                    $scope.mode = 'Edit User';
                });
            }

        };

        $scope.setProfession = function(){
            return $scope.user.profession ? $scope.user.profession : 'Architect'
        };
        $scope.getType = function(){
            return $scope.user.type ? $scope.user.type: 'Offices';
        };
        $scope.getGender = function(){
            return $scope.user.gender ? $scope.user.gender: 'Male';
        };
        $scope.uploadFiles = function(file, errFiles) {

            if (file) {
                let url = 'http://' + global.getMachine() + '/profile';
                file.upload = Upload.upload({
                    url: url,
                    data: {file: file}
                });

                file.upload.then(function (response) {
                   //$scope.users[$scope.currentUser].img = 'http://' + global.getMachine() + '/' + response.data.payload
                    $scope.user.img = 'http://' + global.getMachine() + '/' + response.data.payload

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

            if (file) {
                file.upload = Upload.upload({
                    url: 'http://' + global.getMachine() + '/map',
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    //$scope.users[$scope.currentUser].img = 'http://' + global.getMachine() + '/' + response.data.payload
                    $scope.user.projects[currentProject].img = 'http://' + global.getMachine() + '/' + response.data.payload

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