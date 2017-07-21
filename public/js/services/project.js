angular.module('ganim').factory('projectMng',function($state, $timeout, $location){
    return {

        user:{},

        projects:[{}],

        newProject:{},

        current: 0,

        newProjectMode:false,

        getCurrentProject: function(){
            if (this.newProjectMode) return this.newProject;
            return this.projects[this.current];
        },
        GetCurrentIndex: function(){
          return (this.current +1);
        },
        setCurrentProject: function(number){
            this.current = number-1;
        },
        getUser: function(){
            return this.user;
        },

        getProjects: function(){
            return this.projects;
        },

        setUser: function(user){
            this.user = user;
            this.projects = user.projects;

        },
        setMode: function(newProject){
            this.newProjectMode = newProject;
        },

        setNewProject: function(){
            this.newProject = {};
            this.newProjectMode = true;
        },
        getNewProject: function(){
            return this.newProject;
        },

        removeProject: function(){
            this.projects.pop();
            this.current--;
        }





    }


});

