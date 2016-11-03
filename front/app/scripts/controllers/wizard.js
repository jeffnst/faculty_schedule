'use strict';

function wizardCtrl() {
  var vm = this;
  vm.style = 'style1';
  vm.option1 = {
    //stepEffect: _stepEffect,
    stepStyle: vm.style,
    navPosition: 'top',
    //stepTransition: _stepTransition,
    //showButtons: _showButtons,
    //showStepNum: _showStepNum,
    prevBtn: '<i class="material-icons">arrow_back</i> Prev',
    nextBtn: 'Next <i class="material-icons">arrow_forward</i>',
    finishBtn: 'Finish'
  };
  vm.option2 = {
    //stepEffect: _stepEffect,
    stepStyle: vm.style,
    navPosition: 'right',
    validation: true,
    //stepTransition: _stepTransition,
    showButtons: true,
    //showStepNum: _showStepNum,
    prevBtn: '<i class="material-icons">arrow_back</i> Prev',
    nextBtn: 'Next <i class="material-icons">arrow_forward</i>',
    finishBtn: 'Finish',
    onNextClick: function(e, from, to, validation) {},
    onPrevClick: function(e, from, to) {},
    onFinishClick: function(e, validation) {}
  };
  vm.option3 = {
    //stepEffect: _stepEffect,
    stepStyle: vm.style,
    navPosition: 'left',
    //stepTransition: _stepTransition,
    //showButtons: _showButtons,
    //showStepNum: _showStepNum,
    prevBtn: '<i class="material-icons">arrow_back</i> Prev',
    nextBtn: 'Next <i class="material-icons">arrow_forward</i>',
    finishBtn: 'Finish'
  };
  vm.option4 = {
    //stepEffect: _stepEffect,
    stepStyle: vm.style,
    navPosition: 'bottom',
    //stepTransition: _stepTransition,
    //showButtons: _showButtons,
    //showStepNum: _showStepNum,
    prevBtn: '<i class="material-icons">arrow_back</i> Prev',
    nextBtn: 'Next <i class="material-icons">arrow_forward</i>',
    finishBtn: 'Finish'
  };
}
angular.module('app').controller('wizardCtrl', wizardCtrl);