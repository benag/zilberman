angular.module('ganim').controller('summeryCtrl', ['$scope', '$stateParams', '$location', '$state','$http', 'global',
    function($scope, $stateParams, $location, $state, $http, global) {
        $scope.loading = true;
        $scope.search = '' ;

        $http.get('/products')
            .then( (data) => {
                $scope.loading = false;
                $scope.products = data.data;
                console.log($scope.products);
                $scope.products.forEach( function(p) {
        
                    if (p.pType === 1) p.pType = 'משכנתה';
                    if (p.pType === 2) p.pType = 'פרט';
                    if (p.pType === 3) p.pType = 'רכב';
                    if (p.pType === 4) p.pType = 'דירה';
                })
            })

        $scope.searchRecords = () => {
            $scope.loading = true;
            $http.get('/products/' + $scope.search)
                .then( (data) => {
                    $scope.loading = false;
                    $scope.products = data.data;
                    console.log($scope.products);
                    $scope.products.forEach( function(p) {
            
                        if (p.pType === 1) p.pType = 'משכנתה';
                        if (p.pType === 2) p.pType = 'פרט';
                        if (p.pType === 3) p.pType = 'רכב';
                        if (p.pType === 4) p.pType = 'דירה';
                })
            })
        }

        $scope.goToClient = (index) => {
            global.setProduct($scope.products[index]);
            $state.go('newentry');
        }    

    }
]);