
var app = angular.module('ganim', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
    var addState = {
        name: 'add',
        url: '/add',
        templateUrl: 'templates/addClient'
    };

    var welcome = {
        name: 'welcome',
        url: 'welcome',
        templateUrl: 'templates/welcome.html'
    };

    var aboutState = {
        name: 'about',
        url: '/about',
        template: '<h3>Its the UI-Router hello world app!</h3>'
    };

    $stateProvider.state(welcome);
    $stateProvider.state(aboutState);
    $urlRouterProvider.otherwise('/welcome');


});
