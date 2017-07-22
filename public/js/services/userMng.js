angular.module('ganim').factory('userMng',function($state, $timeout, $location, $http){

    return {

        user:{},

        projects:[{}],

        newProject:{},

        data:{projectBtnText: 'Upload Project'},

        current: 0,

        newProjectMode:false,

        newUserMode: false,

        scope:{},


        init : function(scope){
            this.scope = scope;
        },

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

        getUsers: function(page, limit){
            return $http.get('/users/' +page + '/' + limit)
            .then(function(data){
                return data.data.payload;
            });
        },

        getProjects: function(){
            return this.projects;
        },

        setProjects: function(projects){
            this.projects = projects;
            this.current = 0;
        },

        setUser: function(user){
            this.user = user;
            this.projects = user.projects;

        },

        setEditMode: function(){
            this.newProjectMode = false;
            this.newUserMode = false;
            this.data.projectBtnText = 'Update Project';
        },

        setNewMode: function(){
            this.newProjectMode = true;
            this.newUserMode = true;
            this.data.projectBtnText = 'Upload Project';
        },
        isNewProjectMode:  function(){
            return this.newProjectMode;
        },
        setMode: function(mode){
            this.newProjectMode = mode;
        },

        setProjectImg: function(url){
            if (this.isNewProjectMode()){  this.newProject.img = url; } else{
                this.projects[this.current].img = url;
            }
        },
        setNewProject: function(){
            this.newProject = {};
            this.newProjectMode = true;
            this.data.projectBtnText = 'Upload Project';
        },

        getNewProject: function(){
            return this.newProject;
        },

        removeProject: function(){
            this.projects.pop();
            this.current--;
        },

        reset: function(){
            this.user = {};
            this.projects =[{}];
            this.current = 0;
        },
        uploadNewProject: function(id){
            var t = this;
            $http.post('/project/' + id , {project:this.newProject})
            .then(function(data){
                t.setEditMode();
                t.setProjects(data.data.payload.projects);
                swal("Project was Added");
                //alert("Project was Added");
            })
        },

        updateProject: function(){
            return $http.put('/project/', {project:this.projects[this.current]})
            .then(function(project){
                this.setEditMode();
                swal("Project was Updated");
                //alert("Project was Updated");

            })
        },

        removerProject:function(index){
            return $http.put('/project/delete/:userId/projectId')
            .then(function(project){
                swal("Project was Removed");
                //alert("Project was Removed");
            })
        },

        processProject: function(id){
          this.isNewProjectMode() ? this.uploadNewProject(id) : this.updateProject();
        }



    }


});

