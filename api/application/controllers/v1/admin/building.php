<?php

include 'Admin.php';

class building extends admin {

    function __construct() {
        parent::__construct();
        parent::checktoken();
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

    private function _all() {
        try {
            $get_all_building = $this->building_model->all();
            if ($get_all_building['response'] == OK_STATUS) {
                foreach ($get_all_building['data'] as $each) {
                    $get_rooms_count = $this->_get_rooms($each->seq, GET_COUNT);
                    $datas[] = array(
                        "seq" => $each->seq,
                        "name" => $each->name,
                        "description" => $each->description,
                        "rooms_count" => $get_rooms_count
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

    private function _delete() {
        try {
            $seq = $this->uri->segment(5);
            if ($seq != "") {
                $addbuilding = $this->building_model->delete($seq);
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
                $getbuilding = $this->building_model->get($seq);
                $getroomsdetail = $this->_get_rooms($seq, GET_DETAIL);
                $rooms = $getroomsdetail;
                if ($getbuilding['response'] == OK_STATUS) {
                    $datas = array(
                        "seq" => $getbuilding['data']->seq,
                        "name" => $getbuilding['data']->name,
                        "description" => $getbuilding['data']->description,
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
