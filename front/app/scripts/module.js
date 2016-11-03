'use strict';
var apps = angular.module('app', [    
    'ui.router',
    'app.routes',
    'app.factories',
    'app.controllers',
    'app.services',
    'app.constants',
    'angular-md5',
    'angular-jwt',
//    'ngTable',    

    'ngResource',
    'ui.bootstrap',
    'oc.lazyLoad',
    'ngStorage',
    'ngCookies',
    'ngSanitize',
    'ngAnimate',
    'ui.jq',
    'ngTouch',
    'pascalprecht.translate',
    'toastr',
//    'datatables',     
'angularUtils.directives.dirPagination'
]);
