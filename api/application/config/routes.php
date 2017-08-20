<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

//ROUTE FOR ADMIN
//admin auth
$route['v1/admin/login'] = 'v1/admin/authentication/login';
$route['v1/admin/checktoken'] = 'v1/admin/admin/json_checktoken';
// admin building
$route['v1/admin/building/all'] = 'v1/admin/building/all';
$route['v1/admin/building/add'] = 'v1/admin/building/add';
$route['v1/admin/building/get/(:any)'] = 'v1/admin/building/get';
$route['v1/admin/building/delete/(:any)'] = 'v1/admin/building/delete';
$route['v1/admin/building/put/(:any)'] = 'v1/admin/building/put';
// admin room
$route['v1/admin/room/all'] = 'v1/admin/room/all';
$route['v1/admin/room/add'] = 'v1/admin/room/add';
$route['v1/admin/room/course/(:any)'] = 'v1/admin/room/get_course';
$route['v1/admin/room/get/(:any)'] = 'v1/admin/room/get';
$route['v1/admin/room/delete/(:any)'] = 'v1/admin/room/delete';
$route['v1/admin/room/put/(:any)'] = 'v1/admin/room/put';
// admin faculty
$route['v1/admin/faculty/all'] = 'v1/admin/faculty/all';
$route['v1/admin/faculty/add'] = 'v1/admin/faculty/add';
$route['v1/admin/faculty/get/(:any)'] = 'v1/admin/faculty/get';
$route['v1/admin/faculty/delete/(:any)'] = 'v1/admin/faculty/delete';
$route['v1/admin/faculty/put/(:any)'] = 'v1/admin/faculty/put';
$route['v1/admin/faculty/schedule/get/(:any)'] = 'v1/admin/faculty/get_schedule';
$route['v1/admin/faculty/schedule/put'] = 'v1/admin/faculty/put_schedule';
$route['v1/admin/faculty/schedule/delete_all'] = 'v1/admin/faculty/delete_schedule_all';
//admin major
$route['v1/admin/major/all'] = 'v1/admin/major/all';
$route['v1/admin/major/add'] = 'v1/admin/major/add';
$route['v1/admin/major/faculty/(:any)'] = 'v1/admin/major/get_by_faculty';
$route['v1/admin/major/get/(:any)'] = 'v1/admin/major/get';
$route['v1/admin/major/delete/(:any)'] = 'v1/admin/major/delete';
$route['v1/admin/major/put/(:any)'] = 'v1/admin/major/put';
//admin course
$route['v1/admin/course/all'] = 'v1/admin/course/all';
$route['v1/admin/course/add'] = 'v1/admin/course/add';
$route['v1/admin/course/schedule/(:any)'] = 'v1/admin/course/get_schedule';
$route['v1/admin/course/get/(:any)'] = 'v1/admin/course/get';
$route['v1/admin/course/delete/(:any)'] = 'v1/admin/course/delete';
$route['v1/admin/course/put/(:any)'] = 'v1/admin/course/put';
$route['v1/admin/course/class/get/(:any)'] = 'v1/admin/course/get_class';
$route['v1/admin/course/class/add'] = 'v1/admin/course/add_class';
$route['v1/admin/course/class/delete/(:any)'] = 'v1/admin/course/delete_class';
$route['v1/admin/course/teacher/get/(:any)'] = 'v1/admin/course/get_teacher';
$route['v1/admin/course/teacher/class/add'] = 'v1/admin/course/add_teacher_class';
$route['v1/admin/course/schedule/delete/(:any)'] = 'v1/admin/course/delete_schedule';
$route['v1/admin/course/schedule_put'] = 'v1/admin/course/put_schedule';
$route['v1/admin/course/schedule/get/(:any)'] = 'v1/admin/course/get_schedule';
$route['v1/admin/course/major/(:any)'] = 'v1/admin/course/get_by_major';

//admin teacher
$route['v1/admin/teacher/all'] = 'v1/admin/teacher/all';
$route['v1/admin/teacher/add'] = 'v1/admin/teacher/add';
$route['v1/admin/teacher/get/(:any)'] = 'v1/admin/teacher/get';
$route['v1/admin/teacher/delete/(:any)'] = 'v1/admin/teacher/delete';
$route['v1/admin/teacher/put/(:any)'] = 'v1/admin/teacher/put';
$route['v1/admin/teacher/course/add'] = 'v1/admin/teacher/add_course';
$route['v1/admin/teacher/course/get/(:any)'] = 'v1/admin/teacher/get_course';
$route['v1/admin/teacher/course/delete/(:any)'] = 'v1/admin/teacher/delete_course';
//admin day
$route['v1/admin/day/all'] = 'v1/admin/day/all';
$route['v1/admin/day/add'] = 'v1/admin/day/add';
$route['v1/admin/day/get/(:any)'] = 'v1/admin/day/get';
$route['v1/admin/day/delete/(:any)'] = 'v1/admin/day/delete';
$route['v1/admin/day/put/(:any)'] = 'v1/admin/day/put';
$route['v1/admin/day/hour/add'] = 'v1/admin/day/add_hour';
$route['v1/admin/day/hour/get/(:any)'] = 'v1/admin/day/get_hour';
$route['v1/admin/day/hour/delete/(:any)'] = 'v1/admin/day/delete_hour';
// admin hour
$route['v1/admin/hour/all'] = 'v1/admin/hour/all';
$route['v1/admin/hour/add'] = 'v1/admin/hour/add';
$route['v1/admin/hour/get/(:any)'] = 'v1/admin/hour/get';
$route['v1/admin/hour/delete/(:any)'] = 'v1/admin/hour/delete';
$route['v1/admin/hour/put/(:any)'] = 'v1/admin/hour/put';

//admin schedule
$route['v1/admin/schedule/log'] = 'v1/admin/schedule/all';
$route['v1/admin/schedule/course/(:any)'] = 'v1/admin/schedule/get_course';
$route['v1/admin/schedule/course/(:any)/generate'] = 'v1/admin/schedule/get_course_generate';
$route['v1/admin/schedule/course/(:any)/generate_new'] = 'v1/admin/schedule/get_course_generate_new';
$route['v1/admin/schedule/major/generate/(:any)'] = 'v1/admin/schedule/get_major_generate';
$route['v1/admin/schedule/major/add'] = 'v1/admin/schedule/add_major_generate';
$route['v1/admin/schedule/check_room'] = 'v1/admin/schedule/check_room';
$route['v1/admin/schedule/add_room'] = 'v1/admin/schedule/add_room';
$route['v1/admin/schedule/add_manual'] = 'v1/admin/schedule/add_manual';
$route['v1/admin/schedule/delete/(:any)'] = 'v1/admin/schedule/delete';
