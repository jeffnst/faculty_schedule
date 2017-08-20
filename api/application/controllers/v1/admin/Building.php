<?php

include 'Admin.php';

class building extends admin {

  function __construct() {
    parent::__construct();
    parent::checktoken();
    $this->load->model('v1/admin/building_model');
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

  //Custom function

  private function _get_rooms($building_seq, $option) {
    $get_rooms = $this->building_model->get_rooms_count($building_seq, $option);
    return $get_rooms['data'];
  }

  //PRIVATE FUNCTION

  public function _get_faculty($build_seq){
    $params = new stdClass();
    $params->dest_table_as = 'faculty';
    $params->select_values = array('*');
    $params->where_tables = array(array("where_column" => 'building_seq', "where_value" => $build_seq));
    $get = $this->data_model->get($params);
    return $get['results'];
  }

  public function _get_room($build_seq){
    $params = new stdClass();
    $params->dest_table_as = 'room';
    $params->select_values = array('*');
    $params->where_tables = array(array("where_column" => 'building_seq', "where_value" => $build_seq));
    $get = $this->data_model->get($params);
    return $get['results'];
  }

  private function _all() {
    try {
      $get_all_building = $this->building_model->all();
      if ($get_all_building['response'] == OK_STATUS) {
        foreach ($get_all_building['data'] as $each) {
          $get_rooms_count = $this->_get_rooms($each->seq, GET_COUNT);
          $get_faculty_count = $this->_get_faculty($each->seq);
          $datas[] = array(
            "seq" => $each->seq,
            "name" => $each->name,
            "description" => $each->description,
            "rooms_count" => $get_rooms_count,
            "faculty_count" => count($get_faculty_count),
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
        $addbuilding = $this->building_model->add($params);
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

  private function _delete_room($seq) {
    try {
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

  private function _delete() {
    try {
      $seq = $this->uri->segment(5);
      if ($seq != "") {
        $get_rooms = $this->_get_room($seq);
        foreach($get_rooms as $room){
          $delroom = $this->_delete_room($room->seq);
        }
        $get_faculty = $this->_get_faculty($seq);
        foreach($get_faculty as $fac){
          $params_update = new stdClass();
          $params_update->new_data = array("building_seq" => NULL);
          $params_update->table_update = 'faculty';
          $where = array("where_column" => 'seq', "where_value" => $fac->seq);
          $params_update->where_tables = array($where);
          $update = $this->data_model->update($params_update);
          // print_r($update);
        }

        $del = $this->building_model->delete($seq);      
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
        $getbuilding = $this->building_model->get($seq);
        $getroomsdetail = $this->_get_rooms($seq, GET_DETAIL);
        $getfaculty = $this->_get_faculty($seq);
        $rooms = $getroomsdetail;
        if ($getbuilding['response'] == OK_STATUS) {
          $datas = array(
            "seq" => $getbuilding['data']->seq,
            "name" => $getbuilding['data']->name,
            "description" => $getbuilding['data']->description,
            "faculty" => $getfaculty,
            "rooms" => $rooms
          );
          $data = get_success($datas);
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
        $putbuilding = $this->building_model->put($params);
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
