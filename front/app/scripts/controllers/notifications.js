'use strict';

function NotificationsCtrl() {
  var vm = this;
  
  // UIBootstap alerts
  vm.alerts = [{
    type: 'danger',
    msg: 'Oh snap! Change a few things up and try submitting again.'
  }, {
    type: 'success',
    msg: 'Well done! You successfully read this important alert message.'
  }, {
    type: 'info',
    msg: 'Heads up! This alert needs your attention, but it\'s not super important.'
  }, {
    type: 'warning',
    msg: 'Warning! Best check yo self, you\'re not looking too good.'
  }];
  
  vm.addAlert = function() {
    vm.alerts.push({
      type: 'info',
      msg: 'Another alert!'
    });
  };
  
  vm.closeAlert = function(index) {
    vm.alerts.splice(index, 1);
  };
  
  //Noty
  var i = -1;
  var msgs = ['Your request has succeded!', 'Are you the six fingered man?', 'Inconceivable!', 'I do not think that means what you think it means.', 'Have fun storming the castle!'];
  
  vm.getMessage = function() {
    i++;
    if (i === msgs.length) {
      i = 0;
    }
    return msgs[i];
  };
  
  vm.showNoty = function() {
    var msg = angular.element('#message').val(),
      type = angular.element('#messenger-type').val().toLowerCase(),
      position = angular.element('#position').val();
    if (!msg) {
      msg = vm.getMessage();
    }
    if (!type) {
      type = 'error';
    }
    noty({
      theme: 'app-noty',
      text: msg,
      type: type,
      timeout: 3000,
      layout: position,
      closeWith: ['button', 'click'],
      animation: {
        open: 'animated fadeInDown', // Animate.css class names
        close: 'animated fadeOutUp', // Animate.css class names
      }
    });
  };
}
angular.module('app').controller('NotificationsCtrl', NotificationsCtrl);