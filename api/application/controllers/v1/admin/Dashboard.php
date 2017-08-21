<?php

include 'Admin.php';

class dashboard extends admin {

  function __construct() {
    parent::__construct();
    parent::checktoken();
    $this->load->model('v1/admin/data_model');
  }


  public function index(){

    $building = $this->data_model->get_count('building')['results'];
    $room = $this->data_model->get_count('room')['results'];
    $faculty = $this->data_model->get_count('faculty')['results'];
    $major = $this->data_model->get_count('major')['results'];
    $course = $this->data_model->get_count('course')['results'];
    $class = $this->data_model->get_count('class')['results'];
    $teacher = $this->data_model->get_count('teacher')['results'];
    $data = array("building" => $building, "room" => $room , "faculty" => $faculty, "major" => $major, "course" => $course,"class" => $class, "teacher" => $teacher, "time" => date('d-m-Y h:m'));
    echo json_encode(get_success($data));

  }

}
