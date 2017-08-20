<?php

include 'Admin.php';

class room extends admin {

  function __construct() {
    parent::__construct();
    parent::checktoken();
    $this->load->model('v1/admin/room_model');
    $this->load->model('v1/admin/data_model');
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
    echo json_encode($this->_get_room_by_course());
  }

  //Custom Function
  private function _get_building_option() {
    $get_building = $this->room_model->get_building_option();
    return $get_building;
  }

  private function _get_room_by_course(){
    try {
      $course_seq = $this->uri->segment(5);
      if ($course_seq != "") {
        $get_rooms = $this->room_model->get_by_course($course_seq);
        if ($get_rooms['response'] == OK_STATUS) {
          $data = get_success($get_rooms['data']);
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

  //PRIVATE FUNCTION

  private function _all() {
    try {
      $get_all_room = $this->room_model->all();
      $get_building_option = $this->_get_building_option();
      if ($get_all_room ['response'] == OK_STATUS) {
        $data = array("rooms" => $get_all_room['data'], "building_option" => $get_building_option['data']);
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
        $params->name = $datas->name;
        $params->building_seq = $datas->building_seq;
        $params->description = $datas->description;
        $addbuilding = $this->room_model->add($params);
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


  private function _delete() {
    try {
      $seq = $this->uri->segment(5);
      if ($seq != "") {
        $delete_schedule_tmp = parent::mass_delete('schedule_tmp','room_seq',$seq);
        $delete_schedule = parent::mass_delete('schedule','room_seq',$seq);        
        $del = $this->room_model->delete($seq);
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
        $getbuilding = $this->room_model->get($seq);
        if ($getbuilding['response'] == OK_STATUS) {
          $data = get_success($getbuilding['data']);
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
        $params->building_seq = $datas->building_seq;
        $params->seq = $seq;
        $putbuilding = $this->room_model->put($params);
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
