angular.module('ganim').factory('eventsService',function($state, $timeout, $http,  $location){
    return {

        getEvents: function(room){
            return $http.get('/events/room/' + room._id);
        },
        addEvent: function(userId,start,end,roomId, title) {
            return $http.post('/events',{userId:userId, start:start, end:end, roomId:roomId, title:title})
        },
        getEvent: function(id) {
            return $http.get('/events/' + id);
        },
        removeEvent: function (id) {
            return $http.delete('/events/' + id);
        },
        updateEvent: function (id, userId,start,end,roomId, title) {
            return $http.put('/events/' + id, {userId:userId, start:start, end:end, roomId:roomId, title:title});
        }

    }

});

