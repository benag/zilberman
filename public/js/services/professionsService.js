angular.module('ganim').factory('professionalService',function($state, $timeout, $http,  $location){
    return {

        professions:[],
        getProfessions: () => {
            return $http.get('/professions');
        },
        loadProfessions: async () => {
            this.professions = await this.getProfessions();
        }


    }

});

