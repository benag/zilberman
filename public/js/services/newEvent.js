angular.module('ganim').factory('leadService',function($state, $timeout, $location, $q){
    let leadService = {};
    leadService.save = (form) => {
        return $http.post('/save', {form})
    };

    return leadService;

});

