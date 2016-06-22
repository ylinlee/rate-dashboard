(function() {
    'use strict';

    angular.module('rateApp.rate-dashboard')
        .directive('rateBarChart', RateBarChart);

    function RateBarChart() {
        return {
            restrict: 'A',
            templateUrl: 'src/rate-dashboard/template/rate-bar-chart.template.html',
            link: RateBarChartLink,
            controller: 'RateBarChartController',
            controllerAs: 'RateBarChartCtrl',
            scope: {
                data: '='
            }
        };
    }

    RateBarChartLink.$inject = ['$scope', '$element'];
    
    function RateBarChartLink(scope, element) {
        var vm = this;
        var xLabel = 'per';
        var yLabel = 'val';
        vm.barChart = Morris.Bar({
            element: $('#morris-bar-chart', element),
            data: _generateData(),
            xkey: xLabel,
            ykeys: [yLabel],
            labels: ['Valoraciones'],
            barColors: ['#f0ad4e'],
            xLabelAngle: 35,
            hideHover: 'auto'
        });

        scope.$watch('data', updateReference, true);

        function updateReference(newValue, oldValue) {
            if(newValue && newValue !== oldValue) {
                if(vm.barChart) {
                    vm.barChart.setData(_generateData());
                }
            }
        }

        function _generateData() {
            var result = [];
            var item;
            if(scope.data){
                var data = scope.data;
                for(var elem in data) {
                    item = {};
                    item[xLabel] = data[elem].name;
                    item[yLabel] = data[elem].reviews;
                    result.push(item);
                }
            }
            return result;
        }
    }
})();
