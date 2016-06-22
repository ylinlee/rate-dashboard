(function() {
    'use strict';

  angular.module('rateApp.rate-dashboard')
    .controller('RateTablePeopleController', RateTablePeopleController);

  RateTablePeopleController.$inject = ['PeopleService'];

  function RateTablePeopleController(peopleService) {
    var vm = this;
    vm.title = vm.title || 'Title';
    vm.people = vm.people || [];
    vm.addPerson = addPerson;
    vm.removePerson = removePerson;
    vm.savePerson = savePerson;

    // remove person
    function removePerson(index) {
      var id = vm.people[index]._id;
      vm.people.splice(index, 1);
      if(id){
        peopleService.deletePerson(id);
      }
    }

    // add person
    function addPerson() {
      vm.inserted = {
        nick: '',
        job: null,
        profileImg: null ,
        background: ','
      };
      vm.people.push(vm.inserted);
    }

    function savePerson(data, id) {
      if(id){
        peopleService.updatePerson(id, data);
      } else {
        peopleService.addPerson(data).then(function(response){
          vm.inserted._id = response._id;
        });
      }
    }
  }
})();
