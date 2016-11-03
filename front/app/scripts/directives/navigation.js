'use strict';
/*
 * side-navigation - Main sidebar navigation directive
 */
function sideNavigation($localStorage, $window) {
  return {
    link: function(scope, element) {
      var controller = element.parent().controller();
      element.find('a').on('click', function(e) {
        var $this = angular.element(this),
          links = $this.parents('li'),
          parentLink = $this.closest('li'),
          otherLinks = angular.element('.sidebar-panel nav li').not(links),
          subMenu = $this.next();
        if (!subMenu.hasClass('sub-menu')) {
          controller.menu = false;
          return;
        }
        otherLinks.removeClass('open');
        if (subMenu.is('ul') && (subMenu.height() === 0)) {
          parentLink.addClass('open');
        } else if (subMenu.is('ul') && (subMenu.height() !== 0)) {
          parentLink.removeClass('open');
        }
        if (subMenu.is('ul')) {
          return false;
        }
        e.stopPropagation();
        return true;
      });
      element.find('> li > .sub-menu').each(function() {
        if (angular.element(this).find('ul.sub-menu').length > 0) {
          angular.element(this).addClass('multi-level');
        }
      });
    }
  };
}
angular.module('app').directive('sideNavigation', [sideNavigation]);