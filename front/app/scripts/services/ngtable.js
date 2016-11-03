'use strict';

function IssueService($resource) {
  return $resource('https://api.github.com/repos/:username/:repo/issues', {
    state: 'open'
  }, {
    query: {
      method: 'GET',
      isArray: true
    }
  });
}
angular.module('app').service('IssueService', ['$resource', IssueService]);