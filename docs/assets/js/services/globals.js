(function(ng) {
    'use strict';

    ng.module('app.services')
        .factory('GlobalsService', [function() {
        var service = {};
        
        service.getAPIURL = function() {
            return 'http://localhost:8881';
        };
        
        return service;
    }]);
})(angular);
