angular.module('ganim').factory('leadService',function($state, $timeout, $location, $q, $http){
    let leadService = {};
    leadService.save = (form, isNew) => {
        return $http.post('/save', {form:form,new:isNew })
    };

    return leadService;

});

