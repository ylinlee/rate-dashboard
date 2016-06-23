(function() {
    'use strict';

  angular
    .module('rateApp.rate-dashboard',[
      'xeditable',
      'rateApp.rate-services'
    ]);
})();

(function() {
    'use strict';

  angular.module('rateApp.rate-dashboard')
    .controller('RateBarChartController', RateBarChartController);

  function RateBarChartController() {
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
        createDate: Date.now()
      };
      vm.reviews.push(vm.inserted);
    }

    function saveReview(data, id) {
      if(id){
        reviewService.updateReview(id, data);
      } else {
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

(function() {
    'use strict';

    angular.module('rateApp.rate-dashboard')
        .directive('rateBarChart', RateBarChart);

    function RateBarChart() {
        return {
            restrict: 'A',
            templateUrl: 'src/rate-dashboard/template/rate-bar-chart.template.html',
            link: RateBarChartLink,
            controller: 'RateBarChartController',
            controllerAs: 'RateBarChartCtrl',
            scope: {
                data: '='
            }
        };
    }

    RateBarChartLink.$inject = ['$scope', '$element'];
    
    function RateBarChartLink(scope, element) {
        var vm = this;
        var xLabel = 'per';
        var yLabel = 'val';
        vm.barChart = Morris.Bar({
            element: $('#morris-bar-chart', element),
            data: _generateData(),
            xkey: xLabel,
            ykeys: [yLabel],
            labels: ['Valoraciones'],
            barColors: ['#f0ad4e'],
            xLabelAngle: 35,
            hideHover: 'auto'
        });

        scope.$watch('data', updateReference, true);

        function updateReference(newValue, oldValue) {
            if(newValue && newValue !== oldValue) {
                if(vm.barChart) {
                    vm.barChart.setData(_generateData());
                }
            }
        }

        function _generateData() {
            var result = [];
            var item;
            if(scope.data){
                var data = scope.data;
                for(var elem in data) {
                    item = {};
                    item[xLabel] = data[elem].name;
                    item[yLabel] = data[elem].reviews;
                    result.push(item);
                }
            }
            return result;
        }
    }
})();

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

(function() {'use strict';angular.module('rateApp.rate-dashboard').run(['$templateCache', function($templateCache) {$templateCache.put('src/rate-dashboard/template/rate-bar-chart.template.html','<div class="panel-heading">\r\n    <i class="fa fa-bar-chart-o fa-fw"></i> Valoraciones por personaje\r\n</div>\r\n<div class="panel-body">\r\n    <div class="row">\r\n        <div class="col-lg-12">\r\n            <div id="morris-bar-chart"></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n');
$templateCache.put('src/rate-dashboard/template/rate-dashboard.template.html','<style>\r\n#page-wrapper {\r\n    margin-top: 50px;\r\n}\r\n</style>\r\n<div id="page-wrapper" class="container">\r\n    <div class="row">\r\n        <div class="col-lg-12">\r\n            <h1 class="page-header">Dashboard</h1>\r\n        </div>\r\n    </div>\r\n    <div class="row">\r\n        <div class="col-md-2">\r\n            <ul class="nav in" id="side-menu">\r\n                <li>\r\n                    <a ui-sref=".resume" class="active"><i class="fa fa-dashboard fa-fw"></i> Dashboard</a>\r\n                </li>\r\n                <li>\r\n                    <a ui-sref=".people"><i class="fa fa-users fa-fw"></i> Personajes</a>\r\n                </li>\r\n                <li>\r\n                    <a ui-sref=".reviews"><i class="fa fa-star fa-fw"></i> Valoraciones</a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n        <div class="col-md-10">\r\n            <div class="row">\r\n                <div class="col-md-4" rate-panel elem="element" ng-repeat="element in rateDashboardCtrl.panels">\r\n                </div>\r\n            </div>\r\n            <div ui-view></div>\r\n            <!--div ng-if="rateDashboardCtrl.showPeople" class="row animate-if" rate-table-people people="rateDashboardCtrl.people" title="Personajes">\r\n            </div>\r\n            <div ng-if="rateDashboardCtrl.showReviews" class="row animate-if" rate-table-review reviews="rateDashboardCtrl.reviews" title="Valoraciones" people-options="rateDashboardCtrl.peopleOptions">\r\n            </div>\r\n            <div class="row">\r\n                <div class="col-lg-8">\r\n                    <div class="panel panel-default" rate-bar-chart data="rateDashboardCtrl.reviewsByPerson"></div>\r\n                </div>\r\n                <div class="col-lg-4">\r\n                    <div class="panel panel-default" rate-donut-chart data="rateDashboardCtrl.stars">\r\n                    </div>\r\n                </div>\r\n            </div-->\r\n        </div>\r\n    </div>\r\n</div>\r\n');
$templateCache.put('src/rate-dashboard/template/rate-donut-chart.template.html','<div class="panel-heading">\r\n    <i class="fa fa-bar-chart-o fa-fw"></i> Cantidad de valoraciones por estrella\r\n</div>\r\n<div class="panel-body">\r\n    <div id="morris-donut-chart"></div>\r\n</div>\r\n');
$templateCache.put('src/rate-dashboard/template/rate-panel.template.html','<style>\r\n.panel-green {\r\n    border-color: #5cb85c;\r\n}\r\n\r\n.panel-yellow {\r\n    border-color: #f0ad4e;\r\n}\r\n\r\n.panel-green .panel-heading {\r\n    border-color: #5cb85c;\r\n    color: #fff;\r\n    background-color: #5cb85c;\r\n}\r\n\r\n.panel-yellow .panel-heading {\r\n    border-color: #f0ad4e;\r\n    color: #fff;\r\n    background-color: #f0ad4e;\r\n}\r\n\r\n.panel-green a {\r\n    color: #5cb85c;\r\n}\r\n\r\n.panel-yellow a {\r\n    color: #f0ad4e;\r\n}\r\n\r\n.huge {\r\n    font-size: 40px;\r\n}\r\n</style>\r\n<div class="panel panel-{{ratePanelCtrl.elem.color}}">\r\n    <div class="panel-heading">\r\n        <div class="row">\r\n            <div class="col-xs-3">\r\n                <i class="fa {{ratePanelCtrl.elem.className}} fa-5x"></i>\r\n            </div>\r\n            <div class="col-xs-9 text-right">\r\n                <div class="huge">{{ratePanelCtrl.elem.value}}</div>\r\n                <div>{{ratePanelCtrl.elem.title}}</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <a ng-href="{{ratePanelCtrl.elem.url}}">\r\n        <div class="panel-footer">\r\n            <span class="pull-left">{{ratePanelCtrl.elem.mensaje}}</span>\r\n            <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>\r\n            <div class="clearfix"></div>\r\n        </div>\r\n    </a>\r\n</div>\r\n');
$templateCache.put('src/rate-dashboard/template/rate-table-people.template.html','<div class="col-lg-12">\r\n    <div class="panel panel-default">\r\n        <div class="panel-heading">\r\n            <i class="fa fa-bar-chart-o fa-fw"></i> {{rateTablePeopleCtrl.title}}\r\n        </div>\r\n        <div class="panel-body inboxpanel-body">\r\n            <div class="table-responsive">\r\n                <table class="table table-bordered table-hover table-condensed">\r\n                    <tr style="font-weight: bold">\r\n                        <td>Name</td>\r\n                        <td>Description</td>\r\n                        <td>Profile Image</td>\r\n                        <td>Background</td>\r\n                        <td>Options</td>\r\n                    </tr>\r\n                    <tr ng-repeat="person in rateTablePeopleCtrl.people">\r\n                        <td>\r\n                            <!-- editable name (text without validation) -->\r\n                            <span editable-text="person.nick" e-name="nick" e-form="rowform" e-required>\r\n                              {{ person.nick || \'empty\' }}\r\n                            </span>\r\n                        </td>\r\n                        <td>\r\n                            <!-- editable description (text without validation) -->\r\n                            <span editable-textarea="person.job" e-rows="7" e-cols="30" e-name="job" e-form="rowform" e-required>\r\n                              {{ person.job || \'empty\' }}\r\n                            </span>\r\n                        </td>\r\n                        <td>\r\n                            <!-- editable profileImg (text without validation) -->\r\n                            <span editable-textarea="person.profileImg" e-rows="7" e-cols="30" e-name="profileImg" e-form="rowform" e-required>\r\n                              <img ng-show="!rowform.$visible" ng-src="{{ person.profileImg || \'empty\' }}"/>\r\n                            </span>\r\n                        </td>\r\n                        <td ng-style="{\'background\': !rowform.$visible ? person.background : \'\', \'background-size\': \'cover\'}">\r\n                            <span editable-textarea="person.background" e-rows="7" e-cols="30" e-name="background" e-form="rowform" e-required>\r\n                            </span>\r\n                        </td>\r\n                        <td style="white-space: nowrap">\r\n                            <!-- form -->\r\n                            <form editable-form name="rowform" onbeforesave="rateTablePeopleCtrl.savePerson($data, person._id)" ng-show="rowform.$visible" class="form-buttons form-inline" shown="rateTablePeopleCtrl.inserted == person">\r\n                                <button type="submit" ng-disabled="rowform.$waiting" class="btn btn-primary">\r\n                                    save\r\n                                </button>\r\n                                <button type="button" ng-disabled="rowform.$waiting" ng-click="rowform.$cancel()" class="btn btn-default">\r\n                                    cancel\r\n                                </button>\r\n                            </form>\r\n                            <div class="buttons" ng-hide="rowform.$visible">\r\n                                <button class="btn btn-primary" ng-click="rowform.$show()">edit</button>\r\n                                <button class="btn btn-danger" ng-click="rateTablePeopleCtrl.removePerson($index)">del</button>\r\n                            </div>\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n                <button class="btn btn-default" ng-click="rateTablePeopleCtrl.addPerson()">Add row</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n');
$templateCache.put('src/rate-dashboard/template/rate-table-review.template.html','<div class="col-lg-12">\r\n    <div class="panel panel-default">\r\n        <div class="panel-heading">\r\n            <i class="fa fa-bar-chart-o fa-fw"></i> {{rateTableReviewCtrl.title}}\r\n        </div>\r\n        <div class="panel-body inboxpanel-body">\r\n            <div class="table-responsive">\r\n                <table class="table table-bordered table-hover table-condensed">\r\n                    <tr style="font-weight: bold">\r\n                        <td>Stars</td>\r\n                        <td>Description</td>\r\n                        <td>Person</td>\r\n                        <td>Options</td>\r\n                    </tr>\r\n                    <tr ng-repeat="review in rateTableReviewCtrl.reviews">\r\n                        <td>\r\n                            <!-- editable name (text without validation) -->\r\n                            <span editable-range="review.stars" e-name="stars" e-form="rowform" e-required e-step="1" e-min="0" e-max="5">\r\n                              {{ review.stars || \'empty\' }}\r\n                            </span>\r\n                        </td>\r\n                        <td>\r\n                            <!-- editable description (text without validation) -->\r\n                            <span editable-textarea="review.description" e-rows="7" e-cols="30" e-name="description" e-form="rowform" e-required>\r\n                              {{ review.description || \'empty\' }}\r\n                            </span>\r\n                        </td>\r\n                        <td>\r\n                            <!-- editable status (select-local) -->\r\n                            <span editable-select="review.personId" e-name="personId" e-form="rowform" e-ng-options="pOption.value as pOption.text for pOption in rateTableReviewCtrl.peopleOptions">\r\n                              {{ rateTableReviewCtrl.showPerson(review.personId) }}\r\n                            </span>\r\n                        </td>\r\n                        <td style="white-space: nowrap">\r\n                            <!-- form -->\r\n                            <form editable-form name="rowform" onbeforesave="rateTableReviewCtrl.saveReview($data, review._id)" ng-show="rowform.$visible" class="form-buttons form-inline" shown="rateTableReviewCtrl.inserted == review">\r\n                                <button type="submit" ng-disabled="rowform.$waiting" class="btn btn-primary">\r\n                                    save\r\n                                </button>\r\n                                <button type="button" ng-disabled="rowform.$waiting" ng-click="rowform.$cancel()" class="btn btn-default">\r\n                                    cancel\r\n                                </button>\r\n                            </form>\r\n                            <div class="buttons" ng-hide="rowform.$visible">\r\n                                <button class="btn btn-primary" ng-click="rowform.$show()">edit</button>\r\n                                <button class="btn btn-danger" ng-click="rateTableReviewCtrl.removeReview($index)">del</button>\r\n                            </div>\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n                <button class="btn btn-default" ng-click="rateTableReviewCtrl.addReview()">Add row</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n');}]);})();