var services = angular.module('app.services', [])

services.service('AdminTokenService', function ($localStorage, $state, AdminTokenFactory, toastr) {    
    this.checkToken = function () {
        token = JSON.stringify($localStorage.faculty_schedule_token);
        if (token == null) {            
            $state.go('front.login-admin');
            toastr.warning("Tidak diizinkan");
        } else {
            var text = $localStorage.faculty_schedule_token.token;
            var encode = text.trim(text);
            AdminTokenFactory.AdminCheckToken(encode).success(function (response) {
//                console.log(JSON.stringify(response));
                if (response.response != "OK") {
                    console.log(response.message);
                    $state.go('front.login-admin');
                }
            }).error(function (response) {
                console.log('no response');
            });
        }
    };
});

