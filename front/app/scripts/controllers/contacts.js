'use strict';

function contactsCtrl(contacts) {
  var vm = this;

  vm.currentIndex = null;
  
  vm.setCurrentIndex = function(id) {
    vm.currentIndex = id;
  };
  
  vm.isCurrentIndex = function(id) {
    return vm.currentIndex !== null && id === vm.currentIndex;
  };
  
  /* jshint validthis: true */
  vm.contacts = [];
  
  contacts.getAll().then(angular.bind(vm, function then() {
    vm.contacts = contacts.contacts;
  }));
  
  vm.setCurrentContact = function(id) {
    vm.currentContact = vm.contacts[id];
  };

  vm.setCurrentContact(1);
}
angular.module('app').controller('contactsCtrl', ['contacts', contactsCtrl]);