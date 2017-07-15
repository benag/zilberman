angular.module('ganim').factory('projectMng',function($state, $timeout, $location){
    return {

        user:{},

        projects:[{}],

        current: 0,

        getCurrentProject: function(){
            return this.projects[this.current];
        },
        getUser: function(){
            return this.user;
        },

        setUser: function(){
            return this.user;
        },

        newProject: function(){
            this.projects.push({});
            this.current++;
        },

        removeProject: function(){
            this.projects.pop();
            this.current--;
        }





    }


});

