angular.module('ganim').factory('authService',function($state, $timeout, $location, $q, $httpt){
    return {

        login: (id, pass) => {
            return $http.post('/login',{id,pass});
        }

    };

});

