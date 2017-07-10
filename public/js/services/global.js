angular.module('ganim').factory('global',function($state, $timeout, $location){
    return {

       user:{},
       getMachine: function(){
           return $location.host() + ':' + $location.port();
       },
       searchUser:undefined


    }


});

