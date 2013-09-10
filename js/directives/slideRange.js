/*Copyright (c) 2013 BMC Software. All rights reserved.  */

(function (){
	'use strict';
	angular.module('directives')
		.directive('ngRange', ['$compile',
			function ($compile, $templateCache, $http, $timeout) {
				return {
					restrict: "A",
					replace: true,
					template:
						'<div class="range__container">' +
							'<div class="range__scale"></div>'+
							'<div class="range__bar">' +
								'<div class="range__arrow range__left-arrow"></div>'+
								'<div class="range__arrow range__right-arrow"></div>'+
							'</div>'+
						'</div>',
					link: function (scope, element, attrs) {

					console.log("fsdfasdfasdfasfd")
				}
			}
		}]);
}
	());
