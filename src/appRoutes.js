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