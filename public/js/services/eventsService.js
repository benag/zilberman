angular.module('ganim').factory('eventsService',function($state, $timeout, $http,  $location){
    return {

        getEvents: function(){
            return $http.get('/events');
        },
        addEvent: function(userId,start,end,roomId, title) {
            return $http.post('/events',{userId:userId, start:start, end:end, roomId:roomId, title:title})
        },
        removeEvent: function () {

        }



    }

});

