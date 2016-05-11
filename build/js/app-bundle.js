angular.module('WhiskyApp', ['ngRoute', 'appRoutes',

  // Controllers
  'MainCtrl',
  'HomeCtrl',
  'WhiskyListCtrl',

  // Services
  'WhiskyService',

  // Angular templatecache templates
  "templates"

]);
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {

		$routeProvider

			.when('/home', {
				templateUrl: 'views/Home/Home.html',
				controller: 'HomeController'
			})

			.when('/whiskylist', {
				templateUrl: 'views/WhiskyList/WhiskyList.html',
				controller: 'WhiskyListController'
			})

			.otherwise({
        redirectTo: '/home'
      });

		$locationProvider.html5Mode(true);

	}
]);
angular.module('MainCtrl', []).controller('MainController', ['$scope',
	function($scope) {

	}
]);
angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("views/Home/Home.html","<div class=\"container\">\r\n  <div>\r\n    <h1 class=\"text-center\">\r\n      Welcome to the AngularJS 1.x workshop\r\n    </h1>\r\n\r\n    <!-- Assignment 1 -->\r\n    <div class=\"panel panel-default\">\r\n      <div class=\"panel-heading\">\r\n        <h3 class=\"panel-title\">Assignment 1: List the whiskies</h3>\r\n      </div>\r\n      <div class=\"panel-body\">\r\n        <ul>\r\n          <li>\r\n            Find the file src/WhiskyList/WhiskyList.html and notice the table-element with ng-repeat\r\n          </li>\r\n          <li>\r\n            Discover the WhiskyListCtrl.js-file under the same folder and notice how it\'s tied\r\n            to the mentioned view in src/appRoutes.js\r\n          </li>\r\n          <li>\r\n            Notice the WhiskyService.js also in the same folder. This will\r\n            be the service that provides us with a JSON-file full of whisky\r\n          </li>\r\n          <li>\r\n            In WhiskyListCtrl, notice that the WhiskyService is already injected.\r\n            Call the WhiskyService, insert the whiskies into the scope and observe\r\n            as the whisky will start flowing into your screen when you refresh the page\r\n          </li>\r\n        </ul>\r\n        Related documentation:\r\n        <a href=\"https://docs.angularjs.org/api/ng/directive/ngRepeat\">NgRepeat</a>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Assignment 2 -->\r\n    <div class=\"panel panel-default\">\r\n      <div class=\"panel-heading\">\r\n        <h3 class=\"panel-title\">\r\n          Assignment 2: Filter the whiskies\r\n        </h3>\r\n      </div>\r\n      <div class=\"panel-body\">\r\n        <ul>\r\n          <li>\r\n            Find your way back to the WhiskyList.html and notice the commented\r\n            out input-element in the beginning of the file.\r\n          </li>\r\n          <li>\r\n            Familiarize yourself with the filter-documentation below and implement\r\n            a search-filter for the whisky list\r\n          </li>\r\n        </ul>\r\n        Related documentation:\r\n        <a href=\"https://docs.angularjs.org/api/ng/filter/filter\">Filter</a>\r\n\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Assignment 3 -->\r\n    <div class=\"panel panel-default\">\r\n      <div class=\"panel-heading\">\r\n        <h3 class=\"panel-title\">\r\n          Assignment 3: A new view of whisky\r\n        </h3>\r\n      </div>\r\n      <div class=\"panel-body\">\r\n        <ul>\r\n          <li>\r\n            Navigate to src/WhiskyList/WhiskyListItemDetails and open the file\r\n            WhiskyListItemCtrl.js\r\n          </li>\r\n          <li>\r\n            Follow the instructions provided in the file and create a details\r\n            view which will be shown when a whisky is selected from the list\r\n          </li>\r\n        </ul>\r\n        Related documentation:\r\n        <a href=\"https://docs.angularjs.org/api/ngRoute\">NgRoute</a>\r\n\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Assignment 4 -->\r\n    <div class=\"panel panel-default\">\r\n      <div class=\"panel-heading\">\r\n        <h3 class=\"panel-title\">\r\n          Bonus assignment: Stop the copy paste\r\n        </h3>\r\n      </div>\r\n      <div class=\"panel-body\">\r\n        <ul>\r\n          <li>\r\n            Directives provide a clever way of reusing similar functionality\r\n            thoughout the application. This removes the need to copy similar\r\n            elements between views and makes the application more modular.\r\n          </li>\r\n          <li>\r\n            Implement a directive that replaces a single row in the whisky list.\r\n            You may utilize the template file located at src/WhiskyList/WhiskyListItemDirective.js\r\n          </li>\r\n          <li>\r\n            Observe that the directive is named \'listItem\', but when you use it as\r\n            an element, the correct way to reference it is with \'list-item\'\r\n          </li>\r\n        </ul>\r\n        Related documentation:\r\n        <a href=\"https://docs.angularjs.org/guide/directive\">Directive</a>\r\n\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n");
$templateCache.put("views/WhiskyList/WhiskyList.html","<div class=\"container\">\r\n\r\n	<!-- Related to assignment 2 -->\r\n	<!--\r\n	<div class=\"row\">\r\n		<div class=\"col-md-4\">\r\n			<label for=\"filterInput\">Filter whiskies</label>\r\n			<input id=\"filterInput\" class=\"form-control\">\r\n		</div>\r\n	</div>\r\n\r\n	<hr>-->\r\n\r\n	<!-- Related to assignment 1 -->\r\n	<table class=\"table table-bordered table-striped table-hover\" ng-if=\"whiskies != null\">\r\n		<thead>\r\n			<th>Name</th>\r\n			<th>Age</th>\r\n		</thead>\r\n		<tbody ng-repeat=\"whisky in whiskies\">\r\n			<td>{{whisky.name}}</td>\r\n			<td>{{whisky.age}}</td>\r\n		</tbody>\r\n	</table>\r\n</div>\r\n");
$templateCache.put("views/WhiskyList/WhiskyListItem.html","<!-- Template file for WhiskyListItemDirective -->\r\n");}]);
angular.module('HomeCtrl', []).controller('HomeController', ['$scope', function($scope) {

}]);
angular.module('WhiskyListCtrl', []).controller('WhiskyListController', [
  '$scope', 'Whisky', function($scope, Whisky) {

  }
]);

// Placeholder for a single whisky table list item directive
angular.module('WhiskyListItemDirective', []).directive('listItem', function() {

});

angular.module('WhiskyService', []).factory('Whisky', ['$http',
	function($http) {
		return {
            get: function (callback) {
                $http.get('content/whiskies.json')
                .success(function (data, status) {
                    callback(data.whiskies, true);
                })
                .error(function (data, status) {
                    callback(data, false);
                });
            }
        };
	}
]);

// Assignment 3
// Create a controller named WhiskyListItemCtrl here
// Add the new controller to app.js
// Create a corresponding view and assign a route to it and this controller in appRoutes.js
