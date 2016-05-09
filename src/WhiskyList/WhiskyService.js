angular.module('WhiskyService', []).factory('Whisky', ['$http',
	function($http) {
		return {
            get: function (callback) {
                $http.get('http://dippa-cdn.s3.eu-central-1.amazonaws.com/whiskies.json')
                .success(function (data, status) {
                    callback(data, true);
                })
                .error(function (data, status) {
                    callback(data, false);
                });
            }
        };
	}
]);