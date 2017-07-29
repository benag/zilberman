
angular.module('ganim').factory('orderService',function($state, $timeout, $location, $http, $rootScope){
    return {


        orderProduct: function(byWhom, product, identifyBy){
            return $http.post('/orders',{user:byWhom , product:product, identify:identifyBy})
            .then(function(data){
                return data.data;
            }).catch(function(err){

            })
        }

    }


});

