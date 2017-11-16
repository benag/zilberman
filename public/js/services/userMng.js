


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

        getUsersByFilter: (by, filter, multiple) => {
            return $http.get('/user/'+by+'/'+filter + '/' + multiple)
        },


        GetCurrentIndex: function(){
          return projectMng.GetCurrentIndex();
        },

        setCurrentProject: function(number){
            projectMng.setCurrentProjectIndex(number);
        },

        getUserByPhone: (phone) => {
            return $http.get('/user/phone/' + phone);
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

        activate: (user, activate) => {
            return $http.post('/user/activate', { id: user._id, activate:activate })
        },

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

