(function() {
    'use strict';

    angular.module('rateApp.rate-dashboard')
        .directive('ratePanel', RatePanel);

    function RatePanel() {
        return {
            restrict: 'A',
            templateUrl: 'src/rate-dashboard/template/rate-panel.template.html',
            controller: 'RatePanelController',
            controllerAs: 'ratePanelCtrl',
            scope: {
              elem: '='
            },
            bindToController: true
        };
    }
})();
