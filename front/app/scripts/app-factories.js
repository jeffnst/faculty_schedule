var factories = angular.module('app.factories', [])

factories.factory('AdminFactory', function ($http, api, $localStorage) {
    var data = {};
    var getToken = function () {
        var text = $localStorage.faculty_schedule_token.token;
        var encode = text.trim(text);
        var headers = {
            headers: {
                'data-token': encode
            }
        };
        return headers;
    }

    //LOGIN
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

    data.GetRoomsByCourse = function (datas) {
        return $http.get(api + 'admin/room/course/' + datas, getToken());
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

    data.GetFacultySchedule = function (datas) {
        return $http.get(api + 'admin/faculty/schedule/get/' + datas, getToken());
    };

    data.DeleteFacultyScheduleAll = function (datas) {
        return $http.post(api + 'admin/faculty/schedule/delete_all', datas, getToken());
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
    data.GetMajorByFaculty = function (datas) {
        return $http.get(api + 'admin/major/faculty/' + datas, getToken());
    };
    data.GenerateMajorSchedule = function (datas) {
        return $http.get(api + 'admin/schedule/major/generate/' + datas, getToken());
    };

    data.SaveGenerateMajorSchedule = function (datas) {
        return $http.post(api + 'admin/schedule/major/add', datas, getToken());
    };

    // COURSE / MATAKULIAH
    data.GetAllCourse = function () {
        return $http.get(api + 'admin/course/all', getToken());
    };

    data.GetCourse = function (datas) {
        return $http.get(api + 'admin/course/get/' + datas, getToken());
    };

    data.GetCourseByMajor = function (datas) {
        return $http.get(api + 'admin/course/major/' + datas, getToken());
    };

    data.AddDataCourse = function (datas) {
        return $http.post(api + 'admin/course/add', datas, getToken());
    };
    data.PutDataCourse = function (datas) {
        return $http.post(api + 'admin/course/put/' + datas.seq, datas, getToken());
    };
    data.DeleteDataCourse = function (datas) {
        return $http.get(api + 'admin/course/delete/' + datas, getToken());
    };

    data.GetClass = function (datas) {
        return $http.get(api + 'admin/course/class/get/' + datas, getToken());
    };

    data.AddDataClassCourse = function (datas) {
        return $http.post(api + 'admin/course/class/add', datas, getToken());
    };
    data.DeleteClassCourse = function (datas) {
        return $http.get(api + 'admin/course/class/delete/' + datas, getToken());
    };
    data.GetTeacherCourse = function (datas) {
        return $http.get(api + 'admin/course/teacher/get/' + datas, getToken());
    };
    data.AssigneTeacherCourseClass = function (datas) {
        return $http.post(api + 'admin/course/teacher/class/add', datas, getToken());
    };

    data.GetCourseSchedule = function (datas) {
        return $http.get(api + 'admin/course/schedule/get/' + datas, getToken());
    };

    data.DeleteFacultySchedule = function (datas) {
        return $http.get(api + 'admin/course/schedule/delete/' + datas, getToken());
    };

    data.EditFacultySchedule = function (datas) {
        return $http.post(api + 'admin/faculty/schedule/put', datas, getToken());
    };


    // Teacher / DOSEN    
    data.GetAllTeacher = function () {
        return $http.get(api + 'admin/teacher/all', getToken());
    };
    data.GetTeacher = function (datas) {
        return $http.get(api + 'admin/teacher/get/' + datas, getToken());
    };
    data.AddDataTeacher = function (datas) {
        return $http.post(api + 'admin/teacher/add', datas, getToken());
    };
    data.PutDataTeacher = function (datas) {
        return $http.post(api + 'admin/teacher/put/' + datas.seq, datas, getToken());
    };
    data.DeleteDataTeacher = function (datas) {
        return $http.get(api + 'admin/teacher/delete/' + datas, getToken());
    };
    data.GetCourseTeacher = function (datas) {
        return $http.get(api + 'admin/teacher/course/get/' + datas, getToken());
    };
    data.AddCourseTeacher = function (datas) {
        return $http.post(api + 'admin/teacher/course/add', datas, getToken());
    };

    data.DeleteCourseTeacher = function (datas) {
        return $http.get(api + 'admin/teacher/course/delete/' + datas, getToken());
    };

    // Day / Hari
    data.AddDataDay = function (datas) {
        return $http.post(api + 'admin/day/add', datas, getToken());
    };

    data.AddDayHour = function (datas) {
        return $http.post(api + 'admin/day/hour/add', datas, getToken());
    };

    data.GetAllDay = function () {
        return $http.get(api + 'admin/day/all', getToken());
    };
    data.GetDay = function (datas) {
        return $http.get(api + 'admin/day/get/' + datas, getToken());
    };
    data.GetDayHour = function (datas) {
        return $http.get(api + 'admin/day/hour/get/' + datas, getToken());
    };
    data.PutDataDay = function (datas) {
        return $http.post(api + 'admin/day/put/' + datas.seq, datas, getToken());
    };
    data.DeleteDataDay = function (datas) {
        return $http.get(api + 'admin/day/delete/' + datas, getToken());
    };
    data.DeleteDayHour = function (datas) {
        return $http.get(api + 'admin/day/hour/delete/' + datas, getToken());
    };

    // Hour / JAM
    data.AddDataHour = function (datas) {
        return $http.post(api + 'admin/hour/add', datas, getToken());
    };
    data.GetAllHour = function () {
        return $http.get(api + 'admin/hour/all', getToken());
    };
    data.GetHour = function (datas) {
        return $http.get(api + 'admin/hour/get/' + datas, getToken());
    };
    data.PutDataHour = function (datas) {
        return $http.post(api + 'admin/hour/put/' + datas.seq, datas, getToken());
    };
    data.DeleteDataHour = function (datas) {
        return $http.get(api + 'admin/hour/delete/' + datas, getToken());
    };

    // Schedule / penjadwalan    

    data.ScheduleCourseGetDayHour = function (datas) {
        return $http.get(api + 'admin/schedule/course/' + datas, getToken());
    };

    data.ScheduleCourseCheckRoom = function (datas) {
        return $http.post(api + 'admin/schedule/check_room', datas, getToken());
    };

    data.ScheduleSubmitRoom = function (datas) {
        return $http.post(api + 'admin/schedule/add_room', datas, getToken());
    };
    
    data.AddManualFacultySchedule = function (datas) {
        return $http.post(api + 'admin/schedule/add_manual', datas, getToken());
    };

    return data;
});

factories.factory('AdminTokenFactory', function ($http, api) {
    var data = {};
    data.AdminCheckToken = function (datas) {
        return $http({
            method: 'POST',
            url: api + 'admin/checktoken',
            headers: {
                'data-token': datas
            },
        });
    };
    return data;
})