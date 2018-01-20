


angular.module('ganim').factory('userMng',function($state, $timeout, $location, $http, global){

    return {

        user:{},
        scope:{},

        init : function(scope){
            this.scope = scope;
        },

        getUsersByFilter: (by, filter, multiple) => {
            return $http.get('/user/'+by+'/'+filter + '/' + multiple)
        },


        GetCurrentIndex: function(){
          return projectMng.GetCurrentIndex();
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


        setUser: function(user){
            this.user = user;
            projectMng.setProjects(user.projects);

        },



        activate: (user, activate) => {
            return $http.post('/user/activate', { id: user._id, activate:activate })
        }


    }

});

