'use strict';

angular.module('app').controller('AppCtrl', ['$scope', '$http', '$localStorage', '$timeout', '$translate', '$uibModal', '$location',
    function AppCtrl($scope, $http, $localStorage, $timeout, $translate, $uibModal, $location) {

        var vm = this;

        vm.app = {
            name: 'Penjadwalan Fakultas',
            year: (new Date()).getFullYear(),
            offcanvas: false,
            expanding: false,
            fixedHeader: false,
            boxed: false,
            static: false,
            search: true,
            options: true,
            theme: '',
            isMessageOpen: false,
            isContactOpen: false
        };

        if (angular.isDefined($localStorage.app)) {
            vm.app = $localStorage.app;
        } else {
            $localStorage.app = vm.app;
        }

        $scope.$watch('app', function () {
            $localStorage.app = vm.app;
        }, true);

        //Dummy user data
        vm.user = {
            fname: 'Root',
            lname: 'User',
            jobDesc: 'Administrator',
            avatar: 'images/avatar.jpg',
        };

        //Search 
        vm.searchFocus = false;
        vm.focusOn = function () {
            vm.searchFocus = true;
        };
        vm.focusOff = function () {
            $timeout(function () {
                vm.searchFocus = false;
            }, 100);
        };

        // Localization
        vm.setLang = function (langKey) {
            $translate.use(langKey);
        };

        //Chat modal
        vm.openChat = function () {
            var chatModalInstance = $uibModal.open({
                templateUrl: 'chatModal.html',
                controller: 'chatModalInstanceCtrl',
                controllerAs: 'chatmodal',
                windowClass: 'sidebar-modal chat-panel',
                backdropClass: 'chat-backdrop'
            });
        };

        // Offcanvas and horizontal menu
        vm.menu = false;
        vm.toggleMenu = function () {
            vm.menu = !vm.menu;
        };


        //Demo purposes. These can be removed
        var searchObject = $location.search();
        if (searchObject.layout) {
            vm.app.offcanvas = false;
            vm.app.expanding = false;
            vm.app.fixedHeader = false;
            vm.app.boxed = false;
            vm.app.static = false;

            switch (searchObject.layout) {
                case "offcanvas":
                    vm.app.offcanvas = true;
                    break;
                case "expanding":
                    vm.app.expanding = true;
                    break;
                case "fixed":
                    vm.app.fixedHeader = true;
                    break;
                case "boxed":
                    vm.app.boxed = true;
                    break;
                case "static":
                    vm.app.static = true;
                    break;
            }
        }
        ;

        vm.expandingFix = function (ev) {
            if (ev) {
                vm.app.offcanvas = false;
            }
        }

        vm.offcanvasFix = function (ev) {
            if (ev) {
                vm.app.expanding = false;
            }
        }

    }
]);

function chatModalInstanceCtrl($uibModalInstance, $uibModal) {
    var vm = this;
    vm.ok = function () {
        $uibModalInstance.close();
    };
    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    vm.openMessage = function () {
        var messageModalInstance = $uibModal.open({
            templateUrl: 'conversationModal.html',
            controller: 'chatModalInstanceCtrl',
            controllerAs: 'conversation',
            windowTopClass: 'chat-message'
        });
    };
}


angular.module('app').controller('chatModalInstanceCtrl', ['$uibModalInstance', '$uibModal', chatModalInstanceCtrl]);


