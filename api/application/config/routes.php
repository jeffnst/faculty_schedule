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
$route['v1/admin/room/get/(:any)'] = 'v1/admin/room/get';
$route['v1/admin/room/delete/(:any)'] = 'v1/admin/room/delete';
$route['v1/admin/room/put/(:any)'] = 'v1/admin/room/put';
// admin faculty
$route['v1/admin/faculty/all'] = 'v1/admin/faculty/all';
$route['v1/admin/faculty/add'] = 'v1/admin/faculty/add';
$route['v1/admin/faculty/get/(:any)'] = 'v1/admin/faculty/get';
$route['v1/admin/faculty/delete/(:any)'] = 'v1/admin/faculty/delete';
$route['v1/admin/faculty/put/(:any)'] = 'v1/admin/faculty/put';
//admin major
$route['v1/admin/major/all'] = 'v1/admin/major/all';
$route['v1/admin/major/add'] = 'v1/admin/major/add';
$route['v1/admin/major/get/(:any)'] = 'v1/admin/major/get';
$route['v1/admin/major/delete/(:any)'] = 'v1/admin/major/delete';
$route['v1/admin/major/put/(:any)'] = 'v1/admin/major/put';
//admin course
$route['v1/admin/course/all'] = 'v1/admin/course/all';
$route['v1/admin/course/add'] = 'v1/admin/course/add';
$route['v1/admin/course/get/(:any)'] = 'v1/admin/course/get';
$route['v1/admin/course/delete/(:any)'] = 'v1/admin/course/delete';
$route['v1/admin/course/put/(:any)'] = 'v1/admin/course/put';
$route['v1/admin/course/class/add'] = 'v1/admin/course/add_class';
//admin teacher
$route['v1/admin/teacher/all'] = 'v1/admin/teacher/all';
$route['v1/admin/teacher/add'] = 'v1/admin/teacher/add';
$route['v1/admin/teacher/get/(:any)'] = 'v1/admin/teacher/get';
$route['v1/admin/teacher/delete/(:any)'] = 'v1/admin/teacher/delete';
$route['v1/admin/teacher/put/(:any)'] = 'v1/admin/teacher/put';
$route['v1/admin/teacher/course/add'] = 'v1/admin/teacher/add_course';
$route['v1/admin/teacher/course/get/(:any)'] = 'v1/admin/teacher/get_course';
$route['v1/admin/teacher/course/delete/(:any)'] = 'v1/admin/teacher/delete_course';
