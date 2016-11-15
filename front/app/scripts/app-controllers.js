var controllers = angular.module('app.controllers', [])

controllers.controller('AdminHeaderController', function ($scope, AdminTokenService, $localStorage, $state, $stateParams, toastr, $uibModal) {
    AdminTokenService.checkToken();
    $scope.logoutModal = function () {
        $scope.$uibModalInstance =
                $uibModal.open({
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
            $state.go('front.login-admin');
            toastr.success('Berhasil keluar');
        }
    }

})
controllers.controller('AdminLoginController', function ($scope, $localStorage, $state, $stateParams, jwtHelper, md5, toastr, AdminFactory) {
    $scope.doLogin = function () {
        input = {
            username: $scope.inputdata.username
            , password: md5.createHash($scope.inputdata.password)
        };
        AdminFactory.Login(input).success(function (response) {
            var token = jwtHelper.decodeToken(response);
            if (token.response == "OK") {
                toastr.success("Selamat datang");
                dataAuth = {
                    token: response
                };
                $localStorage.faculty_schedule_token = dataAuth;
                $state.go('admin.dashboard');
            } else {
                toastr.error("Login Gagal");
            }
        });

    }
})


controllers.controller('AdminBuildingController', function ($rootScope, $scope, $localStorage, $state, $stateParams, $filter, toastr, AdminFactory, $uibModal)
{

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
        $scope.$uibModalInstance =
                $uibModal.open({
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
            input = {name: data_input.name, description: data_input.description};
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
        $scope.$uibModalInstance =
                $uibModal.open({
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
        $scope.$uibModalInstance =
                $uibModal.open({
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
            input = {name: dataBuilding.name, description: dataBuilding.description, seq: $scope.dataBuilding.seq};
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

controllers.controller('AdminRoomController', function ($rootScope, $scope, $localStorage, $state, $stateParams, $filter, toastr, AdminFactory, $uibModal)
{
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
        $scope.$uibModalInstance =
                $uibModal.open({
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
            input =
                    {
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
        $scope.$uibModalInstance =
                $uibModal.open({
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
        $scope.$uibModalInstance =
                $uibModal.open({
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

controllers.controller('AdminFacultyController', function ($rootScope, $scope, $localStorage, $state, $stateParams, $filter, toastr, AdminFactory, $uibModal)
{

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

    refreshFacultyData();

    $scope.addModal = function () {
        $scope.$uibModalInstance =
                $uibModal.open({
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
            input = {name: data_input.name, description: data_input.description};
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
        $scope.$uibModalInstance =
                $uibModal.open({
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
        $scope.$uibModalInstance =
                $uibModal.open({
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
            input = {name: dataFaculty.name, description: dataFaculty.description, seq: $scope.dataFaculty.seq};
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

controllers.controller('AdminMajorController', function ($rootScope, $scope, $localStorage, $state, $stateParams, $filter, toastr, AdminFactory, $uibModal)
{

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
        $scope.$uibModalInstance =
                $uibModal.open({
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
            input = {name: data_input.name, faculty_seq: data_input.faculty_seq, description: data_input.description};
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
        $scope.$uibModalInstance =
                $uibModal.open({
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
        $scope.$uibModalInstance =
                $uibModal.open({
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
            input = {name: dataMajor.name, faculty_seq: dataMajor.faculty_seq, description: dataMajor.description, seq: $scope.dataMajor.seq};
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

controllers.controller('AdminCourseController', function ($rootScope, $scope, $localStorage, $state, $stateParams, $filter, toastr, AdminFactory, $uibModal)
{

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
        $scope.$uibModalInstance =
                $uibModal.open({
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
            input = {name: data_input.name, major_seq: data_input.major_seq, description: data_input.description, sks: data_input.sks};
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
        $scope.$uibModalInstance =
                $uibModal.open({
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

//                console.log(input);

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
    $scope.deleteModal = function (seq) {
        $scope.$uibModalInstance =
                $uibModal.open({
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
    }

// EDIT MODAL
    $scope.editModal = function (seq) {
        getCourse(seq);
        $scope.$uibModalInstance =
                $uibModal.open({
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
            input = {name: dataCourse.name, major_seq: dataCourse.major_seq, description: dataCourse.description, seq: $scope.dataCourse.seq, sks: dataCourse.sks};
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
        $scope.$uibModalInstance =
                $uibModal.open({
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
        $scope.$uibModalInstance =
                $uibModal.open({
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

})

controllers.controller('AdminTeacherController', function ($rootScope, $scope, $localStorage, $state, $stateParams, $filter, toastr, AdminFactory, $uibModal)
{

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
        $scope.$uibModalInstance =
                $uibModal.open({
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
        $scope.$uibModalInstance =
                $uibModal.open({
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
//        getAllCourse();
        $scope.$uibModalInstance =
                $uibModal.open({
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
                seq: data.pick_course_seq,
                teacher_seq: $scope.dataTeacher.seq

            };
//            console.log(JSON.stringify(input));
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
        $scope.$uibModalInstance =
                $uibModal.open({
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
        $scope.$uibModalInstance =
                $uibModal.open({
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
