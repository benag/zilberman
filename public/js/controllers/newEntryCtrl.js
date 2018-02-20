angular.module('ganim').controller('newEntryCtrl', ['$scope', '$stateParams', '$location', '$state','leadService', 'global','Upload','$rootScope','$http','$uibModal',
    function($scope, $stateParams, $location, $state, leadService, global, Upload, $rootScope, $http, $uibModal) {

        $('#footer').show();
        const mashkanta = 0;
        const rechev = 1;
        const privateData = 0;
        const insuranceTypes = 1;
        $scope.loading = false;
        $scope.isNew = true;
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
            $scope.loading = true;
            $scope.isNew = false;
            $http.get('/product/' + product.pID).then((data) => {
                console.log(data.data);
                let product = data.data;
                $scope.setClient(product.client);
                $scope.setMate(product.secondClient);        
                $scope.setProduct(product);
                $scope.setLoan(product);
                $scope.loading = false;
            })
            
        }

        $scope.setClient = (client) => {
            $scope.form.client = client;
            var date = moment($scope.form.client.cBDate);
            let cTazDate = moment($scope.form.client.cTazDate); 
            $scope.form.client.cBDate = date.format('DD/MM/YYYY');
            $scope.form.client.cTazDate = cTazDate.format('DD/MM/YYYY');
            $scope.form.client.cGender = String($scope.form.client.cGender);
            //($scope.form.client.cSmoke) ? $scope.form.client.cSmoke = '1': $scope.form.client.cSmoke = '0';
            $scope.form.client.cSmoke = String($scope.form.client.cSmoke);
            if ($scope.form.client.cBDate === null) $scope.form.client.cBDate = '';
            if ($scope.form.client.cQuitSmokeDate === null) $scope.form.client.cQuitSmokeDate = '';
            
        }
        $scope.setMate = (client) => {
            if (client){
                $scope.form.mate = client;
                let date = moment($scope.form.mate.cBDate);
                let cTazDate = moment($scope.form.mate.cTazDate); 
                $scope.form.mate.cBDate = date.format('DD/MM/YYYY');
                $scope.form.mate.cTazDate = cTazDate.format('DD/MM/YYYY');
                $scope.form.mate.cGender = String($scope.form.mate.cGender);
                $scope.form.mate.id = $scope.form.mate.cTaz2; //in case taz is changed;
                if ($scope.form.mate.cSmoke) $scope.form.mate.cSmoke = '1';
                $scope.form.mate.cSmoke = String($scope.form.mate.cSmoke);
                if ($scope.form.mate.cBDate === null) $scope.form.mate.cBDate = '';
                if ($scope.form.mate.cQuitSmokeDate === null) $scope.form.mate.cQuitSmokeDate = '';
            } 
        }

        $scope.setProduct = (p) => {
            let type = p.type;
            if (type === 3){
                $scope.insurance[1] = true;
                $scope.form.type = 1;
                $scope.form.insuranceForm.cars = [];
                $scope.form.insuranceForm.cars.push(p.cars);
                let date = moment($scope.form.insuranceForm.cars[0].carRenewDate);
                $scope.form.insuranceForm.cars[0].carRenewDate = date.format('DD/MM/YYYY');
                
                // $scope.form.insuranceForm.cars.forEach( (car) => { 
                //     let date = moment(car.carRenewDate);
                //     car.carRenewDate = date.format('DD/MM/YYYY'); 
                // })
                
            } 
            if (type === 1){
                $scope.insurance[0] = true;
                $scope.form.type = 0;
                $scope.form.insuranceForm.morgage = p.morgage;
                $scope.form.insuranceForm.morgage.pType = String($scope.form.insuranceForm.morgage.pType);

            } 
            if (type === 2) $scope.insurance[3] = true;
            if (type === 4) $scope.insurance[2] = true;



        }
        $scope.setLoan = (product) => {
            if (product && product.loan){
                $scope.form.borrow = product.loan;
                $scope.form.borrow.loanType = String($scope.form.borrow.loanType);
                $scope.form.borrow.loanBank = String($scope.form.borrow.loanBank);
            }
            
        }

        $scope.openCarModal = (docs, car) => {
            
            var parentElem = undefined;

            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModalContent.html',
                controller: 'carModalCtrl',
                size: undefined,
                appendTo: undefined,
                resolve: {
                    items: function () {
                        return docs;
                    },
                    car: () => { return car}
                }
            });
      
            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        }

        $scope.showFiles = (index) => {
            $http.get(`/car/files/${$scope.form.insuranceForm.cars[index].carInsID}`)
            .then( (data) => {
                $scope.openCarModal(data.data, $scope.form.insuranceForm.cars[index].carInsID);
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

            fileUpload.then(success,error, event);
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

        $scope.validate = () => {
            if (!$scope.form.client.cTaz1 || $scope.form.client.cTaz1.length > 9){
                toastr.error('תז ראשי אינה נכונה');
                return false;
            } 
            if (!$scope.form.client.cName){
                toastr.error('יש למלה שם');
                return false;
            }
            if (!$scope.form.client.cFamily){
                toastr.error(' יש למלה שם משפחה');
                return false;
            }
            if (!$scope.form.client.cGender){
                toastr.error(' יש לבחור מגדר');
                return false;
            }
            if (!$scope.form.client.cMobile || $scope.form.client.cMobile < 10){
                toastr.error(' מספר טלפון נייד לא תקין');
                return false;
            }
            if (!$scope.form.client.cPhone || $scope.form.client.cPhone < 10){
                toastr.error('מספר טלפון אינו תקין ');
                return false;
            }
            return true;

        }
        $scope.click = (index) => {
            if (index === 3){
                //$scope.convertType();
                if (!$scope.validate()) return;
                toastr.info('הפניה נשלחה לשרת');
                leadService.save($scope.form, $scope.isNew)
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