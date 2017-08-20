<?php

include 'Admin.php';

class course extends admin {

  function __construct() {
    parent::__construct();
    parent::checktoken();
    $this->load->model('v1/admin/course_model');
    $this->load->model('v1/admin/schedule_model');
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

  public function get_class() {
    echo json_encode($this->_get_class());
  }

  public function delete_schedule() {
    echo json_encode($this->_delete_schedule());
  }

  public function get_schedule() {
    echo json_encode($this->_get_schedule());
  }

  public function put_schedule() {
    echo json_encode($this->_put_schedule());
  }

  public function add_class() {
    echo json_encode($this->_add_class());
  }

  public function get_teacher() {
    echo json_encode($this->_get_teacher());
  }

  public function add_teacher_class() {
    echo json_encode($this->_add_teacher_class());
  }

  public function delete_class() {
    echo json_encode($this->_delete_class());
  }

  public function get_by_major() {
    echo json_encode($this->_get_by_major());
  }

  //Custom Function
  private function _get_major_option() {
    $get_major = $this->course_model->get_major_option();
    return $get_major;
  }

  public function _get_class_this($course_seq){
    $params = new stdClass();
    $params->dest_table_as = 'class';
    $params->select_values = array('seq');
    $params->where_tables = array(array("where_column" => 'course_seq', "where_value" => $course_seq));
    $get = $this->data_model->get($params);
    return $get['results'];
  }

  private function _get_by_major() {
    $major_seq = $this->uri->segment(5);
    $get = $this->course_model->get_by_major($major_seq);
    foreach ($get['data'] as $each) {
      $class = $this->_get_class_this($each->seq);
      $count_class = count($class);
      $array[] = array('course_seq' => $each->seq,'course_name' => $each->name, 'course_sks' => $each->sks, 'course_class_total' => $count_class);
    }
    $data = get_success($array);
    return $data;
  }

  private function _get_schedule() {
    $get_day = $this->schedule_model->get_days();
    $course_seq = $this->uri->segment(6);
    $building = $this->schedule_model->get_building_by_course($course_seq);
    $building_seq = $building['data']->building_seq;
    $get_rooms = $this->schedule_model->get_room_by_building($building_seq);
    $rooms = $get_rooms['data'];
    $course_schedule = $this->schedule_model->check_schedule('', $course_seq);
    $results = $course_schedule;
    return $results;
  }

  private function _delete_schedule() {
    $schedule_seq = $seq = $this->uri->segment(6);
    $delete = $this->schedule_model->delete('seq', $schedule_seq);

    if ($delete['response'] == OK_STATUS) {
      $data = response_success();
    } else {
      $data = response_fail();
    }
    return $data;
  }

  private function _put_schedule() {
    try {
      $datas = json_decode(file_get_contents('php://input'));
      if ($datas != "") {
        $params = array('day_hour_seq' => $datas->pick_dh_seq,
        'class_seq' => $datas->pick_class_seq,
        'room_seq' => $datas->pick_room_seq,
        'seq' => $datas->schedule_seq);
        $put = $this->course_model->put_schedule($params);
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


  private function _get_class_option($course_seq) {
    $params = new stdClass();
    $params->dest_table_as = 'class as c';
    $params->select_values = array('c.seq');
    $params->where_tables = array(array("where_column" => 'c.course_seq', "where_value" => $course_seq));
    $get = $this->data_model->get($params);
    return $get['results'];
  }



  //PRIVATE FUNCTION

  private function _all() {
    try {
      $get_all_course = $this->course_model->all();
      $get_major_option = $this->_get_major_option();
      if ($get_all_course ['response'] == OK_STATUS) {
        foreach ($get_all_course["data"] as $each) {
          $get_class = $this->_get_class_option($each->seq);
          $count_class = count($get_class);
          $record[] = array(
            "seq" => $each->seq,
            "name" => $each->name,
            "semester" => $each->semester,
            "description" => $each->description,
            "major_seq" => $each->major_seq,
            "major_name" => $each->major_name,
            "faculty_name" => $each->faculty_name,
            "sks" => $each->sks,
            "class_count" => $count_class
          );
        }
        $record = array("courses" => $record, "major_option" => $get_major_option['data']);
        $data = get_success($record);
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
        $params->major_seq = $datas->major_seq;
        $params->description = $datas->description;
        $params->sks = $datas->sks;
        $params->smt = $datas->smt;
        $add = $this->course_model->add($params);
        if ($add['response'] == OK_STATUS) {
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

  public function _delete($seq_parse = null) {
    try {
      if($this->uri->segment(5)){
        $seq = $this->uri->segment(5);
      } else {
        if(isset($seq_parse)){
          $seq = $seq_parse;
        }
      }
      $seq = $this->uri->segment(5);
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

  private function _get() {
    try {
      $seq = $this->uri->segment(5);
      if ($seq != "") {
        $get = $this->course_model->get($seq);
        $class = $this->course_model->get_classes($seq);
        if ($get['response'] == OK_STATUS) {
          if ($get['data'] == NULL) {
            $data = get_not_found();
          } else {
            foreach ($class['data'] as $each) {
              $teacher = $this->course_model->get_teacher_class($each->class_seq);
              $class_teacher[] = array(
                "class_label" => $each->class_label,
                "class_seq" => $each->class_seq,
                "class_student_total" => $each->class_student_total,
                "class_teacher" => $teacher['data']
              );
            }

            if (empty($class_teacher)) {
              $class_teacher = "";
            }
            $record = array("course_data" => $get['data'], "course_classes" => $class_teacher);
            $data = get_success($record);
          }
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
        $params->major_seq = $datas->major_seq;
        $params->sks = $datas->sks;
        $params->smt = $datas->smt;
        $params->seq = $seq;
        $putmajor = $this->course_model->put($params);
        if ($putmajor['response'] == OK_STATUS) {
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

  private function _add_class() {
    try {
      $datas = json_decode(file_get_contents('php://input'));
      if ($datas != "") {
        $params = new stdClass();
        $params->classes = $datas->classes;
        $params->course_seq = $datas->course_seq;
        foreach ($params->classes as $each) {
          $check = $this->course_model->check_class($each, $params->course_seq);
          if ($check['response'] == OK_STATUS) {
            $add = $this->course_model->add_class($each, $params->course_seq);
            if ($add['response'] == OK_STATUS) {
              $success[] = TRUE;
            } else {
              $success[] = FALSE;
            }
          } else {
            $success == FALSE;
          }
        }
        if ($success == TRUE) {
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

  private function _get_teacher() {
    try {
      $course_seq = $this->uri->segment(6);
      if ($course_seq != "") {
        $get = $this->_get_teacher_option($course_seq, GET_DETAIL);
        $data = get_success($get['data']);
      } else {
        $data = response_fail();
      }
    } catch (Exception $e) {
      $data = response_fail();
    }
    return $data;
  }

  private function _get_class() {
    try {
      $course_seq = $this->uri->segment(6);
      if ($course_seq != "") {
        $get = $this->course_model->get_class($course_seq);
        $data = get_success($get['data']);
      } else {
        $data = response_fail();
      }
    } catch (Exception $e) {
      $data = response_fail();
    }
    return $data;
  }

  private function _add_teacher_class() {
    try {
      $datas = json_decode(file_get_contents('php://input'));
      if ($datas != "") {
        $params = new stdClass();
        $params->teacher_seq = $datas->teacher_seq;
        $params->course_seq = $datas->course_seq;
        $params->class_seq = $datas->class_seq;
        $check = $this->course_model->check_class_teacher($params);
        //                print_r($check);exit();
        if ($check['response'] == FAIL_STATUS) {
          if ($check['data'] == '0') {
            $update = $this->course_model->update_class_teacher($params);
            if ($update['response'] == OK_STATUS) {
              $data = response_success();
            } else {
              $data = response_fail();
            }
          }
        } else {
          $add = $this->course_model->add_class_teacher($params);
          if ($add['response'] == OK_STATUS) {
            $data = response_success();
          } else {
            $data = response_fail();
          }
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

}
