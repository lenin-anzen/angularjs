(function(ng) {
    'use strict';
    
    ng.module('app.services')
        .factory('ModalsService', ["$mdDialog", function($mdDialog) {
        var service = {};

        service.showAlert = function(event, type, title, textContent, cb) {
            var btnText = '';
            switch(type) {
                case 'success':
                    btnText = 'Cerrar';
                break;
                case 'error':
                    btnText = 'Intentar de nuevo';
                break;
            }
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application
            // to prevent interaction outside of dialog
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#mainContainer')))
                .clickOutsideToClose(true)
                .title(title)
                .textContent(textContent)
                .ariaLabel(textContent)
                .ok(btnText)
                .targetEvent(event)
            )
            .finally(function() {
                cb();
            });
        };

        return service;
    }]);
})(angular);
