angular.module('ganim').controller(
    'OrderInstanceCtrl', function ($uibModalInstance,orderService,  $scope, $http, user, $rootScope) {

        //if ($rootScope.menus) $scope.menu =$rootScope.menus.filter( function(menu){ return menu.active } )[0];
        //$scope.menu.offerings = $scope.menu.offerings.filter( function(offer) { return Number(offer.amount) > 0});
        $scope.products = [];
        $scope.user = user;
        $rootScope.menus.map( menu => {
            let offerings = menu.products.filter( product => { if (product.amount > 0) return product; } );
            $scope.products = $scope.products.concat( offerings );
        })

        $scope.order = async function() {
            let newOrder = await orderService.order($scope.user);
            if (newOrder){
                $uibModalInstance.dismiss('cancel');
                swal('Thank you!');
                $rootScope.$broadcast('order-processed');
            }
        };

        $scope.getTotal = function(){
            var total = 0;
            $scope.products.forEach( function(offer) {
                total = total + Number(offer.amount * offer.price);
            })
            return total;
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });