(function(ng) {
    'use strict';
    
    ng.module('app.controllers')
        .controller('NavigationController', [
            "MenusService", "AuthenticationService", 
            function(MenusService, AuthenticationService) {
            var vm = this;
            vm.open = function() {
                MenusService.open('left');
            };
            vm.close = function() {
                MenusService.close('left');
            };
            vm.logout = function() {
                console.log('Logout!!');
                AuthenticationService.Logout(function() {
                    window.location.href = "/";
                });
            }
    }]);
})(angular);
