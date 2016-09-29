'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', function($scope, $location) {
    $scope.user = '';
    $scope.pass = '';
    $scope.submit = function() {
      //$http.get('/login/')
      if ($scope.user === 'goldenbergben@gmail.com' && $scope.pass === '123'){
        $location.path('/dashboard');
      }

    }

  });
