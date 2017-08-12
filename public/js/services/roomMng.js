angular.module('ganim').factory('roomMng',function($state, $timeout, $location, $http){

    return {

        getRooms: function(){
           return $http.get('/rooms')
        }




    }


});

