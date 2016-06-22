(function() {
    'use strict';

  angular.module('rateApp.rate-dashboard')
    .controller('RateDonutChartController', RateDonutChartController);

  function RateDonutChartController() {
    var vm = this;
    vm.data = vm.data || mockData();

    function mockData() {
      return[{
          name: 'Luke Skywalker',
          reviews: 1
        },{
          name: 'R2-D2',
          reviews: 2
        },{
          name: 'Darth Vader',
          reviews: 3
        },{
          name:'Han Solo',
          reviews: 4
        },{
          name: 'Leia Amidala',
          reviews: 5
        },{
          name: 'Yoda',
          reviews: 6
        }];
    }
  }
})();
