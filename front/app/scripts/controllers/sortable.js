'use strict';

function sortableCtrl() {
  var vm = this;
  vm.sortableOpt = {
    placeholder: 'ui-state-highlight',
    connectWith: '.connectedSortable'
  };
}
angular.module('app').controller('sortableCtrl', sortableCtrl);