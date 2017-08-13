(function(ng, undefined) {
    'use strict';

    ng.module('app.controllers')
        .controller('LoginController', [
            "$http", "$location", "$localStorage", "AuthenticationService", "ModalsService",
            function($http, $location, $localStorage, AuthenticationService, ModalsService) {
        var vm = this;
        this.$onInit = function() {
            // reset login status
            AuthenticationService.Logout();
        };
        var submitForm = function( event ) {
            this.loading = true;
            AuthenticationService.Login(this.formData.email, this.formData.password).then(
                function(loginResult){
                    console.log('loginResult:', loginResult);
                    switch (loginResult.message) {
                        case 'token_generated':
                            var cb = function() {
                                $location.path('/');
                            }
                            $localStorage.currentUser = loginResult.data.token;
                            $http.defaults.headers.common.Authorization = 'Bearer ' + loginResult.data.token;
                            ModalsService.showAlert(
                                event, 
                                'success', 
                                'Login corecto!', 
                                'Ha ingresado correctamente.', 
                                cb);
                        break;
                    }
                },
                function(error){
                    console.error('error:', error);
                    switch ( error.data.message ) {
                        case 'invalid_credentials':
                            ModalsService.showAlert(
                                event, 
                                'error', 
                                'Login error!', 
                                'El usuario/contraseña es incorrecto.'
                            );
                        break;
                    }
                }
            );
        };
        // Set the current scope
        ng.extend(this, {
            title: 'Iniciar sesión',
            formData: {
                email: '',
                password: ''
            },
            loading: false,
            submitForm: submitForm,
            error: false
        });
    }]);
})(angular);
