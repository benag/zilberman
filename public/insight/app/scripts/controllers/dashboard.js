'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', function($scope, $state,$timeout) {
    $scope.loading = true;
    $scope.recommend = false;
    var index = 0;
    $scope.research = false;
    $scope.user = false;
    $scope.AI = false;
    $timeout(function(){
        $scope.research = true;
        $timeout(function(){
           $scope.user = true;
          $timeout(function(){
            $scope.AI = true;
            $scope.loading = false;
            $scope.recommend = true;
          }, 1000);
        }, 1000);

      },

      1000);


    $scope.run = function(){
      alert('running');
    };
    $scope.$state = $state;

  });
