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
