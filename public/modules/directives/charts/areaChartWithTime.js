/**
 *
 * @author Catalin Manolescu <cc.manolescu@gmail.com>
 */

/*'use strict';*/

SwarmMonitor.directive('areaChartWithTime', [function() {
    
    var controller = ['$scope', '$state', '$rootScope', '$element',
        function($scope, $translate, $state, $rootScope, $element){
            console.log('AMCHARTS controller');
        }];

    var defaultConfig = {
        categoryField: 'date',
        valueField: 'data',
        enableScrollBar: true,
        category: {
            parseDates: true, // in order char to understand dates, we should set parseDates to true
            minPeriod: 'ss', // 'mm' for minute interval			 
            gridAlpha: 0.07,
            axisColor: '#DADADA',
            categoryBalloonDateFormat: 'JJ:NN, DD MMMM'
        },
        value: {
            gridAlpha: 0.07,
            title: "Value type"
        },
        graph: {
            type: 'line', // try to change it to "column"
            title: 'red line',
            lineAlpha: 1,
            lineColor: '#d1cf2a',
            fillAlphas: 0.3 // setting fillAlphas to > 0 value makes it area graph
        }
    };
    return {
        replace: true,
        template: '<div style="width: 100%; height: 400px;"></div>',
        restrict: 'E',
        scope: {
            config: '=config',
            data: '=data',
            pause:'=pause'
        },
        controller: controller,
        link: function (scope, element, attr) {
            var chart;
            
            var id = _.uniqueId('chart-');
            element.attr('id', id);
            console.log('chart', id);
            var config = scope.config || defaultConfig;
            
            var initChart = function() {
                if (chart) {
                    chart.destroy();
                }
                // SERIAL CHART
                chart = new AmCharts.makeChart(id,{
                    type: "serial",
                    theme: "none",
                    marginLeft: 20,
                    pathToImages: "./images/amcharts/",
                    dataProvider: scope.data,
                    categoryField: config.categoryField,
                    //dataDateFormat: 'MM SS',
                    categoryAxis: {
                        parseDates: config.category.parseDates || defaultConfig.category.parseDates,
                        minPeriod: config.category.minPeriod || defaultConfig.category.minPeriod,
                        gridAlpha: config.category.gridAlpha || defaultConfig.category.gridAlpha,
                        axisColor: config.category.axisColor || defaultConfig.category.axisColor,
                        minorGridAlpha: config.category.gridAlpha || defaultConfig.category.gridAlpha,
                        minorGridEnabled: true
                    },
                    valueAxes: [{
                        gridAlpha: config.value.gridAlpha || defaultConfig.value.gridAlpha,
                        title: config.value.title || defaultConfig.value.title
                    }],
                    graphs: [{
                        valueField:config.valueField,
                        balloonText: config.graph.balloonText || "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
                        type: config.graph.type || defaultConfig.graph.type,
                        title: config.graph.title || defaultConfig.graph.title,
                        lineAlpha: config.graph.lineAlpha || defaultConfig.graph.lineAlpha,
                        lineColor: config.graph.lineColor || defaultConfig.graph.lineColor,
                        fillAlphas: config.graph.fillAlphas || defaultConfig.graph.fillAlphas
                    }],
                    chartScrollbar: {},
                    chartCursor: {
                        categoryBalloonDateFormat: config.category.categoryBalloonDateFormat || defaultConfig.category.categoryBalloonDateFormat,
                        //"cursorAlpha": 0.2,
                        "cursorPosition": "mouse"
                    }
                });
                
            };
            
            initChart();
            
            var checker;
            scope.$watch('pause', function(newValue, oldValue){
                if (newValue === true) {
                    clearInterval(checker);
                } else {
                    checker = setInterval(function(){
                        //check for new data
                        chart.validateData();
                    },1000);
                }
            });
        }
    };
}]);