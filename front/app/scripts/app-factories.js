var factories = angular.module('app.factories', [])



factories.factory('AdminFactory', function ($http, api, $localStorage) {
    var data = {};
    var getToken = function () {
        var text = $localStorage.faculty_schedule_token.token;
        var encode = text.trim(text);
        var headers = {headers: {'data-token': encode}};
        return headers;
    }
    data.Login = function (datas) {
        return $http.post(api + 'admin/login', datas);
    };
    // BUILDING
    data.GetAllBuilding = function () {
        return $http.get(api + 'admin/building/all', getToken());
    };
    data.GetBuilding = function (datas, options) {
        return $http.get(api + 'admin/building/get/' + datas, getToken());
    };

    data.AddDataBuilding = function (datas) {
        return $http.post(api + 'admin/building/add', datas, getToken());
    };

    data.PutDataBuilding = function (datas) {
        return $http.post(api + 'admin/building/put/' + datas.seq, datas, getToken());
    };

    data.DeleteDataBuilding = function (datas) {
        return $http.get(api + 'admin/building/delete/' + datas, getToken());
    };
    // ROOM 
    data.GetAllRoom = function () {
        return $http.get(api + 'admin/room/all', getToken());
    };
    data.GetRoom = function (datas) {
        return $http.get(api + 'admin/room/get/' + datas, getToken());
    };

    data.AddDataRoom = function (datas) {
        return $http.post(api + 'admin/room/add', datas, getToken());
    };

    data.PutDataRoom = function (datas) {
        return $http.post(api + 'admin/room/put/' + datas.seq, datas, getToken());
    };

    data.DeleteDataRoom = function (datas) {
        return $http.get(api + 'admin/room/delete/' + datas, getToken());
    };
    //FACULTY
    data.GetAllFaculty = function () {
        return $http.get(api + 'admin/faculty/all', getToken());
    };
    data.GetFaculty = function (datas) {
        return $http.get(api + 'admin/faculty/get/' + datas, getToken());
    };

    data.AddDataFaculty = function (datas) {
        return $http.post(api + 'admin/faculty/add', datas, getToken());
    };

    data.PutDataFaculty = function (datas) {
        return $http.post(api + 'admin/faculty/put/' + datas.seq, datas, getToken());
    };

    data.DeleteDataFaculty = function (datas) {
        return $http.get(api + 'admin/faculty/delete/' + datas, getToken());
    };
    
    // MAJOR / JURUSAN
    data.GetAllMajor = function () {
        return $http.get(api + 'admin/major/all', getToken());
    };
    data.GetMajor = function (datas) {
        return $http.get(api + 'admin/major/get/' + datas, getToken());
    };

    data.AddDataMajor = function (datas) {
        return $http.post(api + 'admin/major/add', datas, getToken());
    };

    data.PutDataMajor = function (datas) {
        return $http.post(api + 'admin/major/put/' + datas.seq, datas, getToken());
    };

    data.DeleteDataMajor = function (datas) {
        return $http.get(api + 'admin/major/delete/' + datas, getToken());
    };
    return data;
});

factories.factory('AdminTokenFactory', function ($http, api) {
    var data = {};
    data.AdminCheckToken = function (datas) {
        return $http({
            method: 'POST',
            url: api + 'admin/checktoken',
            headers: {'data-token': datas},
        });
    };
    return data;
})

