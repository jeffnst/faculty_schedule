'use strict';
/*
 * vector - jvectormap directive
 */
function vector() {
  return {
    restrict: 'EA',
    scope: {
      options: '='
    },
    link: function(scope, element, attrs) {
      var chart = null;
      var data = scope.options;
      scope.$watch('data', function() {
        if (!chart) {
          chart = angular.element(element).vectorMap(data);
        } else {
          chart.vectorMap('get', 'mapObject').series.regions[0].setValues(scope.datamap);
        }
      });
    }
  };
}
angular.module('app.vector', []).directive('vector', [vector]);