
angular.module('ganim').controller('stationMobileCtrl', ['$scope', '$stateParams', '$location', '$state', 'global',
    '$rootScope', '$http', 'orderService','userMng', '$uibModal','$timeout',
    function($scope, $stateParams, $location, $state, global, $rootScope, $http, orderService, userMng, $uibModal, $timeout ) {


        $rootScope.showTribue = false;
        $rootScope.title = 'Menu';
        $scope.chosenMenu = 0;
        $scope.paging = 0;
        $scope.pageSize = 3;
        $scope.showCategory = true;
        $scope.redAlert = false;


        $scope.refresh = () => {
            $state.reload();
        };

        $rootScope.$on('order-processed', () => $scope.refresh());

        $scope.gotoProducts = function(index){

            if ($scope.user) return $scope.showCategory = false;
            $scope.identifyUser(() => {
                $rootScope.$applyAsync(function() {
                    $scope.showCategory = false;
                    //$scope.product = $scope.products[index];
                })
            })
        };

        $scope.identifyUser = (cb) => {
            swal({
                title: 'Enter Phone Number',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Submit',
                showLoaderOnConfirm: true,
                preConfirm: function (phone) {
                    return new Promise(function (resolve, reject) {
                        $scope.currentPhone = phone;
                        $scope.user = userMng.getUserByPhone($scope.currentPhone).then( (user) => {
                            $scope.user = user.data;
                            $scope.pointsLeft = $scope.user.points;
                            resolve();
                        })

                    })
                },
                allowOutsideClick: false
            }).then(cb);

        };

        $scope.init = async function () {
            // get main menu
            $scope.menu = await orderService.getMenu();
            if (!$scope.menu) {
                $state.go('app.opening');
                //global.alert('Problem contacting server, please check network');
                //errorService.informError();
            } else {
                $scope.$applyAsync(function () {
                    $rootScope.menus = $scope.menu;
                })
            }
        }

        $scope.change = function (index) {
            $scope.menus[$scope.chosenMenu].active = false;
            $scope.chosenMenu = index;
            $scope.menus[index].active = true;

        };

        $scope.substract = function (menuIndex, index) {

            $scope.$applyAsync(function () {
                if ($rootScope.menus[menuIndex].products[index].amount > 0){
                    $rootScope.menus[menuIndex].products[index].amount--;
                    $scope.pointsLeft += $rootScope.menus[menuIndex].products[index].price;
                }
            })

        };

        $scope.append = (menuIndex, index) => {
            $scope.$applyAsync(function () {
                if ($scope.pointsLeft - $rootScope.menus[menuIndex].products[index].price > 0){
                    $rootScope.menus[menuIndex].products[index].amount++;
                    $scope.pointsLeft -= $rootScope.menus[menuIndex].products[index].price;
                }else{
                    $scope.redAlert = true;
                    $timeout(() => $scope.redAlert = false, 1000);
                }
            })
        };

        $scope.add = function (index) {
            var num = Number($scope.menus[index].amount);
            num++;
            $scope.$applyAsync(function () {
                $scope.menus[index].amount = String(num);
                console.log($scope.menus);
            })

        };
        $scope.order = () => {
            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'orderModal.html',
                controller: 'OrderInstanceCtrl',
                size: undefined,
                appendTo: undefined,
                resolve: {
                    user:() => $scope.user
                }

            });
            $scope.modalInstance.result.then(function (selectedItem) {
                _this.init();
            }, function () {

            });
        }

 }]);