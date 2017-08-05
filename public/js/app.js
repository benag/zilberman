
var app = angular.module('ganim', ['ui.router','vsGoogleAutocomplete','ngFileUpload', 'ui.bootstrap','ui.select','ngSanitize'])


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
    var subproducts = {
        name: 'subproducts',
        url: '/subproducts',
        views: {
            "left-pane": { templateUrl: "templates/left-pane.html", controller: 'leftPaneController'},
            "main": { templateUrl: "templates/subproducts.html", controller: 'subProductsCtrl' }
        },
        params: {
            product: null
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
    var orders = {
        name: 'orders',
        url: '/orders',
        views: {
            "left-pane": { templateUrl: "templates/left-pane.html", controller: 'leftPaneController'},
            "main": { templateUrl: "templates/orders.html", controller: 'ordersCtrl' }
        }
    };

    var meetups = {
        name: 'meetups',
        url: '/meetups',
        views: {
            "left-pane": { templateUrl: "templates/left-pane.html", controller: 'leftPaneController'},
            "main": { templateUrl: "templates/meetups.html", controller: 'meetupsCtrl' }
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
    $stateProvider.state(orders);
    $stateProvider.state(search);
    $stateProvider.state(products);
    $stateProvider.state(subproducts);
    $stateProvider.state(drinks);
    $stateProvider.state(main);
    $stateProvider.state(meetups);
    $stateProvider.state(tools);
    $urlRouterProvider.otherwise('/login');


}).run(function($rootScope){
    $rootScope.current = 'main';
})
