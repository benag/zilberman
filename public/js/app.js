
var app = angular.module('ganim', ['ui.router','vsGoogleAutocomplete','ngFileUpload', 'ui.bootstrap','ui.select','ngAnimate','ngSanitize', 'ng-slide-down','720kb.datepicker','tableSort'])
//,'ngAnimate','ngSanitize'

.config(function($stateProvider, $urlRouterProvider) {



    //var main = {
    //    name: 'main',
    //    url: '/main',
    //    views: {
    //        //"left-pane": { templateUrl: "templates/left-pane.html", controller: 'leftPaneController'},
    //        "main": { templateUrl: "templates/main.html", controller: 'mainCtrl' }
    //    }
    //};
    var newentery = {
        name: 'newentry',
        url: '/newentry',
        views: {
            
            "top": { templateUrl: "templates/navbar.html", controller: 'topNavCtrl'},
            "main": { templateUrl: "templates/newEntry.html", controller: 'newEntryCtrl' }
        }
    };
    var summery = {
        name: 'summery',
        url: '/summery',
        views: {
            "top": { templateUrl: "templates/navbar.html", controller: 'topNavCtrl'},
            "main": { templateUrl: "templates/summery.html", controller: 'summeryCtrl' }
        }
    };
    var users = {
        name: 'users',
        url: '/users',
        views: {
            "top": { templateUrl: "templates/navbar.html", controller: 'topNavCtrl'},
            "main": { templateUrl: "templates/users.html", controller: 'usersCtrl' }
        }
    };

    var login = {
        name: 'login',
        url: '/login',
        views: {

            "main": { templateUrl: "templates/login.html", controller: 'loginCtrl' }
        }

    };

    $stateProvider.state(login);
    $stateProvider.state(users);
    $stateProvider.state(newentery);
    $stateProvider.state(summery);
    $urlRouterProvider.otherwise('/login');


}).run(function($rootScope, $state, global){


    $rootScope.$on('$locationChangeSuccess', (event, toState, toStateParams) => {
        if (toState !== 'login'){
            let user = global.getUser();
            if (!user && !user.uEmail){
                $state.go('login');
            }else{
                $state.go('newentery');
            } 
        }
        
    });
});
