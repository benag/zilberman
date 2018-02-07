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

        $scope.show = [true,false,false,false];
        $scope.insurance = [false,false,false,false];
        $scope.form.insuranceForm = {};
        $scope.form.insuranceForm.morgage = {};
        $scope.form.insuranceForm.cars = [{}];
        $scope.form.insuranceForm.mate = {};
        $scope.form.insuranceForm.dira = {};
        $scope.form.insuranceForm.prati = {};



        $scope.add = () => {
            if ($scope.cars.length <= 3) $scope.cars.push({});
        };

        $scope.setInsurance = function(index) {
            for (let i = 0 ; i < $scope.insurance.length ;i++  ) {
                (i === index) ? $scope.insurance[i] = true : $scope.insurance[i] = false;
            }
            $scope.form.type = index;
            //$scope.form.insuranceForm  = {};
        };
        //$scope.convertType = () => {
        //    if ($scope.form.type === 0){
        //        $scope.form.type = 1;
        //        return;
        //    }
        //    if ($scope.form.type === 1){
        //        $scope.form.type = 3;
        //        return;
        //    }
        //    if ($scope.form.type === 2){
        //        $scope.form.type = 4;
        //        return;
        //    }
        //    if ($scope.form.type === 3) {
        //        $scope.form.type = 2;
        //        return;
        //    }
        //};
        $scope.omitCar = (index) => {
            $scope.cars.splice(index,1);
        };

        $scope.click = (index) => {
            if (index === 3){
                //$scope.convertType();
                toastr.info('הפניה נשלחה לשרת');
                leadService.save($scope.form)
                .then( (done) => {
                    console.log(done);
                    if (done.data.status){
                        done.data.msg.forEach( msg => {
                            toastr.info(msg);
                        })
                    }else{
                        toastr.error('תקלה בשמירת ההפניה', 'תקלה');
                    }
                }).catch( (err) =>{
                    toastr.error('תקלה בשמירת ההפניה', 'תקלה');
                })
            }else{
                for (let i = 0 ; i < $scope.show.length ;i++  ) {
                    (i === index) ? $scope.show[i] = true : $scope.show[i] = false;
                }
            }


        }



    }
]);