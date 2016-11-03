'use strict';

function FlotCtrl($interval, COLORS) {
  var vm = this;
  
  function getRandomArbitrary() {
    return Math.round(Math.random() * 100);
  };

  function getRandomData() {
    if (data.length > 0) {
      data = data.slice(1);
    }
    // Do a random walk
    while (data.length < totalPoints) {
      var prev = data.length > 0 ? data[data.length - 1] : 50,
        y = prev + Math.random() * 10 - 5;
      if (y < 0) {
        y = 0;
      } else if (y > 100) {
        y = 100;
      }
      data.push(y);
    }
    // Zip the generated y values with the x values
    var res = [];
    for (var i = 0; i < data.length; ++i) {
      res.push([i, data[i]]);
    }
    return res;
  };

  var visits = [
    [0, getRandomArbitrary()],
    [1, getRandomArbitrary()],
    [2, getRandomArbitrary()],
    [3, getRandomArbitrary()],
    [4, getRandomArbitrary()],
    [5, getRandomArbitrary()],
    [6, getRandomArbitrary()],
    [7, getRandomArbitrary()],
    [8, getRandomArbitrary()]
  ];
  
  var visitors = [
    [0, getRandomArbitrary()],
    [1, getRandomArbitrary()],
    [2, getRandomArbitrary()],
    [3, getRandomArbitrary()],
    [4, getRandomArbitrary()],
    [5, getRandomArbitrary()],
    [6, getRandomArbitrary()],
    [7, getRandomArbitrary()],
    [8, getRandomArbitrary()]
  ];
  
  var data = [],
    totalPoints = 300,
    updateInterval = 300;

  vm.options = [{
    colsize: 'col-lg-12',
    label: 'Line series',
    data: [{
      data: visits,
      color: COLORS.success
    }, {
      data: visitors,
      color: COLORS.default
    }],
    options: {
      series: {
        lines: {
          show: true,
          lineWidth: 0,
        },
        splines: {
          show: true,
          tension: 0.5,
          lineWidth: 1,
          fill: 0.2,
        },
        shadowSize: 0
      },
      grid: {
        color: COLORS.border,
        borderWidth: 1,
        hoverable: true,
      }
    }
  }, {
    colsize: 'col-lg-6',
    label: 'Grouped bar series',
    data: [{
      data: [
        [1391761856000, 80],
        [1394181056000, 40],
        [1396859456000, 20],
        [1399451456000, 20],
        [1402129856000, 50]
      ],
      bars: {
        show: true,
        barWidth: 7 * 24 * 60 * 60 * 1000,
        fill: true,
        lineWidth: 0,
        order: 1,
        fillColor: COLORS.info
      }
    }, {
      data: [
        [1391761856000, 50],
        [1394181056000, 30],
        [1396859456000, 10],
        [1399451456000, 70],
        [1402129856000, 30]
      ],
      bars: {
        show: true,
        barWidth: 7 * 24 * 60 * 60 * 1000,
        fill: true,
        lineWidth: 0,
        order: 2,
        fillColor: COLORS.danger
      }
    }, {
      data: [
        [1391761856000, 30],
        [1394181056000, 60],
        [1396859456000, 40],
        [1399451456000, 40],
        [1402129856000, 40]
      ],
      bars: {
        show: true,
        barWidth: 7 * 24 * 60 * 60 * 1000,
        fill: true,
        lineWidth: 0,
        order: 3,
        fillColor: COLORS.success
      }
    }],
    options: {
      grid: {
        hoverable: false,
        clickable: false,
        labelMargin: 8,
        color: COLORS.border,
        borderWidth: 0,
      },
      xaxis: {
        mode: 'time',
        timeformat: '%b',
        tickSize: [1, 'month'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        tickLength: 0,
        axisLabel: 'Month',
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 12,
        axisLabelFontFamily: 'Roboto',
        axisLabelPadding: 5
      }
    }
  }, {
    colsize: 'col-lg-6',
    label: 'Pie series',
    data: [{
      label: 'IE',
      data: 15,
      color: COLORS.danger
    }, {
      label: 'Safari',
      data: 14,
      color: COLORS.info
    }, {
      label: 'Chrome',
      data: 34,
      color: COLORS.warning
    }, {
      label: 'Opera',
      data: 13,
      color: COLORS.bodyBg
    }, {
      label: 'Firefox',
      data: 24,
      color: 'rgba(0,0,0,.5)'
    }],
    options: {
      series: {
        pie: {
          show: true,
          innerRadius: 0.5,
          stroke: {
            width: 0
          },
          label: {
            show: false,
          }
        }
      },
      legend: {
        show: true
      },
    }
  }, {
    colsize: 'col-lg-12',
    label: 'Realtime series',
    data: [getRandomData()],
    options: {
      colors: ['rgba(0,0,0,.5)'],
      lines: {
        lineWidth: 1,
      },
      grid: {
        color: COLORS.border,
        borderWidth: 0,
        hoverable: true
      },
      yaxis: {
        min: 0,
        max: 100
      }
    }
  }];
  
  $interval(function() {
    vm.options[3].data = [getRandomData()];
  }.bind(vm), updateInterval);
}
angular.module('app').controller('FlotCtrl', ['$interval', 'COLORS', FlotCtrl]);