angular.module('ganim').factory('httpService',function($state, $timeout, $http, global,  $location){
    return {
  
      get: function(url) {
  
        let req = {
            method: 'GET',
            headers : {
              Authorization: global.getToken()
            },
            url: url
          };

        return $http(req)
          .then(function(data){
            return data.data;
          }).catch(function(err){
            console.log(err);
            if (err.data === 'Unauthorized') $state.go('login');
          })
      },
  
      post: function(url, data, headers) {
  
        let req = {
          method: 'POST',
          headers : {
            Authorization: global.getToken()
          },
          url: url
        };
  
        if (headers) req.headers = headers;
        if (data) req.data =data;
  
        return $http(req)
        .then(function(data){
          return data.data;
        }).catch(function(err){
          console.log(err);
          if (err.data === 'Unauthorized') $state.go('login');
          //throw err;
        })
      }
    }
  
  });
  
  