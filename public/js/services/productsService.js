
angular.module('ganim').factory('productsService',function($state, $timeout, $location, $http, $rootScope){
    return {

        updateProducts: function(){

        },
        addSubProduct: function(product){
            return $http.put('/products',{product:product})
            .then(function(data){
                return data.data;
            }).catch(function(err){

            })
        },
        updateProduct: function(product){
            return $http.put('/products',{product:product})
            .then(function(data){
                return data.data.payload;
            })
        },
        createProduct: function(product){
            return $http.post('/products',{product:product})
            .then(function(data){
                return data.data;
            })
        }


    }


});

