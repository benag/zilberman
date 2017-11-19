angular.module('ganim').factory('professionService',function($state, $timeout, $http,  $location){
    let professionService = {};

    professionService.professions =[];

    professionService.getProfessions = () => {
        return $http.get('/professions');
    };

    professionService.loadProfessions = async () => {
        professionService.professions = (await professionService.getProfessions()).data;
    }

    return professionService;
});

