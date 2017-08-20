<?php

defined('BASEPATH') OR exit('No direct script access allowed');

//require_once 'admin/Building.php';

class admin extends CI_Controller {

  //PUBLIC FUNCTION
  function __construct() {
    parent::__construct();
    $this->load->helper('jwt_helper');
    $this->load->helper('rest_response_helper');
    $this->load->model('v1/admin/admin_model');
    $this->load->model('v1/admin/data_model');
    $this->load->helper(array('form', 'url'));
  }

  //for other function call

  public function checktoken() {
    $check = $this->_checktoken();
    if ($check['response'] != OK_STATUS) {
      echo json_encode($check);
      exit();
    }
  }

  //for direct access

  public function json_checktoken() {
    echo json_encode($this->_checktoken());
  }

  private function _checktoken() {
    $datas = $this->input->get_request_header('data-token');
    try {
      $results = JWT::decode($datas, SERVER_SECRET_KEY, JWT_ALGHORITMA);
      if ($results) {
        $data = response_success();
      } else {
        $data = response_fail();
      }
    } catch (UnexpectedValueException $e) {
      $data = response_fail();
    } catch (DomainException $e) {
      $data = response_fail();
    }

    return $data;
  }

  public function mass_delete($table,$column,$value){
    $delete = $this->admin_model->mass_delete($table,$column,$value);
    return $delete;
  }

}
