

angular.module('ganim').factory('projectMng',function($state, $timeout, $location, $http){

    return {

        projects:[],

        data:{projectBtnText: 'Upload Project'},

        current: undefined,

        getCurrentProject: function(){
            if (this.current === undefined){
                return false;
              //this.projects.push({name:''});
              //  this.current = 0;
            }
            return this.projects[this.current];
        },

        GetCurrentIndex: function(){
            return (this.current);
        },

        setCurrentProjectIndex: function(number){
            if (number  === undefined) this.current = undefined;
            this.current = number-1;
        },


        getProjects: function(){
            return this.projects;
        },

        setProjects: function(projects){
            this.projects = projects;
            (this.projects.length >0) ? this.setCurrentProjectIndex(1) : this.setCurrentProjectIndex(undefined);
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
                return this.uploadNewProject(id, project);
            }else {
                return this.updateProject();
            }
        },
        getLastProject: function(){
            return this.projects.pop();
        },

        removeLastProject: function(){
            this.projects.pop();
            if (this.current) this.current--;
        },

        createEmptyProject: function() {

            if (isNaN(this.current)) this.current =undefined;
            this.projects.push({});
            (this.current === undefined) ? this.current = 0 : this.current++;
        },

        reset: function() {
            this.projects = [];
            this.current = undefined;
        },

        uploadNewProject: function(id, project){
            var t = this;
            return $http.post('/project/' + id , {project:project})
                .then(function(data){
                    t.setProjects(data.data.payload.projects);
                    return true;
                    //alert("Project was Added");
                })
        },

        updateProject: function(){
            return $http.put('/project/', {project:this.projects[this.current]})
                .then(function(project){
                    //this.setEditMode();
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

