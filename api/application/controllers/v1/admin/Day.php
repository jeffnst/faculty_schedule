<?php

include 'Admin.php';

class day extends admin {

  function __construct() {
    parent::__construct();
    parent::checktoken();
    $this->load->model('v1/admin/data_model');
    $this->load->model('v1/admin/day_model');
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
  public function get_hour() {
    echo json_encode($this->_get_hour());
  }

  public function add_hour() {
    echo json_encode($this->_add_hour());
  }
  public function delete_hour() {
    echo json_encode($this->_delete_hour());
  }

  private function _get_hour() {
    $seq = $this->uri->segment(6);
    try {
      if ($seq != "") {
        $get = $this->day_model->get_hour($seq);
        $data = get_success($get['data']);
      } else {
        $data = response_fail();
      }
    } catch (Exception $e) {
      $data = response_fail();
    }

    return $data;
  }

  private function _add_hour() {
    try {
      $datas = json_decode(file_get_contents('php://input'));
      if ($datas != "") {
        $add = $this->day_model->add_hours($datas);
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


  private function _delete_hour() {
    try {
      $seq = $this->uri->segment(6);
      if ($seq != "") {
        $del = $this->day_model->delete_hour($seq);
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

  //PRIVATE FUNCTION

  private function _all() {
    try {
      $get_all_day = $this->day_model->all();
      if ($get_all_day['response'] == OK_STATUS) {
        $data = get_success($get_all_day['data']);
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
        $addbuilding = $this->day_model->add($params);
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

  public function _get_dh_this($day_seq){
    $params = new stdClass();
    $params->dest_table_as = 'day_hour';
    $params->select_values = array('seq');
    $params->where_tables = array(array("where_column" => 'day_seq', "where_value" => $day_seq));
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
        $delete_dh = parent::mass_delete('day_hour','day_seq',$seq);
        $del = $this->day_model->delete($seq);
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
        $get = $this->day_model->get($seq);
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
        $params->seq = $seq;
        $put = $this->day_model->put($params);
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
