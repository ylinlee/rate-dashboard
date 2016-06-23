(function() {
    'use strict';

  angular.module('rateApp.rate-dashboard')
    .controller('RateTableReviewController', RateTableReviewController);

  RateTableReviewController.$inject = ['$filter', 'ReviewService'];

  function RateTableReviewController($filter, reviewService) {
    var vm = this;
    vm.title = vm.title || 'Title';
    vm.reviews = vm.reviews || [];
    vm.peopleOptions = vm.peopleOptions || mockPeopleOptions();
    vm.showPerson = showPerson;
    vm.addReview = addReview;
    vm.removeReview = removeReview;
    vm.saveReview = saveReview;

    // remove review
    function removeReview(index) {
      var id = vm.reviews[index]._id;
      vm.reviews.splice(index, 1);
      if(id){
        reviewService.deleteReview(id);
      }
    }

    // add review
    function addReview() {
      vm.inserted = {
        stars: 0,
        description: '',
        personId: '',
        createDate: null
      };
      vm.reviews.push(vm.inserted);
    }

    function saveReview(data, id) {
      if(id){
        reviewService.updateReview(id, data);
      } else {
        data.createDate = Date.now();
        reviewService.addReview(data).then(function(response) {
          vm.inserted._id = response._id;
        });
      }
    }

    function mockPeopleOptions() {
      return [
        {value: '57504e7223bf601425000038', text: 'Luke Skywalker'},
        {value: '575050c823bf601425000039', text: 'R2-D2'},
        {value: '5750521f23bf60142500003a', text: 'Darth Vader'},
        {value: '575052ee23bf60142500003b', text: 'Han Solo'},
        {value: '575053cf23bf60142500003c', text: 'Leia Amidala'},
        {value: '5750547b23bf60142500003d', text: 'Yoda'}
      ];
    }

    function showPerson(personId) {
      var selected = [];
      if(personId) {
        selected = $filter('filter')(vm.peopleOptions, {value: personId});
      }
      return selected.length ? selected[0].text : 'Not set';
    }
  }
})();
