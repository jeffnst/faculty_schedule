<?php

include 'Admin.php';

class faculty extends admin {

  function __construct() {
    parent::__construct();
    parent::checktoken();
    $this->load->model('v1/admin/faculty_model');
    $this->load->model('v1/admin/major_model');
    $this->load->model('v1/admin/course_model');
  }

  public function all() {
    echo json_encode($this->_all());
  }

  public function add() {
    echo json_encode($this->_add());
  }

  public function delete() {
    echo json_encode($this->_delete());
  }

  public function get() {
    echo json_encode($this->_get());
  }

  public function put() {
    echo json_encode($this->_put());
  }

  public function get_schedule() {
    echo json_encode($this->_get_schedule());
  }

  public function put_schedule() {
    echo json_encode($this->_put_schedule());
  }

  public function delete_schedule_all() {
    echo json_encode($this->_delete_schedule_all());
  }

  //Custom Function

  private function _get_schedule() {
    $fac_seq = $this->uri->segment(6);
    $get_schedule = $this->faculty_model->get_schedule($fac_seq);
    return $get_schedule;
  }

  private function _put_schedule() {
    try {
      $datas = json_decode(file_get_contents('php://input'));
      if ($datas != "") {
        $params = array('day_hour_seq' => $datas->pick_dh_seq,
        'class_seq' => $datas->pick_class_seq,
        'room_seq' => $datas->pick_room_seq,
        'seq' => $datas->schedule_seq);
        $put = $this->faculty_model->put_schedule($params);
        if ($put['response'] == OK_STATUS) {
          $data = response_success();
        } else {
          $data = response_fail();
        }
      }
    } catch (Exception $e) {
      $data = response_fail();
    }
    return $data;
  }

  private function _delete_schedule_all() {
    try {
      $datas = json_decode(file_get_contents('php://input'));
      if ($datas != "") {
        foreach ($datas as $each) {
          $delete = $this->faculty_model->delete_schedule($each);
        }
        $data = response_success();
      } else {
        $data = response_fail();
      }
    } catch (Exception $e) {
      $data = response_fail();
    }
    return $data;
  }

  private function _get_course_option($faculty_seq) {
    $get_course_option = $this->faculty_model->get_course_option($faculty_seq);
    return $get_course_option['data'];
  }

  private function _get_major_option($faculty_seq, $option) {
    $get_major_option = $this->faculty_model->get_major_option($faculty_seq);
    $courses = [];
    $datas = [];
    foreach ($get_major_option['data'] as $each) {
      $get_course = $this->_get_course_option($each->seq);
      $datas[] = array(
        "seq" => $each->seq,
        "name" => $each->name,
        "description" => $each->description,
        "courses" => $get_course
      );
    }
    return $datas;
  }


  public function _get_building($building_seq){
    $params = new stdClass();
    $params->dest_table_as = 'building';
    $params->select_values = array('name');
    $params->where_tables = array(array("where_column" => 'seq', "where_value" => $building_seq));
    $get = $this->data_model->get($params);
    if($get['results'] !=  NULL){
      return $get['results'][0]->name;
    } else {
      return NULL;
    }
  }

  //PRIVATE FUNCTION

  private function _all() {
    try {
      $get_all_faculty = $this->faculty_model->all();
      $datas = [];
      if ($get_all_faculty['response'] == OK_STATUS) {
        foreach ($get_all_faculty['data'] as $each) {
          $get_major_count = $this->_get_major_option($each->seq, GET_COUNT);
          $get_course_count = $this->_get_course_option($each->seq, GET_COUNT);
          $get_building = $this->_get_building($each->building_seq);
          $datas[] = array(
            "seq" => $each->seq,
            "name" => $each->faculty_name,
            "building_name" => $get_building,
            "description" => $each->faculty_description,
            "major_count" => count($get_major_count),
            "course_count" => count($get_course_count)
          );
        }
        $data = get_success($datas);
      } else {
        $data = response_fail();
      }
    } catch (Exception $e) {
      $data = response_fail();
    }
    return $data;
  }

  private function _add() {
    try {
      $datas = json_decode(file_get_contents('php://input'));
      if ($datas != "") {
        $params = new stdClass();
        $params->name = $datas->name;
        $params->description = $datas->description;
        $params->building_seq = $datas->building_seq;
        $addbuilding = $this->faculty_model->add($params);
        if ($addbuilding['response'] == OK_STATUS) {
          $data = response_success();
        } else {
          $data = response_fail();
        }
      } else {
        $data = response_fail();
      }
    } catch (Exception $e) {
      $data = response_fail();
    }
    return $data;
  }

  public function _get_major_this($fac_seq){
    $params = new stdClass();
    $params->dest_table_as = 'major';
    $params->select_values = array('seq');
    $params->where_tables = array(array("where_column" => 'faculty_seq', "where_value" => $fac_seq));
    $get = $this->data_model->get($params);
    return $get['results'];
  }


  public function _get_course_this($major_seq){
    $params = new stdClass();
    $params->dest_table_as = 'course';
    $params->select_values = array('seq');
    $params->where_tables = array(array("where_column" => 'major_seq', "where_value" => $major_seq));
    $get = $this->data_model->get($params);
    return $get['results'];
  }

  public function _get_class_this($course_seq){
    $params = new stdClass();
    $params->dest_table_as = 'class';
    $params->select_values = array('seq');
    $params->where_tables = array(array("where_column" => 'course_seq', "where_value" => $course_seq));
    $get = $this->data_model->get($params);
    return $get['results'];
  }

  public function _delete_courses($course_seq) {
    try{
      $seq = $course_seq;
      if ($seq != "") {
        $data_class = $this->_get_class_this($seq);
        foreach($data_class as $cl){
          $del_class = $this->_delete_class($cl->seq);
        }
        $delete = $this->course_model->delete($seq);
        if ($delete['response'] == OK_STATUS) {
          $data = response_success();
        } else {
          $data = response_fail();
        }
      } else {
        $data = response_fail();
      }
    } catch (Exception $e) {
      $data = response_fail();
    }
    return $data;
  }

  private function _delete_class($seq_parse = NULL) {
    try {
      if($this->uri->segment(6)){
        $seq = $this->uri->segment(6);
      } else {
        if(isset($seq_parse)){
          $seq = $seq_parse;
        }
      }
      if ($seq != "") {
        $delete_schedule_tmp = parent::mass_delete('schedule_tmp','class_seq',$seq);
        $delete_schedule = parent::mass_delete('schedule','class_seq',$seq);
        $delete_teacher_class = parent::mass_delete('teacher_classes','class_seq',$seq);
        $delete = $this->course_model->delete_class($seq);
        if ($delete['response'] == OK_STATUS) {
          $data = response_success();
        } else {
          $data = response_fail();
        }
      } else {
        $data = response_fail();
      }
    } catch (Exception $e) {
      $data = response_fail();
    }
    return $data;
  }

  private function _delete_major($major_seq) {
    try {
      $seq = $major_seq;
      if ($seq != "") {
        $get_courses = $this->_get_course_this($seq);
        foreach($get_courses as $course){
          $del_course = $this->_delete_courses($course->seq);
        }
        $del = $this->major_model->delete($seq);
        if ($del['response'] == OK_STATUS) {
          $data = response_success();
        } else {
          $data = response_fail();
        }
      } else {
        $data = response_fail();
      }
    } catch (Exception $e) {
      $data = response_fail();
    }
    return $data;
  }

  private function _delete() {
    try {
      $seq = $this->uri->segment(5);
      if ($seq != "") {
        $this->load->library('curl');
        $majors = $this->_get_major_this($seq);
        foreach($majors as $major){
          $delmajor = $this->_delete_major($major->seq);
        }
        $del = $this->faculty_model->delete($seq);
        if ($del['response'] == OK_STATUS) {
          $data = response_success();
        } else {
          $data = response_fail();
        }
      } else {
        $data = response_fail();
      }
    } catch (Exception $e) {
      $data = response_fail();
    }
    return $data;
  }

  private function _get() {
    try {
      $seq = $this->uri->segment(5);
      if ($seq != "") {
        $get = $this->faculty_model->get($seq);
        if ($get['response'] == OK_STATUS) {
          $data = get_success($get['data']);
        } else {
          $data = response_fail();
        }
      } else {
        $data = response_fail();
      }
    } catch (Exception $e) {
      $data = response_fail();
    }
    return $data;
  }

  private function _put() {
    try {

      $datas = json_decode(file_get_contents('php://input'));
      $seq = $this->uri->segment(5);
      if ($datas != "" AND $seq != "") {
        $params = new stdClass();
        $params->name = $datas->name;
        $params->description = $datas->description;
        $params->seq = $seq;
        $params->building_seq = $datas->building_seq;
        $putbuilding = $this->faculty_model->put($params);
        if ($putbuilding['response'] == OK_STATUS) {
          $data = response_success();
        } else {
          $data = response_fail();
        }
      } else {
        $data = response_fail();
      }
    } catch (Exception $e) {
      $data = response_fail();
    }
    return $data;
  }


}
