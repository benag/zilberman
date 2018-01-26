
var app = angular.module('ganim', ['ui.router','vsGoogleAutocomplete','ngFileUpload', 'ui.bootstrap','ui.select','ngAnimate','ngSanitize', 'ng-slide-down','720kb.datepicker'])
//,'ngAnimate','ngSanitize'

.config(function($stateProvider, $urlRouterProvider) {



    var main = {
        name: 'main',
        url: '/main',
        views: {
            //"left-pane": { templateUrl: "templates/left-pane.html", controller: 'leftPaneController'},
            "main": { templateUrl: "templates/main.html", controller: 'mainCtrl' }
        }
    };
    var newentery = {
        name: 'newentry',
        url: '/newentry',
        views: {
            //"left-pane": { templateUrl: "templates/left-pane.html", controller: 'leftPaneController'},
            "main": { templateUrl: "templates/newEntry.html", controller: 'newEntryCtrl' }
        }
    };
    var summery = {
        name: 'summery',
        url: '/summery',
        views: {
            //"left-pane": { templateUrl: "templates/left-pane.html", controller: 'leftPaneController'},
            "main": { templateUrl: "templates/summery.html", controller: 'summeryCtrl' }
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
    $stateProvider.state(main);
    $stateProvider.state(newentery);
    $stateProvider.state(summery);
    $urlRouterProvider.otherwise('/login');


}).run(function($rootScope, $state, global){


    $rootScope.$on('$locationChangeSuccess', (event, toState, toStateParams) => {
        //let user = global.getUserData();
        //if (!user) $state.go('login');
        //$rootScope.currentState = toState.split('/');
        //$rootScope.currentState  = $rootScope.currentState.pop();


    });
});
