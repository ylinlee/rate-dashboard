(function() {
    'use strict';

  angular.module('rateApp.rate-dashboard')
    .controller('RatePanelController', RatePanelController);

  RatePanelController.$inject = ['$scope'];

  function RatePanelController($scope) {
    var vm = this;
    vm.elem = vm.elem || mockElem();

    $scope.$watch('ratePanelCtrl.elem', updateElemReference, true);

    function updateElemReference(newValue, oldValue) {
      if(newValue.value !== oldValue.value) {
        vm.elem.value = newValue.value;
      }
    }

    function mockElem() {
      return {
        value: '0',
        className: 'fa-question',
        title: 'title',
        color: 'green',
        mensaje: 'Mostrar',
        url: '#/resume'
      };
    }
  }
})();
