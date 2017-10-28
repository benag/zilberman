
angular.module('ganim').factory('orderService',function($state, $timeout, $location, $http, $rootScope, userMng){
    return {


        orderProduct: async (phone, category, product, identifyBy) => {
            let user;
            if (identifyBy === 'phone'){
                user = (await userMng.getUserByPhone(phone)).data;
            }

            let orders = [{
                categoryId: category._id,
                productId: product._id
            }];

            return $http.post('/order/process',{ user:user , orders:product, total:product.price })
            .then(function(data){
                return data.data;
            }).catch(function(err){
                swal('There was a problem with your order, Please contact support')

            })
        },

        getOrders: async () => {
            try {

                let orders = await $http.get('/orders');
                return orders;

            }catch(err) {

            }
        }

    }




});

