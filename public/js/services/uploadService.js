angular.module('ganim').factory('uploadService',function($state, $timeout, $location, global, Upload, $q){
    return {

      uploadFiles: function(file, errFiles){
          var deferred = $q.deferred;
          if (file) {
              let url = 'http://' + global.getMachine() + '/profile';
              file.upload = Upload.upload({
                  url: url,
                  data: {file: file}
              });

              file.upload.then(function (response) {
                  //$scope.users[$scope.currentUser].img = 'http://' + global.getMachine() + '/' + response.data.payload
                  deferred.resolve('http://' + global.getMachine() + '/' + response.data.payload);
              }, function (response) {
                  if (response.status > 0)
                      $scope.errorMsg = response.status + ': ' + response.data;
              }, function (evt) {
                  file.progress = Math.min(100, parseInt(100.0 *
                      evt.loaded / evt.total));
              });
          }
          return deferred;
      }
    }


});

