/*Copyright (c) 2013 BMC Software. All rights reserved.  */

(function (){
	'use strict';
	angular.module('directives')
		.directive('ngRange', ['$compile',
			function ($compile) {
				return {
					restrict: "A",
					replace: true,
					scope: {scales: '='},
					template:
						'<div class="range__container">' +
							'<div class="range__bar">'+
								'<div class="range__limit">{{scales[0]}}</div>'+
								'<div ng-repeat="scale in innerScales" class="range__scale-separator" ng-style="{width: scaleWidth}" ng-click="setHandlePosition($event, $index)"></div>'+
//								'<div class="range__scale-separator" ng-style="{width: scaleWidth}" ng-click="setHandlePosition($event, innerScales.length)"></div>'+
								'<div class="range__limit">{{scales[scales.length-1]}}</div>'+
								'<div class="range__handle" ng-style="{left: handlePosition}"></div>'+
								'<div class="range__scale-tooltip" ng-style="{left: tooltipPosition}">{{currentStep}}</div>'+
							'</div>'+
						'</div>',
					link: function (scope, element, attrs) {
						var init, updateHandlePosition,
							handleWidth = element[0].children[0].children[2].offsetWidth,
							tooltipWidth = element[0].children[0].children[3].offsetWidth,
							range = angular.element(element[0].children[0])[0],
							rangeWidth =  element[0].children[0].innerWidth;
						scope.currentStep = 5;
						scope.innerScales = _.toArray(scope.scales)
						scope.scaleWidth = Math.floor(rangeWidth / (scope.innerScales.length)) + 'px';


						updateHandlePosition = function(step){
							var shift =  parseInt(scope.scaleWidth) * step, // consider the shift based on the current step
								handleShift =  shift - handleWidth / 2, //  move the handle to the left exactly half its width
								tooltipShift = shift - tooltipWidth / 2;  //  move the tooltip to the left exactly half its width

							scope.handlePosition = handleShift + "px";
							scope.tooltipPosition = tooltipShift + "px";
						};

						scope.setHandlePosition = function(event, index){
							var dif = event.clientX - range.offsetLeft,
								currentLeftShift =  index *  parseInt(scope.scaleWidth);

							if(index === 0){
								scope.currentStep = 1;
								updateHandlePosition(scope.currentStep);
								return;
							}
							if(index === scope.innerScales.length){
								scope.currentStep = scope.innerScales.length;
								updateHandlePosition(scope.currentStep);
								return;
							}
							if(currentLeftShift +  parseInt(scope.scaleWidth) / 2 < dif){
								scope.currentStep = index + 1;
							} else if(currentLeftShift -  parseInt(scope.scaleWidth) / 2 > dif){
								scope.currentStep = index - 1;
							} else{
								scope.currentStep = index;
							}
							updateHandlePosition(scope.currentStep);
						}

						init = function(){
							updateHandlePosition(scope.currentStep);
						}

						init();
					}
			}
		}]);
}
	());
