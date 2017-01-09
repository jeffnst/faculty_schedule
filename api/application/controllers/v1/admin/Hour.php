<?php

include 'Admin.php';

class hour extends admin {

    function __construct() {
        parent::__construct();
        parent::checktoken();
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
//                $params = new stdClass();
//                $params->name = $datas->name;                
//                $params->start = $datas->start;                
//                $params->end = $datas->end;                
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

    private function _delete() {
        try {
            $seq = $this->uri->segment(5);
            if ($seq != "") {
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
                $params = new stdClass();
                $params->name = $datas->name;                
                $params->seq = $seq;
                $put = $this->hour_model->put($params);
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
