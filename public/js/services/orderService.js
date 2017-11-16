
angular.module('ganim').factory('orderService',function($state, $timeout, $location,global, $http, $rootScope, userMng){
    return {


        orderProduct: async (phone, category, product, identifyBy) => {
            let user;
            if (identifyBy === 'phone'){
                user = (await userMng.getUsersByFilter('phone', phone, 'single')).data;
            }
            if (!user){
                throw Error('Cant found user');
            }
            let orders = [{
                category: category.category,
                title: product.title,
                price: product.price
            }];

            return $http.post('/order/process',{ user:user , orders:orders, total:product.price })
            .then(function(data){
                return data.data;
            }).catch(function(err){
                swal('There was a problem with your order, Please contact support')

            })
        },

        order: function(user) {
            let orders =[];
            let total = 0;
            $rootScope.menus.forEach( (menu) => {
                menu.products.forEach( (product) => {
                    if (product.amount > 0) {
                        total = total + product.amount*product.price;
                        orders.push({
                            productTitle: product.title,
                            productPrice: product.price,
                            categoryId: menu._id,
                            productId: product._id,
                            amount: product.amount
                        })
                    }
                })
            });
            if (total > user.points ) return swal('Not enough points left');
            return $http.post('/order/process', {orders:orders, user:user, total:total});
        },

        getMenu: function(){
            return $http.get('/products')
                .then(function(menus){
                    let items = [];
                    menus = menus.data;
                    menus.forEach(function(menu, index){
                        let item = {_id:menu._id, name:menu.category, img: menu.img, description: menu.description, products:[] };
                        menu.products.forEach((product, index) => {
                            item.products.push({img:product.img, amount:0, title:product.title, _id:product._id,
                                price: product.price, description:product.description });
                        });
                        items.push(item);
                    });
                    return items;
                })
                .catch(function(err){
                    console.log(err);
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

