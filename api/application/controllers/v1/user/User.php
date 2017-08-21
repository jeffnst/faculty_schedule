<?php


defined('BASEPATH') OR exit('No direct script access allowed');

//require_once 'admin/Building.php';

class user extends CI_Controller {

  function __construct() {
    parent::__construct();
    $this->load->model('v1/admin/admin_model');
    $this->load->model('v1/admin/data_model');
    $this->load->helper('rest_response_helper');
  }

  public function get_faculty(){
    $params = new stdClass();
    $params->dest_table_as = 'faculty';
    $params->select_values = array('*');
    $get = $this->data_model->get($params);
    echo json_encode(get_success($get['results']));
  }

  public function schedule_faculty(){
    $f_seq = $this->uri->segment(5);
    // $params = new stdClass();
    // $params->dest_table_as = 'schedule_log';
    // $params->select_values = array('seq','status');
    // $params->where_tables = array(array("where_column" => 'generate_key', "where_value" => $key));
    // $get = $this->data_model->get($params);
    // if($get['results'] != ""){
    //   $status = $get['results'][0]->status ;
    //   if( $status == 'P'){
    //     $dest_table_as = 'schedule_tmp as st';
    //   } else {
    //     $dest_table_as = 'schedule as st';
    //   }
      $dest_table_as = 'schedule as st';
      $select_values = array('st.*','r.name as room_name','d.name as day_name','d.seq as day_seq','h.name as hour_name','c.label as class_label','m.name as major_name','cs.name as course_name','h.start_hour','h.start_min','h.end_hour','h.end_min');
      $join1 = array("join_with" => 'room as r', "join_on" => 'st.room_seq = r.seq', "join_type" => '');
      $join2 = array("join_with" => 'day_hour as dh', "join_on" => 'st.day_hour_seq = dh.seq', "join_type" => '');
      $join3 = array("join_with" => 'day as d', "join_on" => 'dh.day_seq = d.seq', "join_type" => '');
      $join4 = array("join_with" => 'hour as h', "join_on" => 'dh.hour_seq = h.seq', "join_type" => '');
      $join5 = array("join_with" => 'class as c', "join_on" => 'st.class_seq = c.seq', "join_type" => '');
      $join6 = array("join_with" => 'course as cs', "join_on" => 'c.course_seq = cs.seq', "join_type" => '');
      $join7 = array("join_with" => 'major as m', "join_on" => 'cs.major_seq = m.seq', "join_type" => '');
      $join8 = array("join_with" => 'faculty as f', "join_on" => 'm.faculty_seq = f.seq', "join_type" => '');
      $where = array("where_column" => 'f.seq', "where_value" => $f_seq);
      $order1 = array("order_column" => 'c.label',"order_type" => 'ASC');
      $order2 = array("order_column" => 'd.seq',"order_type" => 'ASC');
      $order3 = array("order_column" => 'h.seq',"order_type" => 'ASC');
      $params = new stdClass();
      $params->dest_table_as = $dest_table_as;
      $params->select_values = $select_values;
      $params->join_tables = array($join1,$join2,$join3,$join4,$join5,$join6,$join7,$join8);
      $params->where_tables = array($where);
      $params->order_by = array($order1,$order2,$order3);
      $get = $this->data_model->get($params);
      $data = $get['results'];
      echo json_encode(get_success($data));
    }



}
