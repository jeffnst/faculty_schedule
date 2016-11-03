'use strict';

function galleryCtrl() {
  var vm = this;

  vm.ran = [];
  for (var i = 1; i <= 16; i += 1) {
    vm.ran.push(i);
  }
}
angular.module('app').controller('galleryCtrl', galleryCtrl);