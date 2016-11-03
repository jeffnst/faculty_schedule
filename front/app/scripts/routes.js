'use strict';

angular.module('app').run(['$rootScope', '$state',
  function($rootScope, $state) {
    $rootScope.$state = $state;
    $rootScope.$on('$stateChangeSuccess', function() {
      window.scrollTo(0, 0);
    });
    FastClick.attach(document.body);
  },
]).config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes
    $urlRouterProvider.otherwise('/');
    // Application routes
    $stateProvider.state('app', {
        abstract: true,
        templateUrl: 'views/common/layout.html',
      }).state('horizontal', {
        abstract: true,
        templateUrl: 'views/common/horizontal/layout.html',
      })

      //Dashboard
      .state('app.dashboard', {
        url: '/',
        templateUrl: 'views/dashboard/dashboard.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/bower-jvectormap/jquery-jvectormap-1.2.2.css']
            }, {
              serie: true,
              files: ['vendor/noty/js/noty/packaged/jquery.noty.packaged.min.js', 'scripts/helpers/noty-defaults.js', 'vendor/flot/jquery.flot.js', 'vendor/flot/jquery.flot.resize.js', 'vendor/flot/jquery.flot.stack.js', 'vendor/flot-spline/js/jquery.flot.spline.js']
            }, {
              name: 'angular-flot',
              files: ['vendor/angular-flot/angular-flot.js']
            }, {
              serie: true,
              name: 'vector',
              files: ['vendor/bower-jvectormap/jquery-jvectormap-1.2.2.min.js', 'data/maps/jquery-jvectormap-us-aea.js', 'scripts/directives/vector.js']
            }, {
              name: 'easypiechart',
              files: ['vendor/jquery.easy-pie-chart/dist/angular.easypiechart.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/dashboard.js');
            });
          }]
        },
        title: 'Dashboard',
        controller : 'DashboardController'
      })

      //Dashboard
      .state('horizontal.dashboard', {
        url: '/horizontal',
        templateUrl: 'views/dashboard/dashboard.html',
//        resolve: {
//          deps: ['$ocLazyLoad', function($ocLazyLoad) {
//            return $ocLazyLoad.load([{
//              insertBefore: '#load_styles_before',
//              files: ['vendor/bower-jvectormap/jquery-jvectormap-1.2.2.css']
//            }, {
//              serie: true,
//              files: ['vendor/noty/js/noty/packaged/jquery.noty.packaged.min.js', 'scripts/helpers/noty-defaults.js', 'vendor/flot/jquery.flot.js', 'vendor/flot/jquery.flot.resize.js', 'vendor/flot/jquery.flot.stack.js', 'vendor/flot-spline/js/jquery.flot.spline.js']
//            }, {
//              name: 'angular-flot',
//              files: ['vendor/angular-flot/angular-flot.js']
//            }, {
//              serie: true,
//              name: 'vector',
//              files: ['vendor/bower-jvectormap/jquery-jvectormap-1.2.2.min.js', 'data/maps/jquery-jvectormap-us-aea.js', 'scripts/directives/vector.js']
//            }, {
//              name: 'easypiechart',
//              files: ['vendor/jquery.easy-pie-chart/dist/angular.easypiechart.js']
//            }]).then(function() {
//              return $ocLazyLoad.load('scripts/controllers/dashboard.js');
//            });
//          }]
//        },
        title: 'Dashboard'
      })

      // UI Routes
      .state('app.ui', {
        template: '<div ui-view></div>',
        abstract: true,
        url: '/ui',
      }).state('app.ui.buttons', {
        url: '/buttons',
        templateUrl: 'views/ui/ui-buttons.html',
        title: 'Buttons'
      }).state('app.ui.social-buttons', {
        url: '/social-buttons',
        templateUrl: 'views/ui/ui-social-buttons.html',
        title: 'Social buttons'
      }).state('app.ui.directives', {
        url: '/directives',
        templateUrl: 'views/ui/ui-general.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('scripts/controllers/ui-bootstrap.js');
          }]
        },
        title: 'Directives'
      }).state('app.ui.navs', {
        url: '/navs',
        templateUrl: 'views/ui/ui-navs.html',
        title: 'Navs'
      }).state('app.ui.portlets', {
        url: '/portlets',
        templateUrl: 'views/ui/ui-portlets.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              serie: true,
              files: ['vendor/jquery.ui/ui/core.js', 'vendor/jquery.ui/ui/widget.js', 'vendor/jquery.ui/ui/mouse.js', 'vendor/jquery.ui/ui/sortable.js', 'vendor/jqueryui-touch-punch/jquery.ui.touch-punch.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/draggable.js');
            });
          }]
        },
        title: 'Portlets'
      }).state('app.ui.palette', {
        url: '/palette',
        templateUrl: 'views/ui/ui-palette.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('scripts/controllers/colors.js');
          }]
        },
        title: 'Palette'
      }).state('app.ui.fontawesome', {
        url: '/fontawesome',
        templateUrl: 'views/ui/ui-fontawesome.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('scripts/controllers/icons.js');
          }]
        },
        title: 'Fontawesome icons'
      }).state('app.ui.material', {
        url: '/material',
        templateUrl: 'views/ui/ui-material-icons.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('scripts/controllers/icons.js');
          }]
        },
        title: 'Material icons'
      }).state('app.ui.progressbars', {
        url: '/progressbars',
        templateUrl: 'views/ui/ui-progressbars.html',
        title: 'Progress bars'
      }).state('app.ui.sliders', {
        url: '/sliders',
        templateUrl: 'views/ui/ui-sliders.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              serie: true,
              files: ['vendor/jquery.ui/ui/core.js', 'vendor/jquery.ui/ui/widget.js', 'vendor/jquery.ui/ui/mouse.js', 'vendor/jquery.ui/ui/slider.js', 'vendor/jqueryui-touch-punch/jquery.ui.touch-punch.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/slider.js');
            });
          }]
        },
        title: 'Sliders'
      }).state('app.ui.pagination', {
        url: '/pagination',
        templateUrl: 'views/ui/ui-pagination.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('scripts/controllers/ui-bootstrap.js');
          }]
        },
        title: 'Pagination'
      }).state('app.ui.notifications', {
        url: '/notifications',
        templateUrl: 'views/ui/ui-notifications.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              serie: true,
              files: ['vendor/noty/js/noty/packaged/jquery.noty.packaged.min.js', 'scripts/helpers/noty-defaults.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/notifications.js');
            });
          }]
        },
        title: 'Notifications'
      }).state('app.ui.alert', {
        url: '/alert',
        templateUrl: 'views/ui/ui-alert.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/sweetalert/dist/sweetalert.css']
            }, {
              name: 'oitozero.ngSweetAlert',
              files: ['vendor/sweetalert/dist/sweetalert.min.js', 'vendor/angular-sweetalert/SweetAlert.min.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/alert.js');
            });
          }]
        },
        title: 'Alerts'
      }).state('app.ui.spinners', {
        url: '/spinners',
        templateUrl: 'views/ui/ui-spinners.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['styles/loaders.css']
            }]);
          }]
        },
        title: 'Spinners'
      })

      // Forms routes
      .state('app.ui.forms', {
        template: '<div ui-view></div>',
        abstract: true,
        url: '/forms',
      }).state('app.ui.forms.native', {
        url: '/native_forms',
        templateUrl: 'views/form/form-basic.html',
        title: 'Basic form'
      }).state('app.ui.forms.plugins', {
        url: '/plugins',
        templateUrl: 'views/form/form-plugins.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css', 'vendor/jquery.tagsinput/src/jquery.tagsinput.css', 'vendor/intl-tel-input/build/css/intlTelInput.css', 'vendor/bootstrap-daterangepicker/daterangepicker.css', 'vendor/bootstrap-datepicker/dist/css/bootstrap-datepicker3.css', 'vendor/clockpicker/dist/bootstrap-clockpicker.min.css', 'vendor/mjolnic-bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css', 'vendor/jquery-labelauty/source/jquery-labelauty.css', 'vendor/multiselect/css/multi-select.css', 'vendor/ui-select/dist/select.css', 'vendor/select2/select2.css', 'vendor/selectize/dist/css/selectize.css']
            }, {
              serie: true,
              files: ['vendor/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js', 'vendor/jquery.tagsinput/src/jquery.tagsinput.js', 'vendor/intl-tel-input//build/js/intlTelInput.min.js', 'vendor/moment/min/moment.min.js', 'vendor/bootstrap-daterangepicker/daterangepicker.js', 'vendor/bootstrap-datepicker/dist/js/bootstrap-datepicker.js', 'vendor/bootstrap-timepicker/js/bootstrap-timepicker.js', 'vendor/clockpicker/dist/jquery-clockpicker.min.js', 'vendor/mjolnic-bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min.js', 'vendor/jquery-labelauty/source/jquery-labelauty.js', 'vendor/bootstrap-maxlength/src/bootstrap-maxlength.js', 'vendor/typeahead.js/dist/typeahead.bundle.js', 'vendor/multiselect/js/jquery.multi-select.js']
            }, {
              name: 'ui.select2',
              files: ['vendor/ui-select/dist/select.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/form.js');
            });
          }]
        },
        title: 'Form plugins'
      }).state('app.ui.forms.validation', {
        url: '/validation',
        templateUrl: 'views/form/form-validation.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('vendor/jquery-validation/dist/jquery.validate.min.js');
          }]
        },
        title: 'Form validation'
      }).state('app.ui.forms.editors', {
        url: '/editors',
        templateUrl: 'views/form/form-editors.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/summernote/dist/summernote.css']
            }, {
              serie: true,
              files: ['vendor/tether/dist/js/tether.js', 'vendor/bootstrap/js/dist/util.js', 'vendor/bootstrap/js/dist/tooltip.js', 'vendor/bootstrap/js/dist/dropdown.js', 'vendor/bootstrap/js/dist/modal.js', 'vendor/summernote/dist/summernote.min.js']
            }, {
              name: 'summernote',
              files: ['vendor/angular-summernote/dist/angular-summernote.min.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/editor.js');
            });
          }]
        },
        title: 'Form editors'
      }).state('app.ui.forms.masks', {
        url: '/masks',
        templateUrl: 'views/form/form-masks.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('vendor/jquery.maskedinput/dist/jquery.maskedinput.min.js').then(function() {
              return $ocLazyLoad.load('scripts/controllers/mask.js');
            });
          }]
        },
        title: 'Form masks'
      }).state('app.ui.forms.upload', {
        url: '/upload',
        templateUrl: 'views/form/form-upload.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              name: 'angularFileUpload',
              files: ['vendor/angular-file-upload/dist/angular-file-upload.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/upload.js');
            });
          }]
        },
        title: 'Form upload'
      }).state('app.ui.forms.wizard', {
        url: '/wizard',
        templateUrl: 'views/form/form-wizard.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['styles/gsi-step-indicator.css', 'styles/tsf-step-form-wizard.css']
            }, {
              serie: true,
              files: ['vendor/parsleyjs/dist/parsley.min.js', 'scripts/helpers/tsf/js/tsf-wizard-plugin.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/wizard.js');
            });
          }]
        },
        title: 'Form wizard',
        classes: 'no-padding full-width'
      })

      // Tables routes
      .state('app.ui.tables', {
        template: '<div ui-view></div>',
        abstract: true,
        url: '/tables',
      }).state('app.ui.tables.basic', {
        url: '/basic',
        templateUrl: 'views/table/table-basic.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/sortable/css/sortable-theme-bootstrap.css']
            }, {
              files: ['vendor/sortable/js/sortable.min.js']
            }]).then(function() {
              Sortable.init();
            });
          }]
        },
        title: 'Basic table'
      }).state('app.ui.tables.responsive', {
        url: '/responsive',
        templateUrl: 'views/table/table-responsive.html',
        title: 'Responsive tables'
      }).state('app.ui.tables.datatable', {
        url: '/datatable',
        templateUrl: 'views/table/table-datatable.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/datatables/media/css/dataTables.bootstrap4.css']
            }, {
              serie: true,
              files: ['vendor/datatables/media/js/jquery.dataTables.js', 'vendor/datatables/media/js/dataTables.bootstrap4.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/table.js');
            });
          }]
        },
        title: 'Datatables'
      }).state('app.ui.tables.xeditable', {
        url: '/xeditable',
        templateUrl: 'views/table/table-editable.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/angular-xeditable/dist/css/xeditable.css']
            }, {
              name: 'xeditable',
              files: ['vendor/angular-xeditable/dist/js/xeditable.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/editable.js');
            });
          }]
        },
        title: 'Xeditable'
      }).state('app.ui.tables.ngtable', {
        url: '/ngtable',
        templateUrl: 'views/table/table-ngtable.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/ng-table/dist/ng-table.css']
            }, {
              name: 'ngTable',
              files: ['vendor/ng-table/dist/ng-table.js', 'scripts/services/ngtable.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/ngtable.js');
            });
          }]
        },
        title: 'NGTable'
      })

      // Chart routes
      .state('app.charts', {
        template: '<div ui-view></div>',
        abstract: true,
        url: '/charts',
      }).state('app.charts.flot', {
        url: '/flot',
        templateUrl: 'views/chart/charts-flot.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              serie: true,
              files: ['vendor/flot/jquery.flot.js', 'vendor/flot/jquery.flot.resize.js', 'vendor/flot/jquery.flot.categories.js', 'vendor/flot/jquery.flot.stack.js', 'vendor/flot/jquery.flot.time.js', 'vendor/flot/jquery.flot.pie.js', 'vendor/flot-spline/js/jquery.flot.spline.js', 'vendor/flot.orderbars/js/jquery.flot.orderBars.js']
            }, {
              name: 'angular-flot',
              files: ['vendor/angular-flot/angular-flot.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/flot.js');
            });
          }]
        },
        title: 'Flots'
      }).state('app.charts.easypie', {
        url: '/easypie',
        templateUrl: 'views/chart/charts-easypie.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              name: 'easypiechart',
              files: ['vendor/jquery.easy-pie-chart/dist/angular.easypiechart.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/easychart.js');
            });
          }]
        },
        title: 'Easypie'
      }).state('app.charts.chartjs', {
        url: '/chartjs',
        templateUrl: 'views/chart/charts-chartjs.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/angular-chart.js/dist/angular-chart.css']
            }, {
              name: 'chart.js',
              serie: true,
              files: ['vendor/Chart.js/Chart.js', 'vendor/angular-chart.js/dist/angular-chart.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/chartjs.js');
            });
          }]
        },
        title: 'Chartjs'
      }).state('app.charts.rickshaw', {
        url: '/rickshaw',
        templateUrl: 'views/chart/charts-rickshaw.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/rickshaw/rickshaw.min.css']
            }, {
              name: 'rickshaw',
              files: ['vendor/d3/d3.min.js', 'vendor/rickshaw/rickshaw.min.js', 'vendor/angular-rickshaw/rickshaw.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/rickshaw.js');
            });
          }]
        },
        title: 'Rickshaw'
      }).state('app.charts.c3', {
        url: '/c3',
        templateUrl: 'views/chart/charts-c3.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/c3/c3.min.css']
            }, {
              name: 'c3',
              files: ['vendor/d3/d3.min.js', 'vendor/c3/c3.min.js', 'scripts/directives/c3.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/c3.js');
            });
          }]
        },
        title: 'C3'
      })

      // Maps routes
      .state('app.maps', {
        template: '<div ui-view></div>',
        abstract: true,
        url: '/maps',
      }).state('app.maps.google', {
        url: '/google',
        templateUrl: 'views/map/map-google.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              name: 'ui.map',
              files: ['vendor/angular-ui-map/ui-map.min.js']
            }, {
              name: 'ui.event',
              files: ['vendor/angular-ui-event/dist/event.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/google.js');
            });
          }]
        },
        title: 'Google maps'
      }).state('app.maps.googlefull', {
        url: '/google-fullscreen',
        templateUrl: 'views/map/map-google-fullscreen.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              name: 'ui.map',
              files: ['vendor/angular-ui-map/ui-map.min.js']
            }, {
              name: 'ui.event',
              files: ['vendor/angular-ui-event/dist/event.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/google-fullscreen.js');
            });
          }]
        },
        title: 'Full map',
        classes: 'no-padding full-width'
      }).state('app.maps.vector', {
        url: '/vector',
        templateUrl: 'views/map/map-vector.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/bower-jvectormap/jquery-jvectormap-1.2.2.css']
            }, {
              serie: true,
              name: 'vector',
              files: ['data/maps/gdp-data.js', 'vendor/bower-jvectormap/jquery-jvectormap-1.2.2.min.js', 'data/maps/jquery-jvectormap-world-mill-en.js', 'scripts/directives/vector.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/vector.js');
            });
          }]
        },
        title: 'Full map',
        classes: 'no-padding full-width'
      })

      // UI cards routes
      .state('app.ui.cards', {
        template: '<div ui-view></div>',
        abstract: true,
        url: '/cards',
      }).state('app.ui.cards.basic', {
        url: '/basic',
        templateUrl: 'views/card/cards-basic.html',
        title: 'Basic cards'
      }).state('app.ui.cards.portlets', {
        url: '/portlets',
        templateUrl: 'views/card/cards-portlets.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              serie: true,
              files: ['vendor/jquery.ui/ui/core.js', 'vendor/jquery.ui/ui/widget.js', 'vendor/jquery.ui/ui/mouse.js', 'vendor/jquery.ui/ui/sortable.js', 'vendor/jqueryui-touch-punch/jquery.ui.touch-punch.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/draggable.js');
            });
          }]
        },
        title: 'Portlets'
      }).state('app.ui.cards.draggable', {
        url: '/draggable',
        templateUrl: 'views/card/cards-draggable.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              serie: true,
              files: ['vendor/jquery.ui/ui/core.js', 'vendor/jquery.ui/ui/widget.js', 'vendor/jquery.ui/ui/mouse.js', 'vendor/jquery.ui/ui/sortable.js', 'vendor/jqueryui-touch-punch/jquery.ui.touch-punch.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/draggable.js');
            });
          }]
        },
        title: 'Draggable'
      })

      // Apps routes
      .state('app.apps', {
        template: '<div ui-view></div>',
        abstract: true,
        url: '/apps',
      }).state('app.apps.calendar', {
        url: '/calendar',
        templateUrl: 'views/app/app-calendar.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/fullcalendar/dist/fullcalendar.min.css']
            }, {
              serie: true,
              files: ['vendor/jquery.ui/ui/core.js', 'vendor/jquery.ui/ui/widget.js', 'vendor/jquery.ui/ui/mouse.js', 'vendor/jquery.ui/ui/draggable.js', 'vendor/moment/moment.js', 'vendor/fullcalendar/dist/fullcalendar.min.js', 'vendor/fullcalendar/dist/gcal.js', 'vendor/jqueryui-touch-punch/jquery.ui.touch-punch.js']
            }, {
              name: 'ui.calendar',
              files: ['vendor/angular-ui-calendar/src/calendar.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/calendar.js');
            });
          }]
        },
        title: 'Calendar'
      }).state('app.apps.media', {
        url: '/media',
        templateUrl: 'views/app/app-media.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              files: ['scripts/controllers/gallery.js']
            }]);
          }]
        },
        title: 'Media'
      }).state('app.apps.messages', {
        url: '/messages',
        templateUrl: 'views/app/app-messages.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('scripts/controllers/messages.js').then(function() {
              return $ocLazyLoad.load('scripts/services/messages.js');
            });
          }]
        },
        title: 'Messages',
        classes: 'no-padding full-width'
      }).state('app.apps.contacts', {
        url: '/contacts',
        templateUrl: 'views/app/app-contacts.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('scripts/services/contacts.js').then(function() {
              return $ocLazyLoad.load('scripts/controllers/contacts.js');
            });
          }]
        },
        title: 'Contacts',
        classes: 'no-padding full-width no-footer'
      }).state('app.apps.social', {
        url: '/social',
        templateUrl: 'views/app/app-social.html',
        title: 'Social'
      })

      // Extras routes
      .state('app.extras', {
        template: '<div ui-view></div>',
        abstract: true,
        url: '/extras',
      }).state('app.extras.invoice', {
        url: '/invoice',
        templateUrl: 'views/extra/extras-invoice.html',
        title: 'Invoice'
      }).state('app.extras.timeline', {
        url: '/timeline',
        templateUrl: 'views/extra/extras-timeline.html',
        title: 'Timeline'
      }).state('app.extras.lists', {
        url: '/lists',
        templateUrl: 'views/extra/extras-lists.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              serie: true,
              files: ['vendor/jquery.ui/ui/core.js', 'vendor/jquery.ui/ui/widget.js', 'vendor/jquery.ui/ui/mouse.js', 'vendor/jquery.ui/ui/sortable.js', 'vendor/nestable/jquery.nestable.js', 'vendor/jqueryui-touch-punch/jquery.ui.touch-punch.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/sortable.js');
            });
          }]
        },
        title: 'Lists'
      }).state('app.extras.pricing', {
        url: '/pricing',
        templateUrl: 'views/extra/extras-pricing.html',
        title: 'Pricing tables'
      }).state('app.extras.starter', {
        url: '/starter',
        templateUrl: 'views/extra/extras-blank.html',
        title: 'Starter'
      })

      .state('user', {
        templateUrl: 'views/common/session.html',
      }).state('user.signin', {
        url: '/signin',
        templateUrl: 'views/extra/extras-signin.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('vendor/jquery-validation/dist/jquery.validate.min.js').then(function() {
              return $ocLazyLoad.load('scripts/controllers/session.js');
            });
          }]
        },
        title: 'Signin',
        classes: 'no-padding no-footer layout-static'
      }).state('user.signup', {
        url: '/signup',
        templateUrl: 'views/extra/extras-signup.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('vendor/jquery-validation/dist/jquery.validate.min.js').then(function() {
              return $ocLazyLoad.load('scripts/controllers/session.js');
            });
          }]
        },
        title: 'Signup',
        classes: 'no-padding no-footer layout-static'
      }).state('user.forgot', {
        url: '/forgot',
        templateUrl: 'views/extra/extras-forgot.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('vendor/jquery-validation/dist/jquery.validate.min.js').then(function() {
              return $ocLazyLoad.load('scripts/controllers/session.js');
            });
          }]
        },
        title: 'Forgot',
        classes: 'no-padding no-footer layout-static'
      }).state('user.404', {
        url: '/404',
        templateUrl: 'views/extra/extras-404.html',
        title: '404',
        classes: 'error-page no-padding no-footer layout-static',
      }).state('user.500', {
        url: '/500',
        templateUrl: 'views/extra/extras-500.html',
        title: '500',
        classes: 'error-page no-padding no-footer layout-static'
      }).state('user.lockscreen', {
        url: '/lockscreen',
        templateUrl: 'views/extra/extras-lockscreen.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('vendor/jquery-validation/dist/jquery.validate.min.js').then(function() {
              return $ocLazyLoad.load('scripts/controllers/session.js');
            });
          }]
        },
        title: 'Lockscreen',
        classes: 'no-padding no-footer layout-static'
      });
  }
]).config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
  $ocLazyLoadProvider.config({
    debug: false,
    events: false
  });
}]);