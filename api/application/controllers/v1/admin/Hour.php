<?php

include 'Admin.php';

class hour extends admin {

  function __construct() {
    parent::__construct();
    parent::checktoken();
    $this->load->model('v1/admin/data_model');
    $this->load->model('v1/admin/hour_model');
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

  //Custom Function

  //PRIVATE FUNCTION

  private function _all() {
    try {
      $get_all_hour = $this->hour_model->all();
      if ($get_all_hour['response'] == OK_STATUS) {
        $data = get_success($get_all_hour['data']);
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
        $add = $this->hour_model->add($datas);
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

  public function _get_dh_this($hour_seq){
    $params = new stdClass();
    $params->dest_table_as = 'day_hour';
    $params->select_values = array('seq');
    $params->where_tables = array(array("where_column" => 'hour_seq', "where_value" => $hour_seq));
    $get = $this->data_model->get($params);
    return $get['results'];
  }

  private function _delete() {
    try {
      $seq = $this->uri->segment(5);
      if ($seq != "") {
        $day_hour = $this->_get_dh_this($seq);
        foreach($day_hour as $dh){
          $delete_schedule_tmp = parent::mass_delete('schedule_tmp','day_hour_seq',$dh->seq);
          $delete_schedule = parent::mass_delete('schedule','day_hour_seq',$dh->seq);
        }
        $delete_dh = parent::mass_delete('day_hour','hour_seq',$seq);
        $del = $this->hour_model->delete($seq);
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
        $get = $this->hour_model->get($seq);
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
        $put = $this->hour_model->put($datas);
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

}
