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
            input = {name: dataMajor.name, faculty_seq: dataMajor.faculty_seq,description: dataMajor.description, seq: $scope.dataMajor.seq};
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

