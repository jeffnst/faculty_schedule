<?php

include 'admin.php';

class course extends admin {

    function __construct() {
        parent::__construct();
        parent::checktoken();
        $this->load->model('v1/admin/course_model');
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

    public function add_class() {
        echo json_encode($this->_add_class());
    }

//Custom Function
    private function _get_major_option() {
        $get_major = $this->course_model->get_major_option();
        return $get_major;
    }

    private function _get_teacher_option($teacher_seq) {
        $get_major = $this->course_model->get_teacher_option($teacher_seq);
        return $get_major;
    }

//PRIVATE FUNCTION

    private function _all() {
        try {
            $get_all_course = $this->course_model->all();
            $get_major_option = $this->_get_major_option();
            if ($get_all_course ['response'] == OK_STATUS) {
                foreach ($get_all_course["data"] as $each) {
                    $get_teacher = $this->_get_teacher_option($each->seq);
                    $count_teacher = count($get_teacher['data']);
                    $record[] = array(
                        "seq" => $each->seq,
                        "name" => $each->name,
                        "description" => $each->description,
                        "major_seq" => $each->major_seq,
                        "major_name" => $each->major_name,
                        "faculty_name" => $each->faculty_name,
                        "sks" => $each->sks,
                        "teacher_count" => $count_teacher
                    );
                }
                $record = array("courses" => $record, "major_option" => $get_major_option['data']);
                $data = get_success($record);
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
                $params->major_seq = $datas->major_seq;
                $params->description = $datas->description;
                $params->sks = $datas->sks;
                $add = $this->course_model->add($params);
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
                $addmajor = $this->course_model->delete($seq);
                if ($addmajor['response'] == OK_STATUS) {
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
                $get = $this->course_model->get($seq);
                $class = $this->course_model->get_classes($seq);
                if ($get['response'] == OK_STATUS) {
                    if ($get['data'] == NULL) {
                        $data = get_not_found();
                    } else {
                        $record = array("course_data" => $get['data'], "course_classes" => $class['data']);
                        $data = get_success($record);
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
                $params->name = $datas->name;
                $params->description = $datas->description;
                $params->major_seq = $datas->major_seq;
                $params->sks = $datas->sks;
                $params->seq = $seq;
                $putmajor = $this->course_model->put($params);
                if ($putmajor['response'] == OK_STATUS) {
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

    private function _add_class() {
        try {
            $datas = json_decode(file_get_contents('php://input'));
            if ($datas != "") {
                $params = new stdClass();
                $params->classes = $datas->classes;
                $params->course_seq = $datas->course_seq;
                foreach ($params->classes as $each) {
                    $add = $this->course_model->add_class($each, $params->course_seq);
                    if ($add['response'] == OK_STATUS) {
                        $success[] = TRUE;
                    }
                }
                if ($success == TRUE) {
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
