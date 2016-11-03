'use strict';

function MessagesCtrl(messages) {
  var vm = this;

  vm.folders = [{
    name: 'Inbox',
    folder: 'inbox',
    value: 78
  }, {
    name: 'Sent Mail',
    folder: 'sent'
  }, {
    name: 'Starred',
    folder: 'starred'
  }, {
    name: 'Draft',
    folder: 'draft'
  }, {
    name: 'Trash',
    folder: 'trash'
  }];
  
  vm.tags = [{
    name: 'Personal',
    color: 'primary',
  }, {
    name: 'Clients',
    color: 'success'
  }, {
    name: 'Family',
    color: 'warning'
  }, {
    name: 'Friends',
    color: 'danger'
  }, {
    name: 'Archives',
    color: 'default'
  }];
  
  vm.currentTag = null;
  vm.setCurrentTag = function(tag) {
    vm.currentTag = tag;
  };
  vm.isCurrentTag = function(tag) {
    return vm.currentTag !== null && tag.name === vm.currentTag.name;
  };
  
  vm.messages = [];
  messages.getAll().then(angular.bind(vm, function then() {
    vm.messages = messages.messages;
  }));
  
  vm.currentMessage = null;
  vm.setCurrentMessage = function(id) {
    messages.getById(id).then(angular.bind(vm, function then() {
      vm.currentMessage = messages.message[0];
    }));
  };
  vm.setCurrentMessage(1);
}
angular.module('app').controller('MessagesCtrl', ['messages', MessagesCtrl]);