'use strict';
/*
 * offscreen - Off canvas sidebar directive
 */
function menuPanel($window) {
  return {
    scope: {
      show: '=',
    },
    link: function(scope, element, attr) {
      scope.$watch('show', function(newVal, oldVal) {
        var win = angular.element($window);
        if (win.width() < 991 || angular.element('.app').hasClass('offcanvas')) {
          if (newVal && !oldVal) {
            angular.element('.app').addClass('offscreen move-right');
          } else {
            angular.element('.app').removeClass('offscreen move-left move-right');
          }
        }
      });
    }
  };
}
angular.module('app').directive('menuPanel', [menuPanel]);