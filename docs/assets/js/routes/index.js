'use strict';

/**
 * 
 */
function getRouteList() {
    var routeList = [
        // Main pages
        {
            name: 'login',
            url: '/login',
            templateUrl: 'assets/js/components/login/index.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        },
        {
            name: 'home',
            url: '/',
            templateUrl: 'assets/js/components/home/index.html',
            controller: 'HomeController',
            controllerAs: 'vm'
        },
        {
            name: 'monitors',
            url: '/monitors',
            templateUrl: 'assets/js/components/monitors/index.html',
            controller: 'MonitorsController',
            controllerAs: 'vm'
        },
        {
            name: 'users',
            url: '/users',
            templateUrl: 'assets/js/components/users/index.html',
            controller: 'UsersController',
            controllerAs: 'vm'
        },
        // Catalogs
        {
            name: 'user-categories',
            url: '/user-categories',
            templateUrl: 'assets/js/components/user-categories/index.html',
            controller: 'UserCategoriesController',
            controllerAs: 'vm'
        },
        {
            name: 'monitor-categories',
            url: '/monitor-categories',
            templateUrl: 'assets/js/components/monitor-categories/index.html',
            controller: 'MonitorCategoriesController',
            controllerAs: 'vm'
        },
        {
            name: 'channels',
            url: '/channels',
            templateUrl: 'assets/js/components/channels/index.html',
            controller: 'ChannelsController',
            controllerAs: 'vm'
        },
        {
            name: 'logout',
            url: '/logout',
            controller: function(AuthenticationService){
                AuthenticationService.Logout();
            }
        },
        // Measures
        {
            name: 'measures',
            url: '/measures',
            templateUrl: 'assets/js/components/measures/index.html',
            controller: 'MeasuresController',
            controllerAs: 'vm'
        }
    ];
    return routeList;
}
