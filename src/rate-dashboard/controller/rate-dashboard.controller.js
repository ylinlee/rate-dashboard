(function() {
    'use strict';

    angular.module('rateApp.rate-dashboard')
        .controller('RateDashboardController', RateDashboardController);

    RateDashboardController.$inject = ['$scope', '$q', 'PeopleService', 'ReviewService', 'DataService', 'RateAssets'];

    function RateDashboardController($scope, $q, PeopleService, ReviewService, DataService, RateAssetsProvider) {
        var vm = this;
        vm.people = [];
        vm.reviews = [];
        vm.stars = {};
        vm.reviewsByPerson = {};
        vm.peopleOptions = [];

        _watchDataInfo();

        _active();

        function _active() {
            $scope.$emit('startLoading', 'RateDashboardController');
            var promises = [_peoplePromise(), _reviewsPromise()];

            return $q.all(promises).then(function() {
                _initDataInfo();
                $scope.$emit('endLoading', 'RateDashboardController');
            });

            function _peoplePromise() {
                return PeopleService.getPeople().then(function(dataPeople) {
                    vm.people = dataPeople;
                    if (!vm.people || vm.people.length === 0) {
                        return DataService.getData(RateAssetsProvider.assets.ASSETS_DATA + '/personajes.json').then(function(data) {
                            vm.people = data;
                            return vm.people;
                        });
                    }
                    return vm.people;
                });
            }

            function _reviewsPromise() {
                return ReviewService.getReviews().then(function(dataReviews) {
                    vm.reviews = dataReviews;
                    if (!vm.reviews || vm.reviews.length === 0) {
                        return DataService.getData(RateAssetsProvider.assets.ASSETS_DATA + '/valoraciones.json').then(function(data) {
                            vm.reviews = data;
                            return vm.reviews;
                        });
                    }
                    return vm.reviews;
                });
            }
        }

        function _watchDataInfo() {
            $scope.$watch('rateDashboardCtrl.people', _updatePeopleReference, true);
            $scope.$watch('rateDashboardCtrl.reviews', _updateReviewsReference, true);

            $scope.$watchGroup(['rateDashboardCtrl.people', 'rateDashboardCtrl.reviews'], _updateReference, true);

            function _updateReference(newValue, oldValue) {
                if (!newValue) {
                    return;
                }

                if (!newValue[0] || !newValue[1]) {
                    return;
                }


                if (newValue[0] === oldValue[0] && newValue[1] === oldValue[1]) {
                    return;
                }
                vm.people = vm.people !== newValue[0] ? newValue[0] : vm.people;
                vm.reviews = vm.reviews !== newValue[1] ? newValue[1] : vm.reviews;

                _initDataInfo();
            }

            function _updatePeopleReference(newValue, oldValue) {
                if (oldValue === newValue) {
                    return;
                }
                vm.people = newValue;
                _initDataInfo();
            }

            function _updateReviewsReference(newValue, oldValue) {
                if (oldValue === newValue) {
                    return;
                }
                vm.reviews = newValue;
                _initDataInfo();
            }
        }

        function _initDataInfo() {
            vm.stars = _generateStarsByPerson();
            vm.reviewsByPerson = _generateReviewsByPerson();
            vm.peopleOptions = _generatePeopleOptions();
            vm.panels = _generatePanelsInfo();

            function _generateStarsByPerson() {
                if (!vm.reviews || vm.reviews.length === 0) {
                    return;
                }

                var result = {
                    star0: 0,
                    star1: 0,
                    star2: 0,
                    star3: 0,
                    star4: 0,
                    star5: 0
                };

                var review;

                for (var i = 0; i < vm.reviews.length; i++) {
                    review = vm.reviews[i];
                    result['star' + review.stars]++;
                }

                return result;
            }

            function _generateReviewsByPerson() {
                var result = {};
                for (var i = 0; i < vm.people.length; i++) {
                    result[vm.people[i]._id] = { name: vm.people[i].nick, reviews: 0 };
                }
                for (var j = 0; j < vm.reviews.length; j++) {
                    if (result[vm.reviews[j].personId]) {
                        result[vm.reviews[j].personId].reviews++;
                    }
                }
                return result;
            }

            function _generatePeopleOptions() {
                var result = [];
                var person;
                for (var i = 0; i < vm.people.length; i++) {
                    person = vm.people[i];
                    result.push({
                        value: person._id,
                        text: person.nick
                    });
                }
                return result;
            }
        }

        function _generatePanelsInfo() {
            return [{
                value: '\u00A0',
                className: 'fa-dashboard',
                title: 'Dashboard',
                color: 'yellow',
                mensaje: 'Mostrar detalle',
                url: '#/dashboard/resume'
            }, {
                value: vm.people ? vm.people.length : 0,
                className: 'fa-users',
                title: 'Personajes',
                color: 'primary',
                mensaje: 'Mostrar detalle',
                url: '#/dashboard/people'
            }, {
                value: vm.reviews ? vm.reviews.length : 0,
                className: 'fa-star',
                title: 'Valoraciones',
                color: 'green',
                mensaje: 'Mostrar detalle',
                url: '#/dashboard/reviews'
            }];
        }
    }
})();
