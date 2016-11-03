'use strict';

function maskCtrl() {
  var vm = this;
  vm.maskOpt = {
    autoclear: false
  };
}
angular.module('app').controller('maskCtrl', maskCtrl);