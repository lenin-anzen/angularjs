(function(ng) {
    'use strict';

    ng.module('app.services')
        .factory('UsersService', ["$resource", "$localStorage", 
			function($resource, $localStorage) {
				var vm = this;

				vm.checked = false;
				vm.results = [];
				vm.progress = undefined;
				vm.filterVisibility = false;

				vm.filters = {
					search: '',
					limit: '10',
					order: '',
					page: 1
				};
				var api = $resource('/api/users', { }, {
					get: {
						headers: { 'Authorization': 'Bearer ' + $localStorage.currentUser }
					}
				});
                var service = {};
                service.getUsers = function(filters, cb) {
					var params = filters || vm.filters;
					var offset = (params.page - 1) * params.limit + 1;
                    return api.get({
						limit: params.limit,
						offset: offset
					}, cb).$promise;
                }
				service.onPaginate = function (page, limit, cb) {
					return service.getUsers(angular.extend({}, vm.filters, {
						page: page,
						limit: limit
					}), cb);
				}
				vm.onPaginate = service.onPaginate;
                return service;
            }
        ]);
})(angular);
