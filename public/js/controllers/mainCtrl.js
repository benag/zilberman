angular.module('ganim').controller('mainCtrl', ['$scope', '$stateParams', '$location','$http', 'Upload','global', 'userMng',
    function($scope, $stateParams, $location,$http, Upload, global, userMng) {


        var s = $scope;
        $scope.mode = 'Insert User';
        $scope.state='newUser';

        $scope.user = {};

        $scope.userMng = userMng;

        $scope.projectText = $scope.userMng.data.projectBtnText;

        $scope.$watch('userMng.data.projectBtnText', function(){
            $scope.projectText = $scope.userMng.data.projectBtnText;
        });

        $scope.init = function(){
            $scope.userMng.reset();
            if (global.searchUser){
                $scope.user = global.searchUser;
                if ($scope.user.birthday) $scope.user.birthday = new Date($scope.user.birthday);

                $scope.mode = 'Edit User';
                $scope.userMng.setUser($scope.user);
                $scope.userMng.setEditMode();

            }else{
                $scope.user ={};
                $scope.mode = 'Insert User';

            }

        };
        $scope.isExist = function(number){
            var numOfProjects = $scope.userMng.getProjects().length;
            return number <= numOfProjects;

        }
        $scope.isActive = function(number){
            return number === $scope.userMng.GetCurrentIndex();
        }
        $scope.load = function(number){
            if (number > $scope.userMng.getProjects().length) return;
            $scope.userMng.setCurrentProject(number);
        }

        $scope.newProject = function(){
            $scope.userMng.setNewProject();
        }

        $scope.getProjectText = function(){

            if (userMng.isNewProjectMode) return 'Upload Project';
            return 'Update Project';
        }

        $scope.updateMaps = function(){
            var project = $scope.userMng.getCurrentProject();
            $scope.setMaps({lat:project.lat,lng:project.lng});
        }

        $scope.setMaps = function(pos){

            var myLatlng;
            pos ? myLatlng = new google.maps.LatLng(pos.lat, pos.lng) : new google.maps.LatLng(40.748817, -73.985428);
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


        $scope.processProject = function(){
            $scope.userMng.processProject($scope.user._id);
        };

        $scope.submitUser = function(){
            if ($scope.mode === 'Edit User'){
                $http.put('/user',{user: $scope.user})
                .then(function(user){
                    swal("Member Updated");
                    $scope.mode = 'Edit User';
                });
            }else{
                $http.post('/user',{user: $scope.user})
                .then(function(data){
                    swal("Member Added");
                    $scope.user = data.data.payload;
                    $scope.userMng.setNewProject();
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

        $scope.uploadProjectImg = function(file, errFiles){
            if (file) {
                let url = 'http://' + global.getMachine() + '/projectimage';
                file.upload = Upload.upload({
                    url: url,
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    $scope.userMng.setProjectImg('http://' + global.getMachine() + '/' + response.data.payload);

                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }

        }
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