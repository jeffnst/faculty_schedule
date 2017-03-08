<?php

include 'Admin.php';

class major extends admin {

    function __construct() {
        parent::__construct();
        parent::checktoken();
        $this->load->model('v1/admin/major_model');
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

    public function get_by_faculty() {
        echo json_encode($this->_get_by_faculty());
    }
    
    public function put() {
        echo json_encode($this->_put());
    }

//Custom Function
    private function _get_faculty_option() {
        $get_faculty = $this->major_model->get_faculty_option();
        return $get_faculty;
    }
    
    private function _get_by_faculty() {
        $fac_seq = $this->uri->segment(5);
        $get_faculty = $this->major_model->get_by_faculty($fac_seq);
        return $get_faculty;
    }

//PRIVATE FUNCTION

    private function _all() {
        try {
            $get_all_major = $this->major_model->all();
            $get_faculty_option = $this->_get_faculty_option();
            if ($get_all_major ['response'] == OK_STATUS) {
                $data = array("majors" => $get_all_major['data'], "faculty_option" => $get_faculty_option['data']);
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
                $params->faculty_seq = $datas->faculty_seq;
                $params->description = $datas->description;
                $addfaculty = $this->major_model->add($params);
                if ($addfaculty['response'] == OK_STATUS) {
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
                $addfaculty = $this->major_model->delete($seq);
                if ($addfaculty['response'] == OK_STATUS) {
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
                $getfaculty = $this->major_model->get($seq);
                if ($getfaculty['response'] == OK_STATUS) {
                    $data = get_success($getfaculty['data']);
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
                $params->faculty_seq = $datas->faculty_seq;
                $params->seq = $seq;
                $putfaculty = $this->major_model->put($params);
                if ($putfaculty['response'] == OK_STATUS) {
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
