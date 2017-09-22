

angular.module('ganim').factory('projectMng',function($state, $timeout, $location, $http){

    return {

        projects:[],

        data:{projectBtnText: 'Upload Project'},

        current: undefined,



        getCurrentProject: function(){
            if (this.current === undefined) return false;
            return this.projects[this.current];
        },

        GetCurrentIndex: function(){
            return (this.current);
        },

        setCurrentProject: function(number){
            this.current = number;
        },


        getProjects: function(){
            return this.projects;
        },

        setProjects: function(projects){
            this.projects = projects;
            this.current = 0;
        },

        setProjectImg: function(url){
            this.projects[this.current].img = url;

        },
        setNewProject: function(project){
            this.projects.push(project);
            this.current = this.projects.length;

        },
        uploadProject: function(id){
            var project = this.projects[this.current];
            if (!project._id) {
                this.uploadNewProject(id);
            }else {
                this.updateProject();
            }
        },
        getLastProject: function(){
            return this.projects.pop();
        },

        removeLastProject: function(){
            this.projects.pop();
            this.current--;
        },

        createEmptyProject: function() {
            this.projects.push({});
            this.current = 0;
        },

        reset: function() {
            this.projects = [];
            this.current = undefined;
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
        }

    }


});

