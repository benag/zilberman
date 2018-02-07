angular.module('ganim').controller('newEntryCtrl', ['$scope', '$stateParams', '$location', '$state','leadService',
    function($scope, $stateParams, $location, $state, leadService) {

        const mashkanta = 0;
        const rechev = 1;
        const privateData = 0;
        const insuranceTypes = 1;

        $scope.format = 'dd/MM/yyyy';
        $scope.date = new Date();
        $scope.form = {};
        $scope.form.mate = {};
        $scope.form.id ='' ;
        $scope.form.gender = '';

        $scope.show = [true,false,false,false];
        $scope.insurance = [false,false,false,false];
        $scope.insuranceForm = {};
        $scope.insuranceForm.mate = {};
        $scope.insuranceForm.dira = {};
        $scope.cars = [{}];

        $scope.add = () => {
            if ($scope.cars.length <= 3) $scope.cars.push({});
        };

        $scope.setInsurance = function(index) {
            for (let i = 0 ; i < $scope.insurance.length ;i++  ) {
                (i === index) ? $scope.insurance[i] = true : $scope.insurance[i] = false;
            }
            $scope.insuranceForm = {};
        };

        $scope.omitCar = (index) => {
            $scope.cars.splice(index,1);
        };

        $scope.click = (index) => {
            if (index === 3){
                leadService.save($scope.form)
                .then( (done) => {
                    swal('הפניה נרשמה');
                })
            }else{
                for (let i = 0 ; i < $scope.show.length ;i++  ) {
                    (i === index) ? $scope.show[i] = true : $scope.show[i] = false;
                }
            }


        }



    }
]);