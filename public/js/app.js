
var app = angular.module('ganim', ['ui.router','vsGoogleAutocomplete','ngFileUpload', 'ui.bootstrap'])


.config(function($stateProvider, $urlRouterProvider) {



    var main = {
        name: 'main',
        url: '/main',
        views: {
            "left-pane": { templateUrl: "templates/left-pane.html", controller: 'leftPaneController'},
            "main": { templateUrl: "templates/main.html", controller: 'mainCtrl' }
        }
    };
    var tools = {
        name: 'tools',
        url: '/tools',
        views: {
            "left-pane": { templateUrl: "templates/left-pane.html", controller: 'leftPaneController'},
            "main": { templateUrl: "templates/tools.html", controller: 'toolsCtrl' }
        }
    };
    var search = {
        name: 'search',
        url: '/search',
        views: {
            "left-pane": { templateUrl: "templates/left-pane.html", controller: 'leftPaneController'},
            "main": { templateUrl: "templates/search.html", controller: 'searchCtrl' }
        }
    };

    var products = {
        name: 'products',
        url: '/products',
        views: {
            "left-pane": { templateUrl: "templates/left-pane.html", controller: 'leftPaneController'},
            "main": { templateUrl: "templates/products.html", controller: 'productsCtrl' }
        }
    };
    var drinks = {
        name: 'drinks',
        url: '/drinks',
        views: {
            "left-pane": { templateUrl: "templates/left-pane.html", controller: 'leftPaneController'},
            "main": { templateUrl: "templates/drinks.html", controller: 'drinksCtrl' }
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
    $stateProvider.state(search);
    $stateProvider.state(products);
    $stateProvider.state(drinks);
    $stateProvider.state(main);
    $stateProvider.state(tools);
    $urlRouterProvider.otherwise('/login');


});
