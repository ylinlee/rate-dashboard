(function() {
    'use strict';

    angular.module('rateApp.rate-dashboard')
        .directive('rateDashboard', RateDashboard);

    function RateDashboard() {
        return {
            restrict: 'E',
            templateUrl: 'src/rate-dashboard/template/rate-dashboard.template.html',
            controller: 'RateDashboardController',
            controllerAs: 'rateDashboardCtrl'
        };
    }
})();
