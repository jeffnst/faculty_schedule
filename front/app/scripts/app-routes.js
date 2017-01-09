var routes = angular.module('app.routes', [])
routes.config(['$stateProvider', '$urlRouterProvider', (function ($stateProvider, $urlRouterProvider) {
        var viewsPrefix = 'views/';
        // For any unmatched url, send to /        
        $stateProvider
                .state('front', {
                    url: '/front'
                    , templateUrl: viewsPrefix + "common/session.html"
                })
                .state('front.not-found', {
                    url: '/404',
                    templateUrl: viewsPrefix + 'extra/extras-404.html',
                    title: 'Tidak Ditemukan'
                })
                .state('front.login-admin', {
                    url: '/login-admin'
                    , templateUrl: viewsPrefix + "extra/extras-signin.html"
                    , controller: 'AdminLoginController'
                    , resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('vendor/jquery-validation/dist/jquery.validate.min.js').then(function () {
                                    return $ocLazyLoad.load('scripts/controllers/session.js');
                                });
                            }]
                    },
                    title: 'Login Admin',
                    classes: 'no-padding no-footer layout-static'
                })

                .state('admin', {
                    url: '/admin',
                    abstract: true,
                    templateUrl: viewsPrefix + 'admin/layout.html',
                })
                .state('admin.not-found', {
                    url: '/404',
                    templateUrl: viewsPrefix + 'extra/extras-404.html',
                    title: 'Tidak Ditemukan'
                })
                .state('admin.dashboard', {
                    url: '/dashboard',
                    templateUrl: viewsPrefix + 'admin/dashboard.html',
//                    resolve: {
//                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
//                                return $ocLazyLoad.load([{
//                                        insertBefore: '#load_styles_before',
//                                        files: ['vendor/bower-jvectormap/jquery-jvectormap-1.2.2.css']
//                                    }, {
//                                        serie: true,
//                                        files: ['vendor/noty/js/noty/packaged/jquery.noty.packaged.min.js', 'scripts/helpers/noty-defaults.js', 'vendor/flot/jquery.flot.js', 'vendor/flot/jquery.flot.resize.js', 'vendor/flot/jquery.flot.stack.js', 'vendor/flot-spline/js/jquery.flot.spline.js']
//                                    }, {
//                                        name: 'angular-flot',
//                                        files: ['vendor/angular-flot/angular-flot.js']
//                                    }, {
//                                        serie: true,
//                                        name: 'vector',
//                                        files: ['vendor/bower-jvectormap/jquery-jvectormap-1.2.2.min.js', 'data/maps/jquery-jvectormap-us-aea.js', 'scripts/directives/vector.js']
//                                    }, {
//                                        name: 'easypiechart',
//                                        files: ['vendor/jquery.easy-pie-chart/dist/angular.easypiechart.js']
//                                    }]).then(function () {
//                                    return $ocLazyLoad.load('scripts/controllers/dashboard.js');
//                                });
//                            }]
//                    },
                    title: 'Beranda',
//                    controller: 'AdminDashboardController'
                })
                // ADMIN GEDUNG //
                .state('admin.gedung', {
                    url: '/gedung',
                    templateUrl: viewsPrefix + 'admin/gedung.html',
                    title: 'Gedung',
                    controller: 'AdminBuildingController',
                })
                .state('admin.gedung_detail', {
                    url: '/gedung/detail/:gedungSeq',
                    templateUrl: viewsPrefix + 'admin/detail-gedung.html',
                    controller: 'AdminBuildingController',
                })
//                ADMIN RUANGAN
                .state('admin.ruangan', {
                    url: '/ruangan',
                    templateUrl: viewsPrefix + 'admin/ruangan.html',
                    title: 'Ruangan',
                    controller: 'AdminRoomController',
                })

                .state('admin.ruangan_detail', {
                    url: '/ruangan/:ruanganSeq',
                    templateUrl: viewsPrefix + 'admin/ruangan.html',
                    title: 'Ruangan',
                    controller: 'AdminRoomController',
                })

                // ADMIN FAKULTAS
                .state('admin.fakultas', {
                    url: '/fakultas',
                    templateUrl: viewsPrefix + 'admin/fakultas.html',
                    controller: 'AdminFacultyController',
                })
                //ADMIN JURUSAN
                .state('admin.jurusan', {
                    url: '/jurusan',
                    templateUrl: viewsPrefix + 'admin/jurusan.html',
                    controller: 'AdminMajorController',
                })

                //ADMIN MATKUL

                .state('admin.matakuliah', {
                    url: '/matakuliah',
                    templateUrl: viewsPrefix + 'admin/matakuliah.html',
                    controller: 'AdminCourseController',
                })

                .state('admin.detail_matakuliah', {
                    url: '/matakuliah/detail/:matakuliahSeq',
                    templateUrl: viewsPrefix + 'admin/detail-matakuliah.html',
                    controller: 'AdminCourseController',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                        insertBefore: '#load_styles_before',
                                        files: ['vendor/jquery-labelauty/source/jquery-labelauty.css']
                                    }, {
                                        serie: true,
                                        files: ['vendor/jquery-labelauty/source/jquery-labelauty.js']
                                    }])
                            }]
                    },
                })

                //ADMIN Dosen

                .state('admin.dosen', {
                    url: '/dosen',
                    templateUrl: viewsPrefix + 'admin/dosen.html',
                    controller: 'AdminTeacherController',
                })

                .state('admin.detail_dosen', {
                    url: '/dosen/detail/:dosenSeq',
                    controller: 'AdminTeacherController',
                    templateUrl: viewsPrefix + 'admin/detail-dosen.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                        insertBefore: '#load_styles_before',
                                        files: ['vendor/jquery-labelauty/source/jquery-labelauty.css']
                                    }, {
                                        serie: true,
                                        files: ['vendor/jquery-labelauty/source/jquery-labelauty.js']
                                    }])
                            }]
                    },
                })
                .state('admin.hari', {
                    url: '/hari',
                    templateUrl: viewsPrefix + 'admin/hari.html',
                    controller: 'AdminDayController',
                })
                
                .state('admin.jam', {
                    url: '/jam',
                    templateUrl: viewsPrefix + 'admin/jam.html',
                    controller: 'AdminHourController',
                })
        $urlRouterProvider.otherwise("/front/login-admin")
    })])

