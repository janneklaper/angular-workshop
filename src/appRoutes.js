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

			.when('/whiskylistitem', {
				templateUrl: 'views/WhiskyList/WhiskyListItemDetails/WhiskyListItemDetails.html',
				controller: 'WhiskyListItemController'
			})

			.otherwise({
        redirectTo: '/home'
      });

		$locationProvider.html5Mode(true);

	}
]);