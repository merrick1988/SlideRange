(function () {
	'use strict';
	var app = angular.module('mainModule', ['directives']).
		controller('mainController', ['$scope', function($scope){
			$scope.scales = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		}]);
	angular.module("directives", []);
}());