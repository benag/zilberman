angular.module('ganim').controller('headerCtrl', ['$scope', '$stateParams', '$location', '$state',
    function($scope, $stateParams, $location, $state) {

        $scope.$watch(function(){return $state.current.name;}, function(){$scope.state = $state.current.name});
        console.log($state.current.name)
    }
]);