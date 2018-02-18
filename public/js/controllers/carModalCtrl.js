angular.module('ganim').controller('carModalCtrl', function ($uibModalInstance, $scope, items, car) {
    
    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };
  
    $scope.ok = function () {
      $uibModalInstance.close($scope.selected.item);
    };
  
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
  