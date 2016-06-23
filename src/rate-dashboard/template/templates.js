(function() {'use strict';angular.module('rateApp.rate-dashboard').run(['$templateCache', function($templateCache) {$templateCache.put('src/rate-dashboard/template/rate-bar-chart.template.html','<div class="panel-heading"><i class="fa fa-bar-chart-o fa-fw"></i> Valoraciones por personaje</div><div class="panel-body"><div class="row"><div class="col-lg-12"><div id="morris-bar-chart"></div></div></div></div>');
$templateCache.put('src/rate-dashboard/template/rate-dashboard.template.html','<style>#page-wrapper {\r\n    margin-top: 50px;\r\n}</style><div id="page-wrapper" class="container"><div class="row"><div class="col-lg-12"><h1 class="page-header">Dashboard</h1></div></div><div class="row"><div class="col-md-2"><ul class="nav in" id="side-menu"><li><a ui-sref=".resume" class="active"><i class="fa fa-dashboard fa-fw"></i> Dashboard</a></li><li><a ui-sref=".people"><i class="fa fa-users fa-fw"></i> Personajes</a></li><li><a ui-sref=".reviews"><i class="fa fa-star fa-fw"></i> Valoraciones</a></li></ul></div><div class="col-md-10"><div class="row"><div class="col-md-4" rate-panel elem="element" ng-repeat="element in rateDashboardCtrl.panels"></div></div><div ui-view></div><!--div ng-if="rateDashboardCtrl.showPeople" class="row animate-if" rate-table-people people="rateDashboardCtrl.people" title="Personajes">\r\n            </div>\r\n            <div ng-if="rateDashboardCtrl.showReviews" class="row animate-if" rate-table-review reviews="rateDashboardCtrl.reviews" title="Valoraciones" people-options="rateDashboardCtrl.peopleOptions">\r\n            </div>\r\n            <div class="row">\r\n                <div class="col-lg-8">\r\n                    <div class="panel panel-default" rate-bar-chart data="rateDashboardCtrl.reviewsByPerson"></div>\r\n                </div>\r\n                <div class="col-lg-4">\r\n                    <div class="panel panel-default" rate-donut-chart data="rateDashboardCtrl.stars">\r\n                    </div>\r\n                </div>\r\n            </div--></div></div></div>');
$templateCache.put('src/rate-dashboard/template/rate-donut-chart.template.html','<div class="panel-heading"><i class="fa fa-bar-chart-o fa-fw"></i> Cantidad de valoraciones por estrella</div><div class="panel-body"><div id="morris-donut-chart"></div></div>');
$templateCache.put('src/rate-dashboard/template/rate-panel.template.html','<style>.panel-green {\r\n    border-color: #5cb85c;\r\n}\r\n\r\n.panel-yellow {\r\n    border-color: #f0ad4e;\r\n}\r\n\r\n.panel-green .panel-heading {\r\n    border-color: #5cb85c;\r\n    color: #fff;\r\n    background-color: #5cb85c;\r\n}\r\n\r\n.panel-yellow .panel-heading {\r\n    border-color: #f0ad4e;\r\n    color: #fff;\r\n    background-color: #f0ad4e;\r\n}\r\n\r\n.panel-green a {\r\n    color: #5cb85c;\r\n}\r\n\r\n.panel-yellow a {\r\n    color: #f0ad4e;\r\n}\r\n\r\n.huge {\r\n    font-size: 40px;\r\n}</style><div class="panel panel-{{ratePanelCtrl.elem.color}}"><div class="panel-heading"><div class="row"><div class="col-xs-3"><i class="fa {{ratePanelCtrl.elem.className}} fa-5x"></i></div><div class="col-xs-9 text-right"><div class="huge">{{ratePanelCtrl.elem.value}}</div><div>{{ratePanelCtrl.elem.title}}</div></div></div></div><a ng-href="{{ratePanelCtrl.elem.url}}"><div class="panel-footer"><span class="pull-left">{{ratePanelCtrl.elem.mensaje}}</span> <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span><div class="clearfix"></div></div></a></div>');
$templateCache.put('src/rate-dashboard/template/rate-table-people.template.html','<div class="col-lg-12"><div class="panel panel-default"><div class="panel-heading"><i class="fa fa-bar-chart-o fa-fw"></i> {{rateTablePeopleCtrl.title}}</div><div class="panel-body inboxpanel-body"><div class="table-responsive"><table class="table table-bordered table-hover table-condensed"><tr style="font-weight: bold"><td>Name</td><td>Description</td><td>Profile Image</td><td>Background</td><td>Options</td></tr><tr ng-repeat="person in rateTablePeopleCtrl.people"><td><!-- editable name (text without validation) --> <span editable-text="person.nick" e-name="nick" e-form="rowform" e-required>{{ person.nick || \'empty\' }}</span></td><td><!-- editable description (text without validation) --> <span editable-textarea="person.job" e-rows="7" e-cols="30" e-name="job" e-form="rowform" e-required>{{ person.job || \'empty\' }}</span></td><td><!-- editable profileImg (text without validation) --> <span editable-textarea="person.profileImg" e-rows="7" e-cols="30" e-name="profileImg" e-form="rowform" e-required><img ng-show="!rowform.$visible" ng-src="{{ person.profileImg || \'empty\' }}"></span></td><td ng-style="{\'background\': !rowform.$visible ? person.background : \'\', \'background-size\': \'cover\'}"><span editable-textarea="person.background" e-rows="7" e-cols="30" e-name="background" e-form="rowform" e-required></span></td><td style="white-space: nowrap"><!-- form --><form editable-form name="rowform" onbeforesave="rateTablePeopleCtrl.savePerson($data, person._id)" ng-show="rowform.$visible" class="form-buttons form-inline" shown="rateTablePeopleCtrl.inserted == person"><button type="submit" ng-disabled="rowform.$waiting" class="btn btn-primary">save</button> <button type="button" ng-disabled="rowform.$waiting" ng-click="rowform.$cancel()" class="btn btn-default">cancel</button></form><div class="buttons" ng-hide="rowform.$visible"><button class="btn btn-primary" ng-click="rowform.$show()">edit</button> <button class="btn btn-danger" ng-click="rateTablePeopleCtrl.removePerson($index)">del</button></div></td></tr></table><button class="btn btn-default" ng-click="rateTablePeopleCtrl.addPerson()">Add row</button></div></div></div></div>');
$templateCache.put('src/rate-dashboard/template/rate-table-review.template.html','<div class="col-lg-12"><div class="panel panel-default"><div class="panel-heading"><i class="fa fa-bar-chart-o fa-fw"></i> {{rateTableReviewCtrl.title}}</div><div class="panel-body inboxpanel-body"><div class="table-responsive"><table class="table table-bordered table-hover table-condensed"><tr style="font-weight: bold"><td>Stars</td><td>Description</td><td>Person</td><td>Options</td></tr><tr ng-repeat="review in rateTableReviewCtrl.reviews"><td><!-- editable name (text without validation) --> <span editable-range="review.stars" e-name="stars" e-form="rowform" e-required e-step="1" e-min="0" e-max="5">{{ review.stars || \'empty\' }}</span></td><td><!-- editable description (text without validation) --> <span editable-textarea="review.description" e-rows="7" e-cols="30" e-name="description" e-form="rowform" e-required>{{ review.description || \'empty\' }}</span></td><td><!-- editable status (select-local) --> <span editable-select="review.personId" e-name="personId" e-form="rowform" e-ng-options="pOption.value as pOption.text for pOption in rateTableReviewCtrl.peopleOptions">{{ rateTableReviewCtrl.showPerson(review.personId) }}</span></td><td style="white-space: nowrap"><!-- form --><form editable-form name="rowform" onbeforesave="rateTableReviewCtrl.saveReview($data, review._id)" ng-show="rowform.$visible" class="form-buttons form-inline" shown="rateTableReviewCtrl.inserted == review"><button type="submit" ng-disabled="rowform.$waiting" class="btn btn-primary">save</button> <button type="button" ng-disabled="rowform.$waiting" ng-click="rowform.$cancel()" class="btn btn-default">cancel</button></form><div class="buttons" ng-hide="rowform.$visible"><button class="btn btn-primary" ng-click="rowform.$show()">edit</button> <button class="btn btn-danger" ng-click="rateTableReviewCtrl.removeReview($index)">del</button></div></td></tr></table><button class="btn btn-default" ng-click="rateTableReviewCtrl.addReview()">Add row</button></div></div></div></div>');}]);})();