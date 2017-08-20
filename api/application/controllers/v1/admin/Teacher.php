<?php

include 'Admin.php';

class teacher extends admin {

  function __construct() {
    parent::__construct();
    parent::checktoken();
    $this->load->model('v1/admin/teacher_model');
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

  public function get_course() {
    echo json_encode($this->_get_course());
  }

  public function add_course() {
    echo json_encode($this->_add_course());
  }

  public function delete_course() {
    echo json_encode($this->_delete_course());
  }

  //Custom Function
  private function _get_major_option() {
    $get_major = $this->teacher_model->get_major_option();
    return $get_major;
  }

  //PRIVATE FUNCTION

  private function _all() {
    try {
      $get_all_teacher = $this->teacher_model->all();
      $get_major_option = $this->_get_major_option();
      if ($get_all_teacher ['response'] == OK_STATUS) {
        $data = array("teachers" => $get_all_teacher['data'], "major_option" => $get_major_option['data']);
        $data = get_success($data);
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
        $params->nidn = $datas->nidn;
        $params->name = $datas->name;
        $params->contact = $datas->contact;
        $params->address = $datas->address;
        $params->education_degree = $datas->education_degree;
        $add = $this->teacher_model->add($params);
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

  private function _delete() {
    try {
      $seq = $this->uri->segment(5);
      if ($seq != "") {
        // $params = new stdClass();
        // $params->dest_table_as = 'teacher_classes as tc';
        // $params->select_values = array('tc.class_seq as class_seq');
        // $params->where_tables = array(array("where_column" => 'tc.teacher_seq', "where_value" => $seq));
        // $get = $this->data_model->get($params);
        //
        // if($get['results'] != ""){
        //   foreach($get['results'] as $each){
        //   $delete_schedule_tmp = parent::mass_delete('schedule_tmp','class_seq',$each->class_seq);
        //   $delete_schedule = parent::mass_delete('schedule','class_seq',$each->class_seq);
        //   }
        // }

        $delete_teacher_class = parent::mass_delete('teacher_classes','teacher_seq',$seq);
        $delete_teacher = parent::mass_delete('teacher','seq',$seq);
        // $addmajor = $this->teacher_model->delete($seq);
        if ($delete_teacher_class['response'] == OK_STATUS) {
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
        $get = $this->teacher_model->get($seq);
        if ($get['response'] == OK_STATUS) {
          if ($get['data'] == NULL) {
            $data = get_not_found();
          } else {
            $data = get_success($get['data']);
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
        $params->nidn = $datas->nidn;
        $params->name = $datas->name;
        $params->contact = $datas->contact;
        $params->address = $datas->address;
        $params->education_degree = $datas->education_degree;
        $params->seq = $seq;
        $put = $this->teacher_model->put($params);
        if ($put['response'] == OK_STATUS) {
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

  private function _get_course() {

    try {
      $seq = $this->uri->segment(6);
      if ($seq != "") {
        $get = $this->teacher_model->get_course($seq);
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

  private function _add_course() {
    try {
      $datas = json_decode(file_get_contents('php://input'));
      if ($datas != "") {
        $pick_class_seq = $datas->seq;
        $teacher_seq = $datas->teacher_seq;
        if (empty($pick_class_seq)) {
          $data = post_empty();
        } else {
          foreach ($pick_class_seq as $each) {
            $params = new stdClass();
            $params->teacher_seq = $teacher_seq;
            $params->class_seq = $each;
            $check = $this->teacher_model->check_add_course($params);
            if ($check['response'] == OK_STATUS) {
              $add[] = $this->teacher_model->add_course($params);
            }
          }
          if ($add == TRUE) {
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

  private function _delete_course() {
    try {
      $seq = $this->uri->segment(6);
      if ($seq != "") {
        $get = $this->teacher_model->delete_course($seq);
        if ($get['response'] == OK_STATUS) {
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
