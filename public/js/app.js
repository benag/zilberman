
var app = angular.module('ganim', ['ui.router','vsGoogleAutocomplete','ngFileUpload'])


.config(function($stateProvider, $urlRouterProvider) {

        //angularAuth0Provider.init({
        //    clientID: 'wrHwIUz1KJE9NxE86oiyB7cE9zqSanO2',
        //    domain: 'ganim.auth0.com',
        //    responseType: 'token id_token',
        //    audience: 'https://ganim.auth0.com/userinfo',
        //    redirectUri: 'http://localhost:4000/callback',
        //    scope: 'openid'
        //});
        //
        //$urlRouterProvider.otherwise('/');
        //
        //$locationProvider.hashPrefix('');

    //
    //    var addState = {
    //    name: 'add',
    //    url: '/add',
    //    controller:'addClientCtrl',
    //    templateUrl: 'templates/addClient.html'
    //};

    var main = {
        name: 'main',
        url: '/main',
        views: {
            "left-pane": { templateUrl: "templates/left-pane.html", controller: 'leftPaneController'},
            "main": { templateUrl: "templates/main.html", controller: 'mainCtrl' }
        }
    };

    var login = {
        name: 'login',
        url: '/login',
        views: {
            "main": { templateUrl: "templates/login.html", controller: 'loginCtrl' }
        }
        //templateUrl: 'templates/login.html',
        //controller:'loginCtrl'
    };

    $stateProvider.state(login);
    $stateProvider.state(main);
    $urlRouterProvider.otherwise('/login');


});
