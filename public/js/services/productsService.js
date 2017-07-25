angular.module('ganim').factory('productsService',function($state, $timeout, $location, $http){
    return {

        updateProducts: function(){

        },
        updateProduct: function(product){
            $http.put('/products',{product:product})
            .then(function(data)=>{
                return data.data.payload;
            })
        }


    }


});

