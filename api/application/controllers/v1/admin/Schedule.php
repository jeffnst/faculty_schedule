<?php

include 'Admin.php';

class schedule extends admin {

    function __construct() {
        parent::__construct();
        parent::checktoken();
        $this->load->model('v1/admin/schedule_model');
    }

    public function get_course() {
        echo json_encode($this->_get());
    }

    public function get_course_generate() {
        echo json_encode($this->_get_course_generate());
    }

    public function get_course_generate_new() {
        echo json_encode($this->_get_course_generate_new());
    }

    public function check_room() {
        echo json_encode($this->_check_room());
    }

    public function add_room() {
        echo json_encode($this->_add_room());
    }

//Custom Function   
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

    private function _delete() {
        try {
            $seq = $this->uri->segment(5);
            if ($seq != "") {
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
            $course_seq = $this->uri->segment(5);
            if ($course_seq != "") {
                $days = $this->schedule_model->get_days();
                $building = $this->schedule_model->get_building($course_seq);
                $building_seq = $building['data']->building_seq;
                $get_rooms = $this->schedule_model->get_room($building_seq);
                $rooms = $get_rooms['data'];
                if ($days['response'] == OK_STATUS) {
                    foreach ($days['data'] as $day) {
                        $day_hour = $this->schedule_model->get_day_hour($day->seq, $rooms);
                        $day_hours_data[] = array("day_seq" => $day->seq, "day_name" => $day->name, "hour" => $day_hour['data']);
                    }
                    $res = new stdClass();
                    $res->day_hours = $day_hours_data;
                    $res->rooms = $rooms;
                    $data = get_success($res);
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

    private function _get_course_generate() {
        try {
            $course_seq = $this->uri->segment(5);
            if ($course_seq != "") {
                $days = $this->schedule_model->get_days();
                $building = $this->schedule_model->get_building($course_seq);
                $building_seq = $building['data']->building_seq;
                $get_rooms = $this->schedule_model->get_room($building_seq);
                $get_class = $this->schedule_model->get_class($course_seq);
                $get_all_day_hour = $this->schedule_model->get_day_hour_all();
                $rooms = $get_rooms['data'];
//                print_r($rooms);exit();
                if ($get_class['response'] == OK_STATUS) {
                    foreach ($get_class['data'] as $class) {
                        //cek ketersediaan waktu & ruang
                        foreach ($get_all_day_hour['data'] as $dh) {
                            foreach ($rooms as $room) {
                                $check = $this->schedule_model->check_room_availability($dh->day_hour_seq, $room->seq);
                                $check_data = array('room_name' => $room->name, 'availability' => $check['data']);
                            }
                            $day_data[] = array('day_name' => $dh->day_name, 'hour_name' => $dh->hour_name, 'room_availability' => $check_data);
                        }
                        $class_data[] = array('class_seq' => $class->seq, 'label' => $class->label, 'schedule_availability' => $day_data);
                    }
                    $data = get_success($class_data);
                } else {
                    $data = response_fail();
                }
//                if ($days['response'] == OK_STATUS) {
//                    foreach ($days['data'] as $day) {
//                        $day_hour = $this->schedule_model->get_day_hour($day->seq, $rooms);
//                        $day_hours_data[] = array("day_seq" => $day->seq, "day_name" => $day->name, "hour" => $day_hour['data'], "rooms" => $rooms);
//                    }
//                    $res = new stdClass();
//                    $res->class = $get_class['data'];
//                    $res->day_hours = $day_hours_data;
//                    $res->rooms = $rooms;
//                    $data = get_success($res);
//                } else {
//                    $data = response_fail();
//                }
            } else {
                $data = response_fail();
            }
        } catch (Exception $e) {
            $data = response_fail();
        }
        return $data;
    }

    private function _get_course_generate_new() {
        try {
            $course_seq = $this->uri->segment(5);
            if ($course_seq != "") {
                $building = $this->schedule_model->get_building($course_seq);
                $building_seq = $building['data']->building_seq;
                $get_rooms = $this->schedule_model->get_room($building_seq);
                $rooms = $get_rooms['data'];
                $check_free_day_hour = $this->schedule_model->check_room_schedule();
                foreach ($rooms as $room) {
                    unset($check_schedule_data);
                    foreach ($check_free_day_hour['data'] as $each) {
                        $check_schedule = $this->schedule_model->check_room_dh_schedule($each->seq, $room->seq);
                        if ($check_schedule['data'] == 'YES') {
                            $check_schedule_data[] = array('dh_seq' => $each->seq, 'room_seq' => $room->seq, 'availability' => $check_schedule['data']);
                        }
                    }
                    $free_schedule[] = array('room_seq' => $room->seq, 'room_name' => $room->name, 'room_free_schedule' => $check_schedule_data);
                }
                $ready = [];
                foreach ($free_schedule as $each) {
                    foreach ($each['room_free_schedule'] as $free) {
                        $array = array('dh_seq' => $free['dh_seq'], 'room_seq' => $free['room_seq']);
                        array_push($ready, $array);
                    }
                }
                $free = array("free_schedule" => $ready);
                $get_course = $this->schedule_model->get_course($course_seq);
                $course_sks = $get_course['data']->sks;
                $get_class = $this->schedule_model->get_class($course_seq);
                $count_pick_schedule_total = $course_sks * count($get_class['data']);
                $slice = array_slice($free['free_schedule'], 0, $count_pick_schedule_total);
                foreach ($get_class['data'] as $class) {
                    $pick_free_schedule = array_slice($slice, 0, $course_sks);
                    foreach ($pick_free_schedule as $each) {
                        $new_class_schedule[] = array('dh_seq' => $each['dh_seq'], 'room_seq' => $each['room_seq'], 'class_seq' => $class->seq);
                    }
                    $slice = array_slice($slice, $course_sks);
                }
                $ready_schedule = array("course_generate_schedule" => $new_class_schedule);
                $data = get_success($ready_schedule);
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

//    private function _check_rooms() {
//        try {
//            $datas = json_decode(file_get_contents('php://input'));
//            $day_hour_seq = $datas->pick_dh_seq;
//            $rooms_data = $datas->rooms;
//            if ($day_hour_seq != "" AND $rooms_data) {
//                foreach ($rooms_data as $each) {
//                    $check_room_availability = $this->schedule_model->check_room_availability($day_hour_seq, $each->seq);
//                    $check_result = $check_room_availability['data'];
//                    $result[] = array("room_seq" => $each->seq, "room_name" => $each->name, "room_availability" => $check_result);
//                }
//                $results = $result;
//                $data = get_success($results);
//            } else {
//                $data = response_fail();
//            }
//        } catch (Exception $e) {
//            $data = response_fail();
//        }
//        return $data;
//    }

    private function _add_room() {
        try {
            $datas = json_decode(file_get_contents('php://input'));
            $class_seq = $datas->class_seq;
            if ($datas != "") {
                foreach ($datas->room_data as $data) {
                    if ($data->availability == 'YES') {
                        $add_room = $this->schedule_model->add_room($class_seq, $data);
                    }
                }
                $data = response_success();
            } else {
                $data = response_fail();
            }
        } catch (Exception $e) {
            $data = response_fail();
        }
        return $data;
    }

    private function _check_room() {
        try {
            $datas = json_decode(file_get_contents('php://input'));
            $day_hour_seq = $datas->pick_dh_seq;
            $room_seq = $datas->pick_room_seq;
            $check_room_availability = $this->schedule_model->check_room_availability($day_hour_seq, $room_seq);
            $check_result = $check_room_availability['data'];
            $result = array("room_seq" => $room_seq, "room_availability" => $check_result);
            $data = get_success($result);
        } catch (Exception $e) {
            $data = response_fail();
        }
        return $data;
    }

}
