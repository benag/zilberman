'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', function($scope, $state) {
    $scope.loading = true;
    var index = 0;
    $scope.research = false;
    $scope.user = false;
    $scope.AI = false;
    setTimeout(function(){ $scope.research = true; }, 1000);
    setTimeout(function(){ $scope.user = true }, 1000);
    setTimeout(function(){ $scope.research = true }, 1000);
    $scope.run = function(){
      alert('running');
    };
    $scope.$state = $state;

  });
