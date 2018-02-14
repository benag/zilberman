angular.module('ganim').controller('newEntryCtrl', ['$scope', '$stateParams', '$location', '$state','leadService', 'global','Upload','$rootScope',
    function($scope, $stateParams, $location, $state, leadService, global, Upload, $rootScope) {

        const mashkanta = 0;
        const rechev = 1;
        const privateData = 0;
        const insuranceTypes = 1;

        $scope.format = 'dd/MM/yyyy';
        $scope.date = new Date();
        $scope.form = {};
        $scope.form.client = {};
        $scope.form.mate = {};

        $scope.show = [true,false,false,false];
        $scope.insurance = [false,false,false,false];
        $scope.form.insuranceForm = {};
        $scope.form.borrow = {};
        $scope.form.insuranceForm.morgage = {};
        $scope.form.insuranceForm.cars = [{}];
        $scope.form.insuranceForm.mate = {};
        $scope.form.insuranceForm.dira = {};
        $scope.form.insuranceForm.prati = {};

        let product = global.getProduct();
        if (product) {
            $http.get('/product/' + product.pID, () => {
                
            })
            
        }

        $scope.uploadCarDoc = (carId) => {
            toastr.info('מעלה טופס מכונית לשרת');
            let url = 'http://'+ '18.221.178.131:3000' +'/cardoc';
            //carId = '333';
            let fileUpload = Upload.upload({ url: url+'/'+carId, data: {file: $scope.file, car:carId} });

            let success = (res) => {
                toastr.info('טופס מכונית הועלה לשרת בהצלחה');
            };
            let error = () => {};
            let event = () => {};

            fileUpload.upload.then(success,error, event);
        }

        $scope.carDoc = (file, errFiles) => {
            if (file) {
                $scope.file = file;
            }
        };



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
  
        $scope.omitCar = (index) => {
            $scope.cars.splice(index,1);
        };

        $scope.click = (index) => {
            if (index === 3){
                //$scope.convertType();
                toastr.info('הפניה נשלחה לשרת');
                leadService.save($scope.form, true)
                .then( (done) => {
                    console.log(done);
                    if (done.data.status){
                        if ($scope.form.type === 1 && $scope.file){
                            $scope.uploadCarDoc(done.data.product.newCar);
                        }
                        done.data.msg.forEach( msg => {
                            toastr.info(msg);
                        })
                    }else{
                        done.data.msg.forEach( msg => {
                            toastr.error(msg);
                        })
                        toastr.error('תקלה בשמירת ההפניה', 'תקלה');
                    }
                }).catch( (err) =>{
                    console.log(err);
                    toastr.error('תקלה בשמירת ההפניה', 'תקלה');
                })
            }else{
                if (index === 0) global.resetProduct();
                for (let i = 0 ; i < $scope.show.length ;i++  ) {
                    (i === index) ? $scope.show[i] = true : $scope.show[i] = false;
                }
            }
        }
    }
]);