(function() {
    'use strict';

    angular.module('rateApp.rate-dashboard')
        .directive('rateTablePeople', RateTablePeople);

    function RateTablePeople() {
        return {
            restrict: 'A',
            templateUrl: 'src/rate-dashboard/template/rate-table-people.template.html',
            controller: 'RateTablePeopleController',
            controllerAs: 'rateTablePeopleCtrl',
            scope: {
                title: '@',
                people: '='
            },
            bindToController: true
        };
    }
})();
