
var app = angular.module('ganim', ['ui.router','vsGoogleAutocomplete','ngFileUpload', 'ui.bootstrap','ui.select','ngAnimate','ngSanitize'])
//,'ngAnimate','ngSanitize'

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
        cache: false,
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
    var station = {
        name: 'station',
        url: '/station',
        views: {
            "left-pane": { templateUrl: "templates/left-pane.html", controller: 'leftPaneController'},
            "main": { templateUrl: "templates/station.html", controller: 'stationCtrl' }
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
    var reports = {
        name: 'reports',
        url: '/reports',
        views: {
            "left-pane": { templateUrl: "templates/left-pane.html", controller: 'leftPaneController'},
            "main": { templateUrl: "templates/reports.html", controller: 'reportsCtrl' }
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
    $stateProvider.state(station);
    $stateProvider.state(orders);
    $stateProvider.state(search);
    $stateProvider.state(products);
    $stateProvider.state(subproducts);
    $stateProvider.state(drinks);
    $stateProvider.state(main);
    $stateProvider.state(meetups);
    $stateProvider.state(tools);
    $urlRouterProvider.otherwise('/login');


}).run(function($rootScope, $state, global){

    $rootScope.showLeftPane = true;
    $('#topBar').removeClass('hide-bar');
    $rootScope.current = 'main';
    $rootScope.$on('$locationChangeSuccess', (event, toState, toStateParams) => {
        let user = global.getUserData();
        if (!user) $state.go('login');


    });
})
