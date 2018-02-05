angular.module('ganim').factory('leadService',function($state, $timeout, $location, $q, $http){
    let leadService = {};
    leadService.save = (form) => {
        return $http.post('/save', {form:form})
    };

    return leadService;

});

