(function(ng, _) {
    'use strict';

    ng.module('app.services')
        .factory('AuthenticationService', [
            "$http", "$location", "$resource", "$localStorage", "GlobalsService", 
            function($http, $location, $resource, $localStorage, GlobalsService) {
            var service = {};

            service.Login = function(email, password, callback) {
                var LoginResource = $resource(GlobalsService.getAPIURL() + '/api/auth/login');
                // This promise will be fulfilled when the response is retrieved for this call
                return LoginResource.save({}, { email: email, password: password }).$promise;
            };
            service.Refresh = function(callback) {
                var RefreshResource = $http.patch('/api/auth/refresh');
                // This promise will be fulfilled when the response is retrieved for this call
                return RefreshResource;
            };
            service.Logout = function(callback) {
                // remove user from local storage and clear http auth header
                delete $localStorage.currentUser;
                $http.defaults.headers.common.Authorization = '';
                if ( !_.isUndefined(callback) ) {
                    callback();
                }
            };
            return service;
        }]);

})(angular, _);
