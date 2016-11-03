'use strict';

function draggablePortletsCtrl() {
  var vm = this;
  vm.draggableOpt = {
    connectWith: '.draggable-portlets',
    handle: '.portlet-heading',
    start: function() {
      angular.element('.draggable-portlets-wrapper').addClass('dragging');
    },
    stop: function() {
      angular.element('.draggable-portlets-wrapper').removeClass('dragging');
    }
  };
}
angular.module('app').controller('draggablePortletsCtrl', draggablePortletsCtrl);