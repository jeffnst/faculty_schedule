'use strict';

function tableEditableCtrl($filter, $http, editableOptions, editableThemes) {
  var vm = this;
  editableThemes.bs3.inputClass = 'form-control-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
  
  vm.user = {
    email: 'email@example.com',
    tel: '123-45-67',
    number: 29,
    range: 10,
    url: 'http://example.com',
    search: 'blabla',
    color: '#6a4415',
    date: null,
    time: '12:30',
    datetime: null,
    month: null,
    week: null
  };
  
  vm.users = [{
    id: 1,
    name: 'awesome user1',
    status: 2,
    group: 4,
    groupName: 'admin'
  }, {
    id: 2,
    name: 'awesome user2',
    status: undefined,
    group: 3,
    groupName: 'vip'
  }, {
    id: 3,
    name: 'awesome user3',
    status: 2,
    group: null
  }];
  
  vm.statuses = [{
    value: 1,
    text: 'status1'
  }, {
    value: 2,
    text: 'status2'
  }, {
    value: 3,
    text: 'status3'
  }, {
    value: 4,
    text: 'status4'
  }];
  
  vm.groups = [];
  vm.loadGroups = function() {
    return vm.groups.length ? null : $http.get('data/groups.json').success(function(data) {
      vm.groups = data;
    });
  };
  vm.showGroup = function(user) {
    if (user.group && vm.groups.length) {
      var selected = $filter('filter')(vm.groups, {
        id: user.group
      });
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return user.groupName || 'Not set';
    }
  };
  
  vm.showStatus = function(user) {
    var selected = [];
    if (user.status) {
      selected = $filter('filter')(vm.statuses, {
        value: user.status
      });
    }
    return selected.length ? selected[0].text : 'Not set';
  };
  
  vm.checkName = function(data, id) {
    if (id === 2 && data !== 'awesome') {
      return 'Username 2 should be `awesome`';
    }
  };
  
  vm.saveUser = function(data, id) {
    angular.extend(data, {
      id: id
    });
    return $http.post('/saveUser', data);
  };
  
  // remove user
  vm.removeUser = function(index) {
    vm.users.splice(index, 1);
  };
  
  // add user
  vm.addUser = function() {
    vm.inserted = {
      id: vm.users.length + 1,
      name: '',
      status: null,
      group: null
    };
    vm.users.push(vm.inserted);
  };
  vm.checkName2 = function(data) {
    if (data !== 'awesome') {
      return 'Username should be `awesome`';
    }
  };
  
  vm.saveColumn = function(column) {
    var results = [];
    angular.forEach(this.users, function(user) {
      results.push($http.post('/saveColumn', {column: column, value: user[column], id: user.id}));
    })
    return $q.all(results);
  };
  
  vm.checkName3 = function(data, id) {
    if (id === 2 && data !== 'awesome') {
      return 'Username 2 should be `awesome`';
    }
  };
  
  // filter users to show
  vm.filterUser = function(user) {
    return user.isDeleted !== true;
  };
  
  // mark user as deleted
  vm.deleteUser = function(id) {
    var filtered = $filter('filter')(vm.users, {
      id: id
    });
    if (filtered.length) {
      filtered[0].isDeleted = true;
    }
  };
  
  // add user
  vm.addUser2 = function() {
    vm.users.push({
      id: vm.users.length + 1,
      name: '',
      status: null,
      group: null,
      isNew: true
    });
  };
  
  // cancel all changes
  vm.cancel = function() {
    for (var i = vm.users.length; i--;) {
      var user = vm.users[i];
      // undelete
      if (user.isDeleted) {
        delete user.isDeleted;
      }
      // remove new
      if (user.isNew) {
        vm.users.splice(i, 1);
      }
    }
  };
  
  // save edits
  vm.saveTable = function() {
    var results = [];
    for (var i = vm.users.length; i--;) {
      var user = vm.users[i];
      // actually delete user
      if (user.isDeleted) {
        vm.users.splice(i, 1);
      }
      // mark as not new
      if (user.isNew) {
        user.isNew = false;
      }
      // send on server
      results.push($http.post('/saveUser', user));
    }
    return $q.all(results);
  };
}

angular.module('app').controller('tableEditableCtrl', ['$filter', '$http', 'editableOptions', 'editableThemes', tableEditableCtrl]);
angular.module('app').factory('editableIcons', function() {
  var icons = {
    //Icon-set to use, defaults to bootstrap icons
    default: {
      'bs2': {
        ok: 'icon-ok icon-white',
        cancel: 'icon-remove'
      },
      'bs3': {
        ok: 'fa fa-check',
        cancel: 'fa fa-times'
      }
    },
    external: {
      'font-awesome': {
        ok: 'fa fa-check',
        cancel: 'fa fa-times'
      }
    }
  };
  return icons;
});