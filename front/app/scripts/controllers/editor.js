'use strict';

function editorCtrl() {
  var vm = this;
  vm.text = '<h2>Try me!</h2><p>super simple WYSIWYG editor on Bootstrap</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li style="color: blue;">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol>';
}
angular.module('app').controller('editorCtrl', editorCtrl);