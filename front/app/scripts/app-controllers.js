var controllers = angular.module('app.controllers', [])
    //HEADER CONTROLLER
controllers.controller('AdminHeaderController', function ($scope, $rootScope, AdminTokenService, $localStorage, $state, $stateParams, toastr, $uibModal) {
        AdminTokenService.checkToken();
        $scope.logoutModal = function () {
            $scope.$uibModalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'header-logout-modal.html',
                controller: 'AdminBuildingController',
                size: 'lg'
            });
            $scope.closeLogoutModal = function () {
                $scope.$uibModalInstance.dismiss('cancel');
            };
            $scope.doLogout = function () {
                delete $localStorage.faculty_schedule_token;
                $rootScope.title = "";
                $scope = "";
                $state.go('front.login-admin');
                toastr.success('Berhasil keluar');
            }
        }
    })
    //LOGIN CONTROLLER
controllers.controller('AdminLoginController', function ($scope, $rootScope, $localStorage, $state, $stateParams, jwtHelper, md5, toastr, AdminFactory) {
        $scope.doLogin = function () {
            input = {
                username: $scope.inputdata.username,
                password: md5.createHash($scope.inputdata.password)
            };
            AdminFactory.Login(input).success(function (response) {
                var token = jwtHelper.decodeToken(response);
                if (token.response == "OK") {
                    toastr.success("Selamat datang");
                    dataAuth = {
                        token: response
                    };
                    $rootScope.title = "Dashboard";
                    $localStorage.faculty_schedule_token = dataAuth;
                    $state.go('admin.dashboard');
                } else {
                    toastr.error("Login Gagal");
                }
            });
        }
    })
    //BUILDING CONTROLLER
controllers.controller('AdminBuildingController', function ($rootScope, $scope, $localStorage, $state, $stateParams, $filter, toastr, AdminFactory, $uibModal) {
        $rootScope.title = "Gedung";
        var refreshBuildingData = function () {
            AdminFactory.GetAllBuilding().success(function (response) {
                if (response.response == "OK") {
                    $scope.data = response.data;
                } else {
                    toastr.error(response.message);
                }
            });
        }

        refreshBuildingData();
        $scope.addModal = function () {
            $scope.$uibModalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'building-add-modal.html',
                controller: 'AdminBuildingController',
                size: 'lg'
            });
            $scope.closeAddModal = function () {
                $scope.$uibModalInstance.dismiss('cancel');
            };
            $scope.buildingAdd = function (data_input) {
                if (data_input.description == "" || data_input.description == undefined) {
                    data_input.description = "";
                }
                input = {
                    name: data_input.name,
                    description: data_input.description
                };
                AdminFactory.AddDataBuilding(input).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.$uibModalInstance.dismiss();
                        refreshBuildingData();
                        toastr.success(response.message);
                    } else {
                        toastr.warning(response.message);
                    }
                });
            }
        }
        $scope.deleteModal = function (seq) {
                $scope.$uibModalInstance = $uibModal.open({
                    scope: $scope,
                    animation: true,
                    ariaLabelledBy: 'modal-title-top',
                    ariaDescribedBy: 'modal-body-top',
                    templateUrl: 'building-delete-modal.html',
                    controller: 'AdminBuildingController',
                    size: 'lg'
                });
                $scope.closeDeleteModal = function () {
                    $scope.$uibModalInstance.dismiss('cancel');
                };
                $scope.buildingDelete = function () {
                    AdminFactory.DeleteDataBuilding(seq).success(function (response) {
                        if (response.response != "FAIL") {
                            $scope.$uibModalInstance.dismiss();
                            refreshBuildingData();
                            toastr.success(response.message);
                        } else {
                            toastr.warning(response.message);
                        }
                    })
                }
            }
            // FUNCTION TO GET BUILDING DETAIL
        var getBuilding = function (seq) {
                AdminFactory.GetBuilding(seq).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.dataBuilding = response.data;
                    } else {
                        $scope.dataBuilding = "";
                    }
                })
            }
            // IF DETAIL BUILDING
        if ($stateParams.gedungSeq) {
            var seq = $stateParams.gedungSeq
            getBuilding(seq);
        }
        // EDIT MODAL
        $scope.editModal = function (seq) {
            getBuilding(seq);
            $scope.$uibModalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'building-edit-modal.html',
                controller: 'AdminBuildingController',
                size: 'lg'
            });
            $scope.closeEditModal = function () {
                $scope.$uibModalInstance.dismiss('cancel');
            };
            $scope.buildingEdit = function (dataBuilding) {
                if (dataBuilding.description == "" || dataBuilding.description == undefined) {
                    dataBuilding.description = "";
                }
                input = {
                    name: dataBuilding.name,
                    description: dataBuilding.description,
                    seq: $scope.dataBuilding.seq
                };
                AdminFactory.PutDataBuilding(input).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.$uibModalInstance.dismiss();
                        refreshBuildingData();
                        toastr.success(response.message);
                    } else {
                        toastr.warning(response.message);
                    }
                });
            }
        }
    })
    //ROOM CONTROLLER
controllers.controller('AdminRoomController', function ($rootScope, $scope, $localStorage, $state, $stateParams, $filter, toastr, AdminFactory, $uibModal) {
        $rootScope.title = "Ruangan";
        $rootScope.parent_title = "Gedung";
        var refreshRoomData = function () {
            AdminFactory.GetAllRoom().success(function (response) {
                if (response.response == "OK") {
                    $scope.data = response.data.rooms;
                    $scope.buildingOption = response.data.building_option;
                } else {
                    toastr.error(response.message);
                }
            });
        }
        refreshRoomData();
        $scope.addModal = function () {
            $scope.$uibModalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'room-add-modal.html',
                controller: 'AdminRoomController',
                size: 'lg'
            });
            $scope.closeAddModal = function () {
                $scope.$uibModalInstance.dismiss('cancel');
            };
            $scope.roomAdd = function (data_input) {
                if (data_input.description == "" || data_input.description == undefined) {
                    data_input.description = "";
                }
                input = {
                    name: data_input.name,
                    building_seq: data_input.building_seq,
                    description: data_input.description
                };
                AdminFactory.AddDataRoom(input).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.$uibModalInstance.dismiss();
                        refreshRoomData();
                        toastr.success(response.message);
                    } else {
                        toastr.warning(response.message);
                    }
                });
            }
        }
        $scope.deleteModal = function (seq) {
            $scope.$uibModalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'room-delete-modal.html',
                controller: 'AdminRoomController',
                size: 'lg'
            });
            $scope.closeDeleteModal = function () {
                $scope.$uibModalInstance.dismiss('cancel');
            };
            $scope.roomDelete = function () {
                AdminFactory.DeleteDataRoom(seq).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.$uibModalInstance.dismiss();
                        refreshRoomData();
                        toastr.success(response.message);
                    } else {
                        toastr.warning(response.message);
                    }
                })
            }
        }
        var getRoom = function (seq) {
            AdminFactory.GetRoom(seq).success(function (response) {
                if (response.response != "FAIL") {
                    $scope.dataRoom = response.data;
                } else {
                    $scope.dataRoom = "";
                }
            })
        }
        $scope.editModal = function ($seq) {
            getRoom($seq);
            $scope.$uibModalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'room-edit-modal.html',
                controller: 'AdminRoomController',
                size: 'lg'
            });
            $scope.closeEditModal = function () {
                $scope.$uibModalInstance.dismiss('cancel');
            };
            $scope.roomEdit = function (dataRoom) {
                if (dataRoom.description == "" || dataRoom.description == undefined) {
                    dataRoom.description = "";
                }
                input = {
                    name: dataRoom.name,
                    building_seq: dataRoom.building_seq,
                    description: dataRoom.description,
                    seq: $scope.dataRoom.seq
                };
                AdminFactory.PutDataRoom(input).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.$uibModalInstance.dismiss();
                        refreshRoomData();
                        toastr.success(response.message);
                    } else {
                        toastr.warning(response.message);
                    }
                });
            }
        }
    })
    //FACULTY CONTROLLER
controllers.controller('AdminFacultyController', function ($rootScope, $scope, $localStorage, $state, $stateParams, $filter, toastr, AdminFactory, $uibModal) {
        $rootScope.title = "Fakultas";
        var refreshFacultyData = function () {
            AdminFactory.GetAllFaculty().success(function (response) {
                if (response.response == "OK") {
                    $scope.data = response.data;
                } else {
                    toastr.error(response.message);
                }
            });
        }

        var getBuildingdata = function () {
            AdminFactory.GetAllBuilding().success(function (response) {
                if (response.response == "OK") {
                    $scope.dataBuilding = response.data;
                } else {
                    toastr.error(response.message);
                }
            });
        }
        refreshFacultyData();
        $scope.addModal = function () {
            getBuildingdata();
            $scope.$uibModalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'faculty-add-modal.html',
                controller: 'AdminFacultyController',
                size: 'lg'
            });
            $scope.closeAddModal = function () {
                $scope.$uibModalInstance.dismiss('cancel');
            };
            $scope.facultyAdd = function (data_input) {
                if (data_input.description == "" || data_input.description == undefined) {
                    data_input.description = "";
                }
                input = {
                    name: data_input.name,
                    description: data_input.description
                };
                AdminFactory.AddDataFaculty(input).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.$uibModalInstance.dismiss();
                        refreshFacultyData();
                        toastr.success(response.message);
                    } else {
                        toastr.warning(response.message);
                    }
                });
            }
        }
        $scope.deleteModal = function (seq) {
                $scope.$uibModalInstance = $uibModal.open({
                    scope: $scope,
                    animation: true,
                    ariaLabelledBy: 'modal-title-top',
                    ariaDescribedBy: 'modal-body-top',
                    templateUrl: 'faculty-delete-modal.html',
                    controller: 'AdminFacultyController',
                    size: 'lg'
                });
                $scope.closeDeleteModal = function () {
                    $scope.$uibModalInstance.dismiss('cancel');
                };
                $scope.facultyDelete = function () {
                    AdminFactory.DeleteDataFaculty(seq).success(function (response) {
                        if (response.response != "FAIL") {
                            $scope.$uibModalInstance.dismiss();
                            refreshFacultyData();
                            toastr.success(response.message);
                        } else {
                            toastr.warning(response.message);
                        }
                    })
                }
            }
            // FUNCTION TO GET Faculty DETAIL
        var getFaculty = function (seq) {
                AdminFactory.GetFaculty(seq).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.dataFaculty = response.data;
                    } else {
                        $scope.dataFaculty = "";
                    }
                })
            }
            // IF DETAIL Faculty
        if ($stateParams.gedungSeq) {
            var seq = $stateParams.gedungSeq
            getFaculty(seq);
        }
        // EDIT MODAL
        $scope.editModal = function (seq) {
            getFaculty(seq);
            $scope.$uibModalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'faculty-edit-modal.html',
                controller: 'AdminFacultyController',
                size: 'lg'
            });
            $scope.closeEditModal = function () {
                $scope.$uibModalInstance.dismiss('cancel');
            };
            $scope.facultyEdit = function (dataFaculty) {
                if (dataFaculty.description == "" || dataFaculty.description == undefined) {
                    dataFaculty.description = "";
                }
                input = {
                    name: dataFaculty.name,
                    description: dataFaculty.description,
                    seq: $scope.dataFaculty.seq
                };
                AdminFactory.PutDataFaculty(input).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.$uibModalInstance.dismiss();
                        refreshFacultyData();
                        toastr.success(response.message);
                    } else {
                        toastr.warning(response.message);
                    }
                });
            }
        }
    })
    //MAJOR CONTROLLER
controllers.controller('AdminMajorController', function ($rootScope, $scope, $localStorage, $state, $stateParams, $filter, toastr, AdminFactory, $uibModal) {
        $rootScope.title = "Jurusan";
        $rootScope.parent_title = "Fakultas";
        var refreshMajorData = function () {
            AdminFactory.GetAllMajor().success(function (response) {
                if (response.response == "OK") {
                    $scope.data = response.data.majors;
                    $scope.facultyOption = response.data.faculty_option;
                } else {
                    toastr.error(response.message);
                }
            });
        }
        refreshMajorData();
        $scope.addModal = function () {
            $scope.$uibModalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'major-add-modal.html',
                controller: 'AdminMajorController',
                size: 'lg'
            });
            $scope.closeAddModal = function () {
                $scope.$uibModalInstance.dismiss('cancel');
            };
            $scope.majorAdd = function (data_input) {
                if (data_input.description == "" || data_input.description == undefined) {
                    data_input.description = "";
                }
                input = {
                    name: data_input.name,
                    faculty_seq: data_input.faculty_seq,
                    description: data_input.description
                };
                AdminFactory.AddDataMajor(input).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.$uibModalInstance.dismiss();
                        refreshMajorData();
                        toastr.success(response.message);
                    } else {
                        toastr.warning(response.message);
                    }
                });
            }
        }
        $scope.deleteModal = function (seq) {
                $scope.$uibModalInstance = $uibModal.open({
                    scope: $scope,
                    animation: true,
                    ariaLabelledBy: 'modal-title-top',
                    ariaDescribedBy: 'modal-body-top',
                    templateUrl: 'major-delete-modal.html',
                    controller: 'AdminMajorController',
                    size: 'lg'
                });
                $scope.closeDeleteModal = function () {
                    $scope.$uibModalInstance.dismiss('cancel');
                };
                $scope.majorDelete = function () {
                    AdminFactory.DeleteDataMajor(seq).success(function (response) {
                        if (response.response != "FAIL") {
                            $scope.$uibModalInstance.dismiss();
                            refreshMajorData();
                            toastr.success(response.message);
                        } else {
                            toastr.warning(response.message);
                        }
                    })
                }
            }
            // FUNCTION TO GET Major DETAIL
        var getMajor = function (seq) {
                AdminFactory.GetMajor(seq).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.dataMajor = response.data;
                    } else {
                        $scope.dataMajor = "";
                    }
                })
            }
            // IF DETAIL Major
        if ($stateParams.gedungSeq) {
            var seq = $stateParams.gedungSeq
            getMajor(seq);
        }
        // EDIT MODAL
        $scope.editModal = function (seq) {
            getMajor(seq);
            $scope.$uibModalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'major-edit-modal.html',
                controller: 'AdminMajorController',
                size: 'lg'
            });
            $scope.closeEditModal = function () {
                $scope.$uibModalInstance.dismiss('cancel');
            };
            $scope.majorEdit = function (dataMajor) {
                if (dataMajor.description == "" || dataMajor.description == undefined) {
                    dataMajor.description = "";
                }
                input = {
                    name: dataMajor.name,
                    faculty_seq: dataMajor.faculty_seq,
                    description: dataMajor.description,
                    seq: $scope.dataMajor.seq
                };
                AdminFactory.PutDataMajor(input).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.$uibModalInstance.dismiss();
                        refreshMajorData();
                        toastr.success(response.message);
                    } else {
                        toastr.warning(response.message);
                    }
                });
            }
        }
    })
    //COURSE CONTROLLER
controllers.controller('AdminCourseController', function ($rootScope, $timeout, $scope, $localStorage, $state, $stateParams, $filter, toastr, AdminFactory, $uibModal) {
        $rootScope.title = "Mata Kuliah";
        $rootScope.parent_title = "Jurusan";
        var refreshCourseData = function () {
            AdminFactory.GetAllCourse().success(function (response) {
                if (response.response == "OK") {
                    $scope.data = response.data.courses;
                    $scope.majorOption = response.data.major_option;
                    $scope.sksOption = ["1", "2", "3"];
                } else {
                    toastr.error(response.message);
                }
            });
        }
        if (!$stateParams.matakuliahSeq) {
            refreshCourseData();
        }
        $scope.addModal = function () {
                $scope.$uibModalInstance = $uibModal.open({
                    scope: $scope,
                    animation: true,
                    ariaLabelledBy: 'modal-title-top',
                    ariaDescribedBy: 'modal-body-top',
                    templateUrl: 'course-add-modal.html',
                    controller: 'AdminCourseController',
                    size: 'lg'
                });
                $scope.closeAddModal = function () {
                    $scope.$uibModalInstance.dismiss('cancel');
                };
                $scope.courseAdd = function (data_input) {
                    if (data_input.description == "" || data_input.description == undefined) {
                        data_input.description = "";
                    }
                    input = {
                        name: data_input.name,
                        major_seq: data_input.major_seq,
                        description: data_input.description,
                        sks: data_input.sks
                    };
                    AdminFactory.AddDataCourse(input).success(function (response) {
                        if (response.response != "FAIL") {
                            $scope.$uibModalInstance.dismiss();
                            refreshCourseData();
                            toastr.success(response.message);
                        } else {
                            toastr.warning(response.message);
                        }
                    });
                }
            }
            // ADD CLASS
        $scope.addClassModal = function () {
                $scope.alphabetics = ["Awal", "A", "B", "C", "D", "E", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Akhir"]
                $scope.datainput = [];
                $scope.datainput.first_selected = $scope.alphabetics[0];
                $scope.datainput.last_selected = $scope.alphabetics[28];
                $scope.$uibModalInstance = $uibModal.open({
                    scope: $scope,
                    animation: true,
                    ariaLabelledBy: 'modal-title-top',
                    ariaDescribedBy: 'modal-body-top',
                    templateUrl: 'add-class-modal.html',
                    controller: 'AdminCourseController',
                    size: 'lg'
                });
                $scope.closeClassModal = function () {
                    $scope.$uibModalInstance.dismiss('cancel');
                };
                $scope.addClassSubmit = function (datainput) {
                    if (datainput.first_selected == "Awal") {
                        datainput.first_selected = "A";
                    }
                    if (datainput.last_selected == "Akhir") {
                        datainput.last_selected = "Z";
                    }
                    var start = $scope.alphabetics.indexOf(datainput.first_selected);
                    var end = $scope.alphabetics.indexOf(datainput.last_selected);
                    if (end < start) {
                        toastr.warning("Kelas tidak sesuai ");
                    } else {
                        var last = end + 1;
                        var classes = $scope.alphabetics.slice(start, last);
                        var input = {
                            classes: classes,
                            course_seq: $scope.dataCourse.seq
                        };
                        AdminFactory.AddDataClassCourse(input).success(function (response) {
                            if (response.response != "FAIL") {
                                $scope.$uibModalInstance.dismiss();
                                toastr.success(response.message);
                                getCourse(seq);
                            } else {
                                toastr.warning(response.message);
                            }
                        });
                    }
                }
            }
            //Change Course Schedule
        $scope.dayOptionSelected = function () {
            var day_seq = $scope.data_input.pick_day_seq;
            AdminFactory.GetDayHour(day_seq).success(function (response) {
                if (response.response != "FAIL") {
                    $scope.DayHourOption = response.data;
                }
            });
        }

        $scope.dayHourOptionSelected = function () {
            var dh_seq = $scope.data_input.pick_day_hour_seq;
            var course_seq = $scope.dataCourse.seq;
            AdminFactory.GetRoomsByCourse(course_seq).success(function (response) {
                if (response.response != "FAIL") {
                    $scope.RoomsOption = response.data;
                }
            });
        }

        $scope.roomOptionSelected = function () {
            var availability_status = angular.element(document.querySelector('#availability_status'));
            var show_status = angular.element(document.querySelector('#show_status'));
            availability_status.css('display', '');
            show_status.css('display', 'none');
            availability_status.html('<i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw" ></i>');
            var pick_dh_seq = $scope.data_input.pick_day_hour_seq;
            var pick_room_seq = $scope.data_input.pick_room_seq;
            var input = {
                "pick_dh_seq": pick_dh_seq,
                "pick_room_seq": pick_room_seq,
            };
            AdminFactory.ScheduleCourseCheckRoom(JSON.stringify(input)).success(function (response) {
                if (response.response != "FAIL") {
                    $scope.scheduleCheck = response.data;
                    $timeout(function () {
                        availability_status.css('display', 'none');
                        show_status.css('display', '');
                    }, 90);
                }
            });
        }

        $scope.editCourseSchedule = function (schedule_seq) {
            var course_seq = $scope.dataCourse.seq;
            var input = {
                "pick_dh_seq": $scope.data_input.pick_day_hour_seq,
                "pick_class_seq": $scope.data_input.pick_class_seq,
                "pick_room_seq": $scope.data_input.pick_room_seq,
                "schedule_seq": $scope.schedule_seq
            }
            AdminFactory.EditCourseSchedule(JSON.stringify(input)).success(function (response) {
                if (response.response != "FAIL") {
                    $scope.$uibModalInstance.dismiss();
                    refreshCourseData();
                    toastr.success(response.message);
                } else {
                    toastr.warning(response.message);
                }
            })
            console.log(input);
        }

        $scope.ChangeCourseScheduleModal = function (item) {
            $scope.schedule_seq = item.schedule_seq;
            AdminFactory.GetAllDay().success(function (response) {
                if (response.response != "FAIL") {
                    $scope.DayOption = response.data;
                }
            });
            $scope.$uibModalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'course-schedule-change-modal.html',
                controller: 'AdminCourseController',
                size: 'lg',
                backdrop: 'static'
            });
            $scope.closeDeleteModal = function () {
                $scope.$uibModalInstance.dismiss('cancel');
            };
            $scope.courseDelete = function () {
                AdminFactory.DeleteDataCourse(seq).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.$uibModalInstance.dismiss();
                        refreshCourseData();
                        toastr.success(response.message);
                    } else {
                        toastr.warning(response.message);
                    }
                })
            }
        }

        $scope.deleteModal = function (seq) {
                $scope.$uibModalInstance = $uibModal.open({
                    scope: $scope,
                    animation: true,
                    ariaLabelledBy: 'modal-title-top',
                    ariaDescribedBy: 'modal-body-top',
                    templateUrl: 'course-delete-modal.html',
                    controller: 'AdminCourseController',
                    size: 'lg'
                });
                $scope.closeDeleteModal = function () {
                    $scope.$uibModalInstance.dismiss('cancel');
                };
                $scope.courseDelete = function () {
                    AdminFactory.DeleteDataCourse(seq).success(function (response) {
                        if (response.response != "FAIL") {
                            $scope.$uibModalInstance.dismiss();
                            refreshCourseData();
                            toastr.success(response.message);
                        } else {
                            toastr.warning(response.message);
                        }
                    })
                }
            }
            // FUNCTION TO GET Course DETAIL
        var getCourse = function (seq) {
            AdminFactory.GetCourse(seq).success(function (response) {
                if (response.response != "FAIL") {
                    $scope.dataCourse = response.data.course_data;
                    $scope.dataCourseClasses = response.data.course_classes;
                } else {
                    $scope.dataCourse = "";
                }
                $scope.getCourse = response.response;
            })
        }

        var getCourseSchedule = function (seq) {
            AdminFactory.GetCourseSchedule(seq).success(function (response) {
                if (response.response != "FAIL") {
                    $scope.dataCourseSchedule = response.data;
                    console.log($scope.dataCourseSchedule);
                } else {
                    $scope.dataCourseSchedule = "";
                }
            })
        }

        $scope.DeleteCourseSchedule = function (item) {
            if (confirm("Yakin menghapus data ini ?")) {
                var schedule_seq = item.schedule_seq;
                AdminFactory.DeleteCourseSchedule(schedule_seq).success(function (response) {
                    if (response.response != "FAIL") {
                        var index = $scope.dataCourseSchedule.indexOf(item);
                        if (index != -1) {
                            $scope.dataCourseSchedule.splice(index, 1);
                        }
                    }
                })

            }
            console.log($scope.dataCourseSchedule);
        }

        //FUNCTION TO GET TEACHER ON COURSE
        var getTeacherCourse = function (seq) {
                AdminFactory.GetTeacherCourse(seq).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.dataTeacherCourse = response.data;
                        console.log(response.data);
                    } else {
                        $scope.dataTeacherCourse = "";
                    }
                })
            }
            // IF DETAIL Course
        if ($stateParams.matakuliahSeq) {
            var seq = $stateParams.matakuliahSeq
            getCourse(seq);
            getCourseSchedule(seq);

        }
        // EDIT MODAL
        $scope.editModal = function (seq) {
            getCourse(seq);
            $scope.$uibModalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'course-edit-modal.html',
                controller: 'AdminCourseController',
                size: 'lg'
            });
            $scope.closeEditModal = function () {
                $scope.$uibModalInstance.dismiss('cancel');
            };
            $scope.courseEdit = function (dataCourse) {
                if (dataCourse.description == "" || dataCourse.description == undefined) {
                    dataCourse.description = "";
                }
                input = {
                    name: dataCourse.name,
                    major_seq: dataCourse.major_seq,
                    description: dataCourse.description,
                    seq: $scope.dataCourse.seq,
                    sks: dataCourse.sks
                };
                AdminFactory.PutDataCourse(input).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.$uibModalInstance.dismiss();
                        refreshCourseData();
                        toastr.success(response.message);
                    } else {
                        toastr.warning(response.message);
                    }
                });
            }
        }
        $scope.assigneTeacherModal = function (classSeq) {
            $scope.class_seq = classSeq;
            getTeacherCourse(seq);
            $scope.$uibModalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'course-assigne-teacher-modal.html',
                controller: 'AdminCourseController',
                size: 'lg'
            });
            $scope.CloseAssigneTeacherModal = function () {
                $scope.$uibModalInstance.dismiss('cancel');
            };
            $scope.assigneTeacherSubmit = function (pick_teacher_seq) {
                input = {
                    teacher_seq: pick_teacher_seq,
                    class_seq: $scope.class_seq,
                    course_seq: $scope.dataCourse.seq
                };
                console.log(input);
                AdminFactory.AssigneTeacherCourseClass(input).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.$uibModalInstance.dismiss();
                        getCourse(seq);
                        toastr.success(response.message);
                    } else {
                        toastr.warning(response.message);
                    }
                });
            }
        }
        $scope.deleteClassModal = function (classSeq) {
            $scope.class_to_delete_seq = classSeq;
            $scope.$uibModalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'course-delete-class-modal.html',
                controller: 'AdminCourseController',
                size: 'lg'
            });
            $scope.closeDeleteModal = function () {
                $scope.$uibModalInstance.dismiss('cancel');
            };
            $scope.classDelete = function () {
                var classSeq = $scope.class_to_delete_seq;
                AdminFactory.DeleteClassCourse(classSeq).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.$uibModalInstance.dismiss();
                        getCourse(seq);
                        toastr.success(response.message);
                    } else {
                        toastr.warning(response.message);
                    }
                })
            }
        }

        $scope.modalSchedule = function (class_seq) {

            $scope.$uibModalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'course-schedule-modal.html',
                controller: 'AdminCourseController',
                size: 'lg'
            });
            $scope.closeAddModal = function () {
                $scope.$uibModalInstance.dismiss('cancel');
            };
            $scope.courseAdd = function (data_input) {
                if (data_input.description == "" || data_input.description == undefined) {
                    data_input.description = "";
                }
                input = {
                    name: data_input.name,
                    major_seq: data_input.major_seq,
                    description: data_input.description,
                    sks: data_input.sks
                };
                AdminFactory.AddDataCourse(input).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.$uibModalInstance.dismiss();
                        refreshCourseData();
                        toastr.success(response.message);
                    } else {
                        toastr.warning(response.message);
                    }
                });
            }
        }
    })
    //TEACHER CONTROLLER
controllers.controller('AdminTeacherController', function ($rootScope, $scope, $localStorage, $state, $stateParams, $filter, toastr, AdminFactory, $uibModal) {
        $rootScope.title = "Dosen";
        $rootScope.parent_title = "";
        var refreshTeacherData = function () {
            AdminFactory.GetAllTeacher().success(function (response) {
                if (response.response == "OK") {
                    $scope.data = response.data.teachers;
                    $scope.educationDegreeOption = ["S1", "S2", "S3"];
                } else {
                    toastr.error(response.message);
                }
            });
        }
        if (!$stateParams.dosenSeq) {
            refreshTeacherData();
        }
        $scope.addModal = function () {
            $scope.$uibModalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'teacher-add-modal.html',
                controller: 'AdminTeacherController',
                size: 'lg'
            });
            $scope.closeAddModal = function () {
                $scope.$uibModalInstance.dismiss('cancel');
            };
            $scope.teacherAdd = function (data_input) {
                //            if (data_input.description == "" || data_input.description == undefined) {
                //                data_input.description = "";
                //            }
                input = {
                    nidn: data_input.nidn,
                    name: data_input.name,
                    contact: data_input.contact,
                    address: data_input.address,
                    education_degree: data_input.education_degree,
                    degree: data_input.degree
                };
                AdminFactory.AddDataTeacher(input).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.$uibModalInstance.dismiss();
                        refreshTeacherData();
                        toastr.success(response.message);
                    } else {
                        toastr.warning(response.message);
                    }
                });
            }
        }
        $scope.deleteModal = function (seq) {
                $scope.$uibModalInstance = $uibModal.open({
                    scope: $scope,
                    animation: true,
                    ariaLabelledBy: 'modal-title-top',
                    ariaDescribedBy: 'modal-body-top',
                    templateUrl: 'teacher-delete-modal.html',
                    controller: 'AdminTeacherController',
                    size: 'lg'
                });
                $scope.closeDeleteModal = function () {
                    $scope.$uibModalInstance.dismiss('cancel');
                };
                $scope.teacherDelete = function () {
                    AdminFactory.DeleteDataTeacher(seq).success(function (response) {
                        if (response.response != "FAIL") {
                            $scope.$uibModalInstance.dismiss();
                            refreshTeacherData();
                            toastr.success(response.message);
                        } else {
                            toastr.warning(response.message);
                        }
                    })
                }
            }
            // FUNCTION TO GET Teacher DETAIL
        var getTeacher = function (seq) {
            AdminFactory.GetTeacher(seq).success(function (response) {
                if (response.response == "OK") {
                    $scope.dataTeacher = response.data;
                    $scope.getTeacher = response.response;
                } else {
                    $scope.dataTeacher = "";
                    $rootScope.getTeacher = response.response;
                }
            })
        }
        var getAllCourse = function () {
            AdminFactory.GetAllCourse(seq).success(function (response) {
                if (response.response != "FAIL") {
                    $scope.dataCourse = response.data;
                } else {
                    $scope.dataCourse = "";
                }
            })
        }
        var getCourseTeacher = function () {
                AdminFactory.GetCourseTeacher(seq).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.dataCourseTeacher = response.data.teacher_courses;
                        $scope.dataCourse = response.data.all_courses;
                    } else {
                        $scope.dataCourse = "";
                    }
                })
            }
            // IF DETAIL Teacher
        if ($stateParams.dosenSeq) {
            var seq = $stateParams.dosenSeq
            getTeacher(seq);
            getCourseTeacher(seq);
        }
        $scope.addCourseModal = function () {
            $scope.$uibModalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'teacher-add-course-modal.html',
                controller: 'AdminTeacherController',
                size: 'lg'
            });
            $scope.closeAddCourseModal = function () {
                $scope.$uibModalInstance.dismiss('cancel');
            };
            $scope.AddCourseTeacher = function (data) {
                input = {
                    seq: data.pick_class_seq,
                    teacher_seq: $scope.dataTeacher.seq
                };
                AdminFactory.AddCourseTeacher(input).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.$uibModalInstance.dismiss();
                        getCourseTeacher($stateParams.dosenSeq);
                        toastr.success(response.message);
                    } else {
                        toastr.warning(response.message);
                    }
                });
            }
        }
        $scope.deleteCourseModal = function (seq) {
                $scope.courseSeq = seq;
                $scope.$uibModalInstance = $uibModal.open({
                    scope: $scope,
                    animation: true,
                    ariaLabelledBy: 'modal-title-top',
                    ariaDescribedBy: 'modal-body-top',
                    templateUrl: 'teacher-course-delete-modal.html',
                    controller: 'AdminTeacherController',
                    size: 'lg'
                });
                $scope.closeDeleteModal = function () {
                    $scope.$uibModalInstance.dismiss('cancel');
                };
                $scope.teacherCourseDelete = function () {
                    console.log($scope.courseSeq);
                    input = $scope.courseSeq;
                    AdminFactory.DeleteCourseTeacher(input).success(function (response) {
                        if (response.response != "FAIL") {
                            $scope.$uibModalInstance.dismiss();
                            getCourseTeacher($stateParams.dosenSeq);
                            toastr.success(response.message);
                        } else {
                            toastr.warning(response.message);
                        }
                    })
                }
            }
            // EDIT MODAL
        $scope.editModal = function (seq) {
            getTeacher(seq);
            $scope.$uibModalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'teacher-edit-modal.html',
                controller: 'AdminTeacherController',
                size: 'lg'
            });
            $scope.closeEditModal = function () {
                $scope.$uibModalInstance.dismiss('cancel');
            };
            $scope.teacherEdit = function (dataTeacher) {
                input = {
                    nidn: dataTeacher.nidn,
                    name: dataTeacher.name,
                    contact: dataTeacher.contact,
                    address: dataTeacher.address,
                    education_degree: dataTeacher.education_degree,
                    degree: dataTeacher.degree,
                    seq: dataTeacher.seq
                };
                AdminFactory.PutDataTeacher(input).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.$uibModalInstance.dismiss();
                        refreshTeacherData();
                        toastr.success(response.message);
                    } else {
                        toastr.warning(response.message);
                    }
                });
            }
        }
    })
    //DAY CONTROLLER
controllers.controller('AdminDayController', function ($rootScope, $scope, $localStorage, $state, $stateParams, $filter, toastr, AdminFactory, $uibModal) {
        $rootScope.title = "Hari";
        $rootScope.parent_title = "";
        var refreshDayData = function () {
            AdminFactory.GetAllDay().success(function (response) {
                if (response.response == "OK") {
                    $scope.data = response.data;
                } else {
                    toastr.error(response.message);
                }
            });
        }
        if (!$stateParams.dosenSeq) {
            refreshDayData();
        }
        $scope.addModal = function () {
            $scope.$uibModalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'day-add-modal.html',
                controller: 'AdminDayController',
                size: 'lg'
            });
            $scope.closeAddModal = function () {
                $scope.$uibModalInstance.dismiss('cancel');
            };
            $scope.dayAdd = function (data_input) {
                input = {
                    name: data_input.name,
                };
                AdminFactory.AddDataDay(input).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.$uibModalInstance.dismiss();
                        refreshDayData();
                        toastr.success(response.message);
                    } else {
                        toastr.warning(response.message);
                    }
                });
            }
        }
        $scope.deleteModal = function (seq) {
                $scope.$uibModalInstance = $uibModal.open({
                    scope: $scope,
                    animation: true,
                    ariaLabelledBy: 'modal-title-top',
                    ariaDescribedBy: 'modal-body-top',
                    templateUrl: 'day-delete-modal.html',
                    controller: 'AdminTeacherController',
                    size: 'lg'
                });
                $scope.closeDeleteModal = function () {
                    $scope.$uibModalInstance.dismiss('cancel');
                };
                $scope.dayDelete = function () {
                    AdminFactory.DeleteDataDay(seq).success(function (response) {
                        if (response.response != "FAIL") {
                            $scope.$uibModalInstance.dismiss();
                            refreshDayData();
                            toastr.success(response.message);
                        } else {
                            toastr.warning(response.message);
                        }
                    })
                }
            }
            //FUNCTION TO GET HOURS
        var getAllHours = function () {
                AdminFactory.GetAllHour().success(function (response) {
                    if (response.response == "OK") {
                        $scope.dataHour = response.data;
                    } else {
                        $scope.dataHour = "";
                    }
                })
            }
            // FUNCTION TO GET Day DETAIL
        var getDay = function (seq) {
            AdminFactory.GetDay(seq).success(function (response) {
                if (response.response == "OK") {
                    $scope.dataDay = response.data;
                    $scope.getDay = response.response;
                } else {
                    $scope.dataDay = "";
                    $rootScope.getDay = response.response;
                }
            })
        }
        var getDayHour = function (seq) {
            AdminFactory.GetDayHour(seq).success(function (response) {
                if (response.response == "OK") {
                    $scope.dataDayHour = response.data;
                } else {
                    $scope.dataDayHour = "";
                }
            })
        }
        var getAllDay = function () {
                AdminFactory.GetAllDay().success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.dataDay = response.data;
                    } else {
                        $scope.dataDay = "";
                    }
                })
            }
            // IF DETAIL Day
        if ($stateParams.hariSeq) {
            var seq = $stateParams.hariSeq
            getDay(seq);
            getDayHour(seq);
        }
        // EDIT MODAL
        $scope.editModal = function (seq) {
            getDay(seq);
            $scope.$uibModalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'day-edit-modal.html',
                controller: 'AdminDayController',
                size: 'lg'
            });
            $scope.closeEditModal = function () {
                $scope.$uibModalInstance.dismiss('cancel');
            };
            $scope.dayEdit = function (dataDay) {
                input = {
                    name: dataDay.name,
                    seq: dataDay.seq
                };
                AdminFactory.PutDataDay(input).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.$uibModalInstance.dismiss();
                        toastr.success(response.message);
                    } else {
                        toastr.warning(response.message);
                    }
                });
            }
        }
        $scope.addHourModal = function () {
            $scope.$uibModalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'add-hour-modal.html',
                controller: 'AdminDayController',
                size: 'lg'
            });
            $scope.closeHourModal = function () {
                $scope.$uibModalInstance.dismiss('cancel');
            };
            $scope.addHourSubmit = function (data_input) {
                input = {
                    hours_seq: data_input.pick_hour_seq,
                    day_seq: $scope.dataDay.seq
                };
                AdminFactory.AddDayHour(input).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.$uibModalInstance.dismiss();
                        getDayHour(seq);
                        toastr.success(response.message);
                    } else {
                        toastr.warning(response.message);
                    }
                });
            }
        }
        $scope.deleteHourModal = function (seq) {
            $scope.$uibModalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'day-hour-delete-modal.html',
                controller: 'AdminDayController',
                size: 'lg'
            });
            $scope.closeDeleteModal = function () {
                $scope.$uibModalInstance.dismiss('cancel');
            };
            $scope.hourDelete = function () {
                AdminFactory.DeleteDayHour(seq).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.$uibModalInstance.dismiss();
                        getDayHour($stateParams.hariSeq);
                        toastr.success(response.message);
                    } else {
                        toastr.warning(response.message);
                    }
                })
            }
        }
    })
    //HOUR CONTROLLER
controllers.controller('AdminHourController', function ($rootScope, $scope, $localStorage, $state, $stateParams, $filter, toastr, AdminFactory, $uibModal) {
    $rootScope.title = "Jam";
    $rootScope.parent_title = "";
    var refreshHourData = function () {
        AdminFactory.GetAllHour().success(function (response) {
            if (response.response == "OK") {
                $scope.data = response.data;
            } else {
                toastr.error(response.message);
            }
        });
    }
    if (!$stateParams.dosenSeq) {
        refreshHourData();
    }
    var zero = function (no) {
        var digit = no.toString().split('');
        var first_digit = digit[0];
        if (first_digit == '0' && no != '0') {
            var number = no;
        } else {
            if (no < 10) {
                var number = '0' + no;
            } else {
                var number = no;
            }
        }
        return number;
    };
    $scope.addModal = function () {
        $scope.$uibModalInstance = $uibModal.open({
            scope: $scope,
            animation: true,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: 'hour-add-modal.html',
            controller: 'AdminHourController',
            size: 'lg'
        });
        $scope.closeAddModal = function () {
            $scope.$uibModalInstance.dismiss('cancel');
        };
        $scope.hourAdd = function (data_input) {
            if (data_input.name == undefined) {
                toastr.warning("Nama tidak boleh kosong !");
            } else {
                input = {
                    name: data_input.name,
                    start_hour: zero(data_input.start_hour),
                    start_min: zero(data_input.start_min),
                    end_hour: zero(data_input.end_hour),
                    end_min: zero(data_input.end_min),
                };
                AdminFactory.AddDataHour(input).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.$uibModalInstance.dismiss();
                        refreshHourData();
                        toastr.success(response.message);
                    } else {
                        toastr.warning(response.message);
                    }
                });
            }
        }
    }
    $scope.deleteModal = function (seq) {
            $scope.$uibModalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'hour-delete-modal.html',
                controller: 'AdminTeacherController',
                size: 'lg'
            });
            $scope.closeDeleteModal = function () {
                $scope.$uibModalInstance.dismiss('cancel');
            };
            $scope.hourDelete = function () {
                AdminFactory.DeleteDataHour(seq).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.$uibModalInstance.dismiss();
                        refreshHourData();
                        toastr.success(response.message);
                    } else {
                        toastr.warning(response.message);
                    }
                })
            }
        }
        // FUNCTION TO GET Hour DETAIL
    var getHour = function (seq) {
        AdminFactory.GetHour(seq).success(function (response) {
            if (response.response == "OK") {
                $scope.dataHour = response.data;
                $scope.getHour = response.response;
            } else {
                $scope.dataHour = "";
                $rootScope.getHour = response.response;
            }
        })
    }
    var getAllHour = function () {
            AdminFactory.GetAllHour(seq).success(function (response) {
                if (response.response != "FAIL") {
                    $scope.dataHour = response.data;
                } else {
                    $scope.dataHour = "";
                }
            })
        }
        // IF DETAIL Hour
        //    if ($stateParams.dosenSeq) {
        //        var seq = $stateParams.dosenSeq
        //        getTeacher(seq);
        //        getCourseTeacher(seq);
        //    } 
        // EDIT MODAL
    $scope.editModal = function (seq) {
        getHour(seq);
        $scope.$uibModalInstance = $uibModal.open({
            scope: $scope,
            animation: true,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: 'hour-edit-modal.html',
            controller: 'AdminHourController',
            size: 'lg'
        });
        $scope.closeEditModal = function () {
            $scope.$uibModalInstance.dismiss('cancel');
        };
        $scope.hourEdit = function (dataHour) {
            if (dataHour.name == "") {
                toastr.warning("Nama tidak boleh kosong !");
            } else {
                input = {
                    name: dataHour.name,
                    start_hour: zero(dataHour.start_hour),
                    start_min: zero(dataHour.start_min),
                    end_hour: zero(dataHour.end_hour),
                    end_min: zero(dataHour.end_min),
                    seq: dataHour.seq
                };
                console.log(JSON.stringify(input));
                AdminFactory.PutDataHour(input).success(function (response) {
                    if (response.response != "FAIL") {
                        $scope.$uibModalInstance.dismiss();
                        refreshHourData();
                        toastr.success(response.message);
                    } else {
                        toastr.warning(response.message);
                    }
                });
            }
        }
    }
})
controllers.controller('AdminScheduleController', function ($rootScope, $filter, $scope, $localStorage, $state, $stateParams, $filter, toastr, AdminFactory, $uibModal) {
    var viewsPrefix = 'views/';
    $rootScope.title = "Tambah Jadwal";
    $rootScope.parent_title = "Jadwal";
    $scope.roomPicked = [];
    $scope.steps = [
        {
            templateUrl: viewsPrefix + 'admin/tambah_jadwal_step_1.html',
            title: 'Mata Kuliah',
            hasForm: true,
            isolatedScope: true,
            controller: 'AdminScheduleController'
        }
        , {
            templateUrl: viewsPrefix + 'admin/tambah_jadwal_step_2.html',
            title: 'Kelas',
            hasForm: true,
            controller: 'AdminScheduleController'
        }
        , {
            templateUrl: viewsPrefix + 'admin/tambah_jadwal_step_3.html',
            title: 'Hari',
            hasForm: true,
            controller: 'AdminScheduleController'
        }

    ];
    var getFaculty = function (seq) {
        AdminFactory.GetAllCourse(seq).success(function (response) {
            if (response.response != "FAIL") {
                $scope.dataCourse = response.data;
            } else {
                $scope.dataCourse = "";
            }
        })
    }

    // Go To Step 2
    $scope.setCourse = function () {
        $rootScope.step = 'step_2';
        $rootScope.LastStep = "";
        $rootScope.pick_course_seq = $scope.data_input.pick_course_seq;
        //        console.log($rootScope.step);
    }

    $scope.setClass = function () {
        $rootScope.step = 'step_3';
        $rootScope.pick_class_seq = $scope.data_input.pick_class_seq;
        //        console.log($rootScope.pick_class_seq);
    }

    var step = function () {
        if ($rootScope.step == 'step_2') {
            $rootScope.LastStep = "";
            var course_seq = $rootScope.pick_course_seq;
            AdminFactory.GetClass(course_seq).success(function (response) {
                if (response.response != "FAIL") {
                    $scope.dataClassCourse = response.data;
                } else {
                    $scope.dataClassCourse = "";
                }
            })
        }

        if ($rootScope.step == 'step_3') {
            var class_seq = $rootScope.pick_class_seq;
            AdminFactory.ScheduleCourseGetDayHour($rootScope.pick_course_seq).success(function (response) {
                if (response.response != "FAIL") {
                    $scope.dataDay = response.data;
                    $scope.dataRoom = response.data.rooms;
                    $rootScope.LastStep = 'pick_day_hour';
                } else {
                    $scope.dataDay = "";
                }
            })
        }

        if ($rootScope.step == 'step_4') {
            var pick_dh_seq = $rootScope.pick_day_hour_seq;
            var rooms = $scope.dataDay.rooms;
            var input = {
                "pick_dh_seq": pick_dh_seq,
                "rooms": rooms
            }

            //            console.log(JSON.stringify(input));
            AdminFactory.ScheduleCourseCheckRoom(JSON.stringify(input)).success(function (response) {
                if (response.response != "FAIL") {
                    $scope.dataDayRoom = response.data;
                } else {
                    $scope.dataDayRoom = "";
                }
            })
        }
        $scope.removePickedRoom = function (pick_day_hour_seq) {
            var found = $filter('filter')($scope.roomPicked, {
                pick_dh_seq: pick_day_hour_seq
            }, true);
            if (found.length) {
                found[0].pick_room_seq = "";
                found[0].availability = "";
                var remove_btn = angular.element(document.querySelector('#remove_btn_' + pick_day_hour_seq));
                var availability_status = angular.element(document.querySelector('#availability_status_' + pick_day_hour_seq));
                remove_btn.css('display', 'none');
                availability_status.css('display', 'none');

            }
            //            console.log($scope));
        }

        $scope.checkRoom = function (pick_day_hour_seq, room_seq) {
            var input = {
                "pick_dh_seq": pick_day_hour_seq,
                "pick_room_seq": room_seq,
            };
            AdminFactory.ScheduleCourseCheckRoom(JSON.stringify(input)).success(function (response) {
                if (response.response != "FAIL") {
                    var data = response.data;
                    var input = {
                        "pick_dh_seq": pick_day_hour_seq,
                        "pick_room_seq": room_seq,
                        "availability": data.room_availability,
                    }
                    var availability_status = angular.element(document.querySelector('#availability_status_' + pick_day_hour_seq));
                    var remove_btn = angular.element(document.querySelector('#remove_btn_' + pick_day_hour_seq));

                    if (data.room_availability == "YES") {
                        var availability_message = "<span class='tag tag-success'>Ya</span>&nbsp;";
                    } else {
                        var availability_message = "<span class='tag tag-danger'>Tidak</span>&nbsp;";
                    }
                    availability_status.css('display', '');
                    availability_status.html(availability_message);
                    remove_btn.css('display', '');

                    var found = $filter('filter')($scope.roomPicked, {
                        pick_dh_seq: pick_day_hour_seq
                    }, true);
                    if (found.length) {
                        //                        console.log(found[0]);
                        found[0].pick_room_seq = room_seq;
                        found[0].availability = data.room_availability;
                    } else {
                        $scope.roomPicked.push(input);
                    }
                    $rootScope.roomPickedFix = $scope.roomPicked;
                    console.log(JSON.stringify($scope.roomPicked));
                    //                    $scope.setAvailability(pick_day_hour_seq);

                } else {
                    toastr.warning(response.message);
                }
            })

        }



        //        $scope.setAvailability = function (pick_day_hour_seq) {
        //            var found = $filter('filter')($scope.roomPicked, {
        //                pick_dh_seq: pick_day_hour_seq
        //            }, true);
        //            if (found.length) {
        //                console.log(found[0]);
        //                //                $scope.textAvailability_[pick_day_hour_seq] = found[0].availability;
        //                var availability_status = angular.element(document.querySelector('#availability_status_' + pick_day_hour_seq));
        //                availability_status.text(found[0].availability);
        //            }
        //            console.log(JSON.stringify($scope.roomPicked));
        //        }
        $scope.pickHourModal = function (pick_day_hour_seq) {
            var pick_dh_seq = pick_day_hour_seq;
            $rootScope.step = 'step_4';
            $rootScope.pick_day_hour_seq = pick_dh_seq;
            $scope.$uibModalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'pick-hour-modal.html',
                controller: 'AdminScheduleController',
                size: 'xs'
            });
            $scope.closeAddModal = function () {
                $scope.$uibModalInstance.dismiss('cancel');
                $rootScope.step = 'step_3';
            };
            $scope.addRoom = function (data_input) {
                var input = {
                    "pick_dh_seq": $rootScope.pick_day_hour_seq,
                    "pick_room_seq": data_input.pick_room_seq
                }
                $scope.roomPicked.push(input);
                console.log($scope.roomPicked);
            }
        }

    }
    $scope.addRoomData = function () {
        var room_data = $rootScope.roomPickedFix;
        var class_seq = $rootScope.pick_class_seq
        var input = {
            "room_data": room_data,
            "class_seq": class_seq
        }
        AdminFactory.ScheduleSubmitRoom(JSON.stringify(input)).success(function (response) {
            if (response.response != "FAIL") {
                toastr.success(response.message)
                $state.go('admin.dashboard');
            } else {
                toastr.warning(response.message)
            }
        })
    }
    step();
    getFaculty();
})