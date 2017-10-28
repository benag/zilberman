angular.module('ganim').controller('ordersCtrl', ['$scope', '$stateParams', '$location', '$state', 'global', '$rootScope', '$http', 'orderService',
    function($scope, $stateParams, $location, $state, global, $rootScope, $http, orderService ) {

        let _this = $scope;

        _this.init = async () => {
            $http.get('/orders').then( (orders) => {
                _this.orders = orders.data;
            })
        }


    }
]);