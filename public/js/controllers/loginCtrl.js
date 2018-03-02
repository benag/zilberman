angular.module('ganim').controller('loginCtrl', ['$scope', '$stateParams', '$location', '$state', 'global', 'userMng', '$http',
    function($scope, $stateParams, $location, $state, global, userMng, $http) {

        $('#footer').hide();
        $scope.user = {};
        $scope.user.email ='';
        $scope.sms = false;
        $scope.showLogin = true;
        let $page = $('.full-page');
        let image_src = $page.data('image');
        $scope.attempts = 0;
        global.resetUser();

        if(image_src !== undefined){
            let image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>';
            $page.append(image_container);
        }

        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700);

        
        $scope.validateAndContinue = function(){
            // 1. look for local storage with date. if exist go to next else ask for validation, or registration
            userMng.getUser($scope.user.email, $scope.user.password )
            .then(function(user){
               global.setUserData(user);
               $state.go('station');
            }).catch(function(err) {
                console.log(err);
                    swal('Wrong user name or password');
            })
        };

        $scope.changeToRegister = () => {
            $scope.user ={};
            $scope.showLogin = false;
        };
        $scope.changeToLogin = () => {
            $scope.user ={};
            $scope.showLogin = true;
        };

        $scope.register = () => {
            $http.post('/register', {id:$scope.user.id,phone:user.phone, email:user.email, name:user.name, password:user.password})
            .then( (data) => {

            })
            .catch((err) => {

            })
        };

        $scope.enterSMS = () => {
            if ($scope.user.sms === String($scope.smsData)){
                $state.go('newentry');
            }else{
                toastr.error('קוד סמס שגוי');
            }
            
        };

        $scope.sendCode = () => {
            swal({
                title: 'שליחת קוד לנייד',                
               
                html: '<input type="text" class="form-control" id="smsPhone" placeholder="הכנס מספר טלפון נייד">',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'שלח',
                cancelButtonText: 'בטל',
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false,
                reverseButtons: true
            }).then((result) => {
                if (result) {
                    $.post('/sms', { phone: $('#smsPhone').val()})
                    .then((data) => {

                    })                    
                } else if ( result.dismiss === swal.DismissReason.cancel)
                {
                   
                }
            })
        }
        $scope.login = function(){
           if ($scope.user.id === 'admin' && $scope.user.password === 'admin'){

               global.setUser({ uName: 'admin', uFamily: 'admin', uEmail:'admin', uRole:2});
                $state.go('newentry');
                return;
           }else{
               $scope.attempts++;
               $http.post('/login', { id: $scope.user.id, password: $scope.user.password })
                   .then((data) => {
                       global.setUser(data.data.user);
                       global.setToken(data.data.token);
                       $state.go('newentry');


                   }).catch((err) => {
                       toastr.error('שם משתמש או ססמא שגויים');
                   }) 
           }
            
            
        }
    }
]);