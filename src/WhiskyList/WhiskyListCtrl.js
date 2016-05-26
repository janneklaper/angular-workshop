angular.module('WhiskyListCtrl', []).controller('WhiskyListController', [
  '$scope', 'Whisky', function($scope, Whisky) {
  		Whisky.get(function(data){
  			$scope.whiskies = data;
  		});
  }
]);
