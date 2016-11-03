'use strict';

function colorsCtrl() {
	var vm = this;
	vm.brands = ['primary', 'default', 'warning', 'success', 'info', 'danger', 'dark'];
	vm.material = ['red', 'pink', 'purple', 'deeppurple', 'indigo', 'blue', 'lightblue', 'cyan', 'teal', 'green', 'lightgreen', 'lime', 'yellow', 'amber', 'orange', 'deeporange', 'brown', 'grey', 'bluegrey'];
}
angular.module('app').controller('colorsCtrl', colorsCtrl);