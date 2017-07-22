angular.module('ganim').factory('userService',function($state, $timeout, $location, projectMng){
    return {

        user:{},

        NewUserMode:false,

        newUser:{},


        getAllUsers: function(){

        },

        getProjects: function(){

        },

        getUserByPageLimit: function(){

        },
        loadUser: function(user){
            this.user = user;
        },

        searchUser:{}


    }


});

