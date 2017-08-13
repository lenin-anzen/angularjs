(function(ng, moment, _, hc, undefined) {
    'use strict';

    moment.locale('es');
    
    ng.module('app.controllers')
        .controller('HomeController', ["$scope", "$http", "GlobalsService", 
			function($scope, $http, GlobalsService) {
        var vm = this;
        
        vm.title = 'Dashboard principal';
        
        var types = ['avg', 'sum']
        var seriesOptions = [[], []];
        var seriesCounter = [0, 0];
        var channels = ['ch1', 'ch2', 'ch3'];
        vm.createChart = function(type_i) {
            var title = (types[type_i] == 'avg') ? 'Promedio' : 'Suma' ;
            console.log('home-chart1-' + types[type_i]);
            hc.stockChart('home-chart1-' + types[type_i], {
                useHighStocks: true,
                title: {
                    text: title + ' diario del Monitor 1'
                },
                rangeSelector: {
                    selected: 4
                },
                yAxis: {
                    labels: {
                        formatter: function () {
                            return (this.value > 0 ? ' + ' : '') + this.value + '%';
                        }
                    },
                    plotLines: [{
                        value: 0,
                        width: 2,
                        color: 'silver'
                    }]
                },
                plotOptions: {
                    series: {
                        compare: 'percent',
                        showInNavigator: true
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                    valueDecimals: 3,
                    split: true
                },
                series: seriesOptions[type_i],
                credits: {
                    enabled: false
                }
            });
        }
        _.each(types, function(type, type_i) {
            _.each(channels, function(element, i) {
                seriesOptions[type_i][i] = {};
                var params = {
                    'monitor_id': 1,
                    'channel': element,
                    'type': type
                };
                $http.get(GlobalsService.getAPIURL() + '/api/measures?' + $.param( params ) ).then(function(result){
                    seriesOptions[type_i][i] = {
                        id: element,
                        name: element,
                        data: result.data.data
                    };
                    seriesCounter[type_i] += 1;
                    if (seriesCounter[type_i] === channels.length) {
                        vm.createChart(type_i);
                    }
                },function(error){
                    console.log('error:', error);
                });
            });
        });
    }]);

})(angular, moment, _, Highcharts);
