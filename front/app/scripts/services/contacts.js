'use strict';

function contacts($q, $http) {
  var output = {};
  var contactUrl = 'data/contacts.json';
  output.getAll = function() {
    output.contacts = [];
    var deferred = $q.defer();
    return $http.get(contactUrl).success(function(data) {
      output.contacts = data;
      deferred.resolve(data);
    }).error(function(data) {
      deferred.reject(data);
    });
    return deferred.promise;
  };
  return output;
}
angular.module('app').service('contacts', ['$q', '$http', contacts]);