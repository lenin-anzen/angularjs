(function(ng) {
    'use strict';

    ng.module('app.services')
        .factory('MenusService', ["$mdSidenav", "$mdComponentRegistry", 
            function($mdSidenav, $mdComponentRegistry) {
        var service = {};

        service.open = function(componentId) {
            $mdComponentRegistry.when('left').then(function() {
                // Now you can use $mdSidenav('left') or $mdSidenav('left', true) without getting an error.
                $mdSidenav('left').open();
            });
        }
        service.close = function(componentId) {
            $mdComponentRegistry.when('left').then(function() {
                // Now you can use $mdSidenav('left') or $mdSidenav('left', true) without getting an error.
                $mdSidenav('left').close();
            });
        }

        return service;
    }]);
})(angular);
