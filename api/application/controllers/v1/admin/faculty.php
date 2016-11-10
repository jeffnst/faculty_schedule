<?php

include 'admin.php';

class faculty extends admin {

    function __construct() {
        parent::__construct();
        parent::checktoken();
        $this->load->model('v1/admin/faculty_model');
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
    private function _get_course_option($faculty_seq) {
        $get_course_option = $this->faculty_model->get_course_option($faculty_seq);
        return $get_course_option['data'];
    }

    private function _get_major_option($faculty_seq, $option) {
        $get_major_option = $this->faculty_model->get_major_option($faculty_seq);
        $courses = [];
        $datas = [];
        foreach ($get_major_option['data'] as $each) {
            $get_course = $this->_get_course_option($each->seq);
            $datas[] = array(
                "seq" => $each->seq,
                "name" => $each->name,
                "description" => $each->description,
                "courses" => $get_course
            );
        }
        return $datas;
    }

//PRIVATE FUNCTION

    private function _all() {
        try {
            $get_all_faculty = $this->faculty_model->all();
            if ($get_all_faculty['response'] == OK_STATUS) {
                foreach ($get_all_faculty['data'] as $each) {
                    $get_major_count = $this->_get_major_option($each->seq, GET_COUNT);                                       
                    $get_course_count = $this->_get_course_option($each->seq, GET_COUNT);
                    $datas[] = array(
                        "seq" => $each->seq,
                        "name" => $each->name,
                        "description" => $each->description,
                        "major_count" => count($get_major_count),
                        "course_count" => count($get_course_count)
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
                $addbuilding = $this->faculty_model->add($params);
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
                $addbuilding = $this->faculty_model->delete($seq);
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

    private function _get() {
        try {
            $seq = $this->uri->segment(5);
            if ($seq != "") {
                $get = $this->faculty_model->get($seq);
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
                $params->description = $datas->description;
                $params->seq = $seq;
                $putbuilding = $this->faculty_model->put($params);
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
