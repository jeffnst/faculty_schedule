'use strict';

function uploadCtrl(FileUploader) {
  var vm = this;
  var uploader = vm.uploader = new FileUploader({
    url: 'scripts/upload.php'
  });
  // FILTERS
  uploader.filters.push({
    name: 'customFilter',
    fn: function(item /*{File|FileLikeObject}*/ , options) {
      return this.queue.length < 10;
    }
  });
}
angular.module('app').controller('uploadCtrl', ['FileUploader', uploadCtrl]);