(function() {
    'use strict';

    angular.module('rateApp.rate-dashboard')
        .directive('rateDonutChart', RateDonutChart);

    function RateDonutChart() {
        return {
            restrict: 'A',
            templateUrl: 'src/rate-dashboard/template/rate-donut-chart.template.html',
            link: RateDonutChartLink,
            controller: 'RateDonutChartController',
            controllerAs: 'RateDonutChartCtrl',
            scope: {
                data: '='
            }
        };
    }

    RateDonutChartLink.$inject = ['$scope', '$element'];

    function RateDonutChartLink(scope, element) {
        var vm = this;
        vm.donutChart = Morris.Donut({
            element: $('#morris-donut-chart',element),
            data: _generateData()
        });

        scope.$watch('data', updateReference, true);

        function updateReference(newValue, oldValue) {
            if(newValue && newValue !== oldValue){
                if(vm.donutChart){
                    vm.donutChart.setData(_generateData());
                }
            }
        }

        function _generateData() {
            return [{
                label: '\u2606\u2606\u2606\u2606\u2606',
                value: _getValue('star0')
            }, {
                label: '\u2605\u2606\u2606\u2606\u2606',
                value: _getValue('star1')
            }, {
                label: '\u2605\u2605\u2606\u2606\u2606',
                value: _getValue('star2')
            }, {
                label: '\u2605\u2605\u2605\u2606\u2606',
                value: _getValue('star3')
            }, {
                label: '\u2605\u2605\u2605\u2605\u2606',
                value: _getValue('star4')
            }, {
                label: '\u2605\u2605\u2605\u2605\u2605',
                value: _getValue('star5')
            }];

            function _getValue(star) {
                if(!scope.data) {
                    return _initRandomValue();
                }
                var data = scope.data;
                return data[star] !== undefined ? data[star] : _initRandomValue();
            }

            function _initRandomValue() {
                return Math.round(Math.random() * 10);
            }
        }
    }
})();
