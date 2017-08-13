(function(ng, _, undefined) {
    'use strict';

    // Main module and dependencies
    var app = ng.module('app', [
        'ngSanitize',
        'ngStorage',
        'ngMaterial',
        'ngAnimate',
        'ngAria',
        'ngMessages',
        'ngResource',
        'ngMdIcons',
        'mdDataTable',
        'ui.router',
        'highcharts-ng',
        'app.controllers',
        'app.services'
    ]);
    // Configuration
    app.config(config);
    app.run(run);
    // Controllers
    ng.module('app.controllers',[]);
    // Services
    ng.module('app.services',[]);

    function config($compileProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider) {
        // Diable debu
        $compileProvider.debugInfoEnabled(true);
        // Default route
        $urlRouterProvider.otherwise("/");
        // Register App routes
        _.each(getRouteList(), function(element) {
            $stateProvider.state(element);    
        });
        // Update the theme colors to use themes on font-icons
        $mdThemingProvider.theme('default')
          .primaryPalette("red")
          .accentPalette('green')
          .warnPalette('blue');
    }
    function run($rootScope, $http, $location, $localStorage) {
        // Keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser;
        }

        // Redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    }
})(angular, _);
