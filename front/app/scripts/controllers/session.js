'use strict';

function sessionCtrl($state) {
  var vm = this;
  vm.signin = function() {
    $state.go('user.signin');
  };
  vm.submit = function() {
    $state.go('app.dashboard');
  };
}
angular.module('app').controller('sessionCtrl', ['$state', sessionCtrl]);