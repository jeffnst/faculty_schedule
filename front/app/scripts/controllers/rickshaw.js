'use strict';

function rickshawCtrl($scope, COLORS) {
  var vm = this;
  
  vm.options = [{
    label: 'X-Axis',
    options: {
      renderer: 'area'
    },
    features: {
      xAxis: {
        timeUnit: 'year'
      },
      hover: {
        yFormatter: function(y) {
          return Math.round(y);
        }
      }
    },
    series: [{
      color: COLORS.primary,
      name: 'Series1',
      data: [{
        x: 0 * 60,
        y: 92228531
      }, {
        x: 30 * 60,
        y: 106021568
      }, {
        x: 60 * 60,
        y: 123202660
      }, {
        x: 90 * 60,
        y: 132165129
      }, {
        x: 120 * 60,
        y: 151325798
      }, {
        x: 150 * 60,
        y: 179323175
      }, {
        x: 180 * 60,
        y: 203211926
      }, {
        x: 210 * 60,
        y: 226545805
      }, {
        x: 240 * 60,
        y: 248709873
      }, {
        x: 270 * 60,
        y: 281421906
      }, {
        x: 300 * 60,
        y: 308745538
      }]
    }]
  }, {
    label: 'X-Axis and Y-Axis',
    options: {
      renderer: 'area'
    },
    features: {
      xAxis: true,
      yAxis: {
        tickFormat: 'formatKMBT'
      },
      hover: {
        xFormatter: function(x) {
          return new Date(x * 1000).toString();
        },
        yFormatter: function(y) {
          return Math.round(y);
        }
      }
    },
    series: [{
      color: COLORS.danger,
      name: 'Series2',
      data: [{
        x: 0 * 60,
        y: 92228531
      }, {
        x: 30 * 60,
        y: 106021568
      }, {
        x: 60 * 60,
        y: 123202660
      }, {
        x: 90 * 60,
        y: 132165129
      }, {
        x: 120 * 60,
        y: 151325798
      }, {
        x: 150 * 60,
        y: 179323175
      }, {
        x: 180 * 60,
        y: 203211926
      }, {
        x: 210 * 60,
        y: 226545805
      }, {
        x: 240 * 60,
        y: 248709873
      }, {
        x: 270 * 60,
        y: 281421906
      }, {
        x: 300 * 60,
        y: 308745538
      }]
    }]
  }];
}
angular.module('app').controller('rickshawCtrl', ['$scope', 'COLORS', rickshawCtrl]);