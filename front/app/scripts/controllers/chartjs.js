'use strict';

function chartjsCtrl(COLORS) {
  var vm = this;
  
  //Bar
  vm.barLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  vm.barSeries = ['Series A', 'Series B'];
  vm.barData = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  
  //Line
  vm.lineLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  vm.lineSeries = ['Series A', 'Series B'];
  vm.lineData = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  
  //Doughnut
  vm.doughnutLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  vm.doughnutData = [300, 500, 100];
  
  //Radar
  vm.radarLabels = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
  vm.radarData = [
    [65, 59, 90, 81, 56, 55, 40],
    [28, 48, 40, 19, 96, 27, 100]
  ];
  
  //Pie
  vm.pieLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  vm.pieData = [300, 500, 100];
  
  //Polar
  vm.polarLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales', 'Tele Sales', 'Corporate Sales'];
  vm.polarData = [300, 500, 100, 40, 120];
}
angular.module('app').controller('chartjsCtrl', ['COLORS', chartjsCtrl]);

function chartjsOptions(ChartJsProvider, COLORS) {
  ChartJsProvider.setOptions({
    colours: [COLORS.primary, COLORS.success, COLORS.info, COLORS.danger, COLORS.default, COLORS.dark],
    scaleFontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    scaleFontSize: 10,
    responsive: true,
    maintainAspectRatio: true,
    tooltipFontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    tooltipFontSize: 12,
    tooltipTitleFontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    tooltipTitleFontSize: 13,
    tooltipTitleFontStyle: '500',
    tooltipCornerRadius: 0,
    tooltipFillColor: COLORS.dark
  });
}
angular.module('app').config('chartjsOptions', ['ChartJsProvider', 'COLORS', chartjsOptions]);