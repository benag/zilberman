
angular.module('ganim').factory('productsService',function($state, $timeout, $location, $http, $rootScope){
    return {

        updateProducts: function(){

        },
        addSubProduct: function(product, subProduct){
            return $http.put('/products/product',{product:product, subProduct:subProduct})
            .then(function(data){
                return data.data;
            }).catch(function(err){

            })
        },
        removeSubProduct: (product, subProduct) => {
            return $http.put('/products/product/remove',{product:product, subProduct:subProduct})
                .then(function(data){
                    return data.data;
                }).catch(function(err){
                    console.log(err);
                })
        },

        remove: function(product){
            return $http.post('/products/delete',{product:product})
            .then(function(data){
                return data.data.payload;
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

