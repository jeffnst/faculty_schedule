'use strict';

function tableCtrl() {
  var vm = this;
  vm.dataTableOpt = {
    'ajax': 'data/datatables-arrays.json'    
  };
}
angular.module('app').controller('tableCtrl', tableCtrl);