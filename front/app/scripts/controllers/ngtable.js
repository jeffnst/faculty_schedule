'use strict';

function ngtableCtrl(NgTableParams, IssueService) {
  var vm = this;
  vm.tableParams = new NgTableParams({
    count: 25
  }, {
    getData: function(params) {
      return IssueService.query({
        page: params.page(),
        per_page: params.count(),
        state: 'all',
        username: 'esvit',
        repo: 'ng-table'
      }, function(data, headersGetter) {
        var headers = headersGetter(),
          pages = headers['link'].split(', '),
          totalPages = 1;
        // get total pages count
        angular.forEach(pages, function(page) {
          var parts = page.split(' rel=');
          if (parts[1] == '"last"') {
            totalPages = parseInt(parts[0].match(/page=(\d+)/)[1], 10);
          }
          if (totalPages == 1 && parts[1] == '"prev"') { // if last page
            totalPages = parseInt(parts[0].match(/page=(\d+)/)[1], 10) + 1;
          }
        });
        params.total(totalPages * params.count());
        return data;
      }).$promise;
    }
  });
}
angular.module('app').controller('ngtableCtrl', ['NgTableParams', 'IssueService', ngtableCtrl]);