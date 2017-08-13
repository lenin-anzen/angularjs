(function(ng, moment, _, undefined) {
    'use strict';

    moment.locale('es');
    
    ng.module('app.controllers')
        .controller('MonitorsController', ["$scope", "$http", "GlobalsService", 
			function($scope, $http, GlobalsService) {
        var vm = this;

		$scope.title = 'Listado de monitores';

		$scope.paginatorCallback = paginatorCallback;
        $scope.getLoadResultsCallback = getLoadResultsCallback;

        var loadPageCallbackWithDebounce;

        $scope.$watch('filterText', function(){
            if(loadPageCallbackWithDebounce){
              loadPageCallbackWithDebounce();
            }
        });
        function getLoadResultsCallback(loadPageCallback) {
            loadPageCallbackWithDebounce = _.debounce(loadPageCallback, 1000);
        }
        function paginatorCallback(page, pageSize) {
			if(!page) { page = 1 }
            var offset = (page-1) * pageSize;
            var query = $scope.filterText ? $scope.filterText : '';
			var params = {
                'offset': offset,
                'limit':pageSize,
                'query': query+'*',
                'fields': ['*'],
                'sort':{
                    'field':'id',
                    'order':'desc'
                }
			};
            return $http.get(GlobalsService.getAPIURL() + '/api/monitors?' + $.param( params ) ).then(function(result){
				console.log( 'result:', result.data.data );
                return {
                    results: result.data.data,
                    totalResultCount: result.data.data.length
                }
            },function(error){
				console.log('error:', error);
			});
        }
    }]);

})(angular, moment, _);
