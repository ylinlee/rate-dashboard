(function() {
    'use strict';

    angular.module('rateApp.rate-dashboard')
        .directive('rateTableReview', RateTableReview);

    function RateTableReview() {
        return {
            restrict: 'A',
            templateUrl: 'src/rate-dashboard/template/rate-table-review.template.html',
            controller: 'RateTableReviewController',
            controllerAs: 'rateTableReviewCtrl',
            scope: {
                title: '@',
                reviews: '=',
                peopleOptions: '='
            },
            bindToController: true
        };
    }
})();
