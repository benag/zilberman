


angular.module('ganim').factory('userMng',function($state, $timeout, $location, $http, global, projectMng){

    return {

        user:{},

        //projects:[],

        data:{projectBtnText: 'Upload Project'},

        scope:{},


        init : function(scope){
            this.scope = scope;
        },

        getCurrentProject: function(){
            return projectMng.getCurrentProject();
        },

        getUserByPhone: (phone) => {
            return $http.get('/user/phone/' + phone);
        },



    GetCurrentIndex: function(){
          return projectMng.GetCurrentIndex();
        },

        setCurrentProject: function(number){
            projectMng.setCurrentProjectIndex(number);
        },

        getUser: function(username, pass){
            return $http.post('/login/',{email:username, password:pass})
            .then(function(data){
                global.setUserData(data.data);
                return data.data;
            });
        },

        getUsers: function(page, limit){
            return $http.get('/users/' +page + '/' + limit)
            .then(function(data){
                return data.data;
            });
        },

        getUsersBy : (by, page, limit) => {
            return $http.get('/users/'+ by + '/' + page + '/' + limit)
        },

        removeUser: function(id){
            return $http.delete('/user/' +id)
        },

        getProjects: function(){
            return projectMng.getProjects();
        },


        setUser: function(user){
            this.user = user;
            projectMng.setProjects(user.projects);

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
            projectMng.setProjectImg(url);
        },
        setNewProject: function(){
            projectMng.createEmptyProject();
            //this.projects.push({});
            //this.current = 0;
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
        //uploadNewProject: function(id){
        //    var t = this;
        //    $http.post('/project/' + id , {project:this.projects[this.projects.length]})
        //    .then(function(data){
        //        //t.setEditMode();
        //        t.setProjects(data.data.payload.projects);
        //        swal("Project was Added");
        //        //alert("Project was Added");
        //    })
        //},
        //
        //updateProject: function(){
        //    return $http.put('/project/', {project:this.projects[this.current]})
        //    .then(function(project){
        //        this.setEditMode();
        //        swal("Project was Updated");
        //        //alert("Project was Updated");
        //
        //    })
        //},

        removerProject:function(index){
            return $http.put('/project/delete/:userId/projectId')
            .then(function(project){
                swal("Project was Removed");
                //alert("Project was Removed");
            })
        },

        processProject: function(id){
            //last project
            projectMng.uploadProject(id)
            .then ((uploaded) => {
                this.data.projectBtnText = 'Update Project';
                swal("Project was Added");
            })

        }

    }

});

