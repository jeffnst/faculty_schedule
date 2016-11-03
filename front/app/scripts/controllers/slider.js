'use strict';

function sliderCtrl() {
  var vm = this;
  vm.vertical = {
    orientation: 'vertical'
  };
  vm.sliderOpt1 = {
    value: 20
  };
  vm.sliderOpt2 = {
    values: [75, 300],
    range: true,
    min: 0,
    max: 500
  };
  vm.sliderOpt3 = {
    value: 80,
    range: 'min'
  };
  vm.sliderOpt7 = {
    value: 30,
    range: 'min'
  };
  vm.sliderOpt8 = {
    value: 40,
    range: 'min'
  };
  vm.sliderOpt9 = {
    value: 50,
    range: 'min'
  };
  vm.sliderOpt10 = {
    value: 60,
    range: 'min'
  };
  vm.sliderOpt11 = {
    value: 70,
    range: 'min'
  };
  vm.sliderOpt12 = {};
  angular.extend(vm.sliderOpt12, vm.sliderOpt1, vm.vertical);
  vm.sliderOpt13 = {};
  angular.extend(vm.sliderOpt13, vm.sliderOpt7, vm.vertical);
  vm.sliderOpt14 = {};
  angular.extend(vm.sliderOpt14, vm.sliderOpt8, vm.vertical);
  vm.sliderOpt15 = {};
  angular.extend(vm.sliderOpt15, vm.sliderOpt9, vm.vertical);
  vm.sliderOpt16 = {};
  angular.extend(vm.sliderOpt16, vm.sliderOpt10, vm.vertical);
  vm.sliderOpt17 = {};
  angular.extend(vm.sliderOpt17, vm.sliderOpt11, vm.vertical);
}
angular.module('app').controller('sliderCtrl', sliderCtrl);