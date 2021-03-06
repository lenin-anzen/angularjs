(function(ng) {
    'use strict';

    ng.module('app.controllers')
    .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').close()
            .then(function () {
            $log.debug("close LEFT is done");
            });

        };
  });

})(angular);