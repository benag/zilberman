angular.module('ganim').factory('global',function($state, $timeout, $location, $q){
    return {

       user:{},

       token:'',

       getMachine: function(){
           return $location.host() + ':' + $location.port();
       },
       getUserData: function() {
           if (!this.user || !this.user.firstName){
               let user = window.localStorage.getItem("user");
               if (!user) return undefined;
               this.user = JSON.parse(user);
           }
           return this.user;
       },

       getTokenData: function() {
           return window.localStorage.getItem("ganimToken");
       },

       logOutUser: () => {
           window.localStorage.setItem("user", '');
           window.localStorage.setItem("ganimToken", '');
           this.user = {};
           this.token  = '';
       },
       setUserData: function(userData) {
           window.localStorage.setItem("user", JSON.stringify(userData.user));
           window.localStorage.setItem("ganimToken", JSON.stringify(userData.token));
           this.user = userData.user;
           this.token  = userData.token;
       },

       uploadFiles: function(file, errFiles, path) {

           return $q(function (resolve, reject) {
               if (file) {
                   let url = 'http://' + global.getMachine() + '/' + path;
                   file.upload = Upload.upload({
                       url: url,
                       data: {file: file}
                   });

                   file.upload.then(function (response) {
                       resolve(response.data.payload);
                   }, function (response) {
                       if (response.status > 0) reject(response.data);
                   }, function (evt) {
                   });
               }
           })
       }

    };

});

