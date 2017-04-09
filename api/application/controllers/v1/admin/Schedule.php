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

    public function get_major_generate() {
        echo json_encode($this->_get_major_generate());
    }

    public function add_major_generate() {
        echo json_encode($this->_add_major_generate());
    }

    //stable version
    public function get_course_generate_new() {
        echo json_encode($this->_get_course_generate_new());
    }

    public function check_room() {
        echo json_encode($this->_check_room());
    }

    public function add_room() {
        echo json_encode($this->_add_room());
    }

    public function add_manual() {
        echo json_encode($this->_add_manual());
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

    private function _get_major_generate() {
        $this->load->helper('key_helper');
        try {
            $major_seq = $this->uri->segment(6);
            $generate_key = generate_key();
            if ($major_seq != "") {
                $courses = $this->schedule_model->get_courses_by_major($major_seq);
                foreach ($courses['data'] as $each) {
                    $class = $this->schedule_model->get_class($each->seq);
                    $total_class = count($class['data']);
                    $generate = $this->_get_course_generate_by_major($each->seq, $major_seq, $generate_key);
                    $array[] = array('course_name' => $each->name, 'course_sks' => $each->sks, 'class_total' => $total_class, 'course_class' => $generate);
                }
//                print_r($result);exit();
                $result = array("generate_key" => $generate_key, "major_courses" => $array,);
                $data = get_success($result);
            } else {
                $data = response_fail();
            }
        } catch (Exception $e) {
            $data = response_fail();
        }
        return $data;
    }

    private function _get_course_generate_by_major($course_seq, $major_seq, $generate_key) {
        try {
            if ($course_seq != "") {
                //AMBIL SEQ DARI BUILDING
                $building = $this->schedule_model->get_building_by_course($course_seq);
                $building_seq = $building['data']->building_seq;
                //AMBIL SEQ DARI TIAP RUANGAN BERDASARKAN SEQ BUILDING
                $get_rooms = $this->schedule_model->get_room_by_building($building_seq);
                $rooms = $get_rooms['data'];
                //AMBIL SEMUA DAY_HOUR_SLOT
                $check_free_day_hour = $this->schedule_model->check_dh_schedule();
                foreach ($rooms as $room) {
                    if (isset($check_schedule_data)) {
                        // JIKA ADA ARAY $check_schedule_data maka kosongkan untuk diisi yang baru
                        unset($check_schedule_data);
                    }
                    foreach ($check_free_day_hour['data'] as $each) {
                        $check_schedule = $this->schedule_model->check_room_dh_schedule($each->dh_seq, $room->seq);
                        if ($check_schedule['data'] == 'YES') {
                            $check_schedule_tmp = $this->schedule_model->check_room_dh_schedule_tmp($each->dh_seq, $room->seq);
                            if ($check_schedule_tmp['data'] == 'YES') {
                                $check_schedule_data[] = array(
                                    'dh_seq' => $each->dh_seq,
                                    'room_seq' => $room->seq,
                                    'day' => $each->day_name,
                                    'hour' => $each->hour_name,
                                    'duration' => $each->start_hour . ':' . $each->start_min . '-' . $each->end_hour . ':' . $each->end_min,
                                    'availability' => $check_schedule['data']);
                            }
                        }
                    }
                    if (isset($check_schedule_data)) {
                        $free_schedule[] = array('room_seq' => $room->seq, 'room_name' => $room->name, 'room_free_schedule' => $check_schedule_data);
                    }
                }
                $ready = [];
                foreach ($free_schedule as $each) {
                    foreach ($each['room_free_schedule'] as $free) {
                        $array = array('dh_seq' => $free['dh_seq'],
                            'room_seq' => $free['room_seq'],
                            'room_name' => $each['room_name'],
                            'day' => $free['day'],
                            'hour' => $free['hour'],
                            'duration' => $free['duration'],
                        );
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
                    unset($new_class_schedule);
                    foreach ($pick_free_schedule as $each) {
                        $new_class_schedule[] = array(
                            'dh_seq' => $each['dh_seq'],
                            'room_seq' => $each['room_seq'],
                            'room_name' => $each['room_name'],
                            'day' => $each['day'],
                            'hour' => $each['hour'],
                            'duration' => $each['duration'],
                            'class_seq' => $class->seq,
                            'class_sks' => $course_sks,
                            'class_teacher' => $class->teacher_name);
                    }
                    $slice = array_slice($slice, $course_sks);
                    $schedule_class[] = array("class_label" => $class->label, "class_schedule" => $new_class_schedule);
                }
                if (isset($schedule_class)) {
                    foreach ($schedule_class as $each) {
                        foreach ($each['class_schedule'] as $params)
                            $insert = $this->schedule_model->add_schedule_tmp($params['dh_seq'], $params['room_seq'], $params['class_seq'], $major_seq, $generate_key);
                    }
                    $ready_schedule = array($schedule_class);
                    $data = $ready_schedule;
                } else {
                    $data = get_not_found();
                }
            } else {
                $data = response_fail();
            }
        } catch (Exception $e) {
            $data = response_fail();
        }
        return $data;
    }

    private function _add_major_generate() {
        $datas = json_decode(file_get_contents('php://input'));

        try {
            if ($datas != "") {
                $generate_key = $datas->generate_key;
                $get_schedule_tmp = $this->schedule_model->get_schedule_tmp($generate_key);
                $result = $get_schedule_tmp['data'];
                if ($get_schedule_tmp['data'] != "") {
                    foreach ($get_schedule_tmp['data'] as $each) {
                        $migrate = $this->schedule_model->migrate_schedule_tmp($each->class_seq, $each->day_hour_seq, $each->room_seq);
                        if ($migrate['response'] == OK_STATUS) {
                            $data_migrate[] = TRUE;
                        } else {
                            $data_migrate[] = FALSE;
                        }
                    }
                }
                $delete_tmp = $this->schedule_model->delete_migrate_schedule_tmp($generate_key);

                if ($delete_tmp['response'] == OK_STATUS) {
                    $delete_tmp = TRUE;
                } else {
                    $delete_tmp = FALSE;
                }

                if ($data_migrate == TRUE AND $delete_tmp == TRUE) {
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

    private function _get_course_generate() {
        //GET course_seq via URL
        try {
            $course_seq = $this->uri->segment(5);
            if ($course_seq != "") {
                $building = $this->schedule_model->get_building_by_course($course_seq);
                $building_seq = $building['data']->building_seq;
                $get_rooms = $this->schedule_model->get_room_by_building($building_seq);
                $rooms = $get_rooms['data'];
                $check_free_day_hour = $this->schedule_model->check_dh_schedule();
//                print_r($check_free_day_hour);
//                exit();
                foreach ($rooms as $room) {
                    unset($check_schedule_data);
                    foreach ($check_free_day_hour['data'] as $each) {
                        $check_schedule = $this->schedule_model->check_room_dh_schedule($each->dh_seq, $room->seq);
                        if ($check_schedule['data'] == 'YES') {
                            $check_schedule_tmp = $this->schedule_model->check_room_dh_schedule_tmp($each->dh_seq, $room->seq);
                            if ($check_schedule_tmp['data'] == 'YES') {
                                $check_schedule_data[] = array(
                                    'dh_seq' => $each->dh_seq,
                                    'room_seq' => $room->seq,
                                    'day' => $each->day_name,
                                    'hour' => $each->hour_name,
                                    'duration' => $each->start_hour . ':' . $each->start_min . '-' . $each->end_hour . ':' . $each->end_min,
                                    'availability' => $check_schedule['data']);
                            }
                        }
                    }
                    $free_schedule[] = array('room_seq' => $room->seq, 'room_name' => $room->name, 'room_free_schedule' => $check_schedule_data);
                }
                $ready = [];
//                print_r($free_schedule);
//                exit();
                foreach ($free_schedule as $each) {
                    foreach ($each['room_free_schedule'] as $free) {
                        $array = array('dh_seq' => $free['dh_seq'],
                            'room_seq' => $free['room_seq'],
                            'room_name' => $each['room_name'],
                            'day' => $free['day'],
                            'hour' => $free['hour'],
                            'duration' => $free['duration'],
                        );
                        array_push($ready, $array);
                    }
                }
//                print_r($ready);
//                exit();
                $free = array("free_schedule" => $ready);
                $get_course = $this->schedule_model->get_course($course_seq);
                $course_sks = $get_course['data']->sks;
                $get_class = $this->schedule_model->get_class($course_seq);
                $count_pick_schedule_total = $course_sks * count($get_class['data']);
                $slice = array_slice($free['free_schedule'], 0, $count_pick_schedule_total);
                foreach ($get_class['data'] as $class) {
                    $pick_free_schedule = array_slice($slice, 0, $course_sks);
                    unset($new_class_schedule);
                    foreach ($pick_free_schedule as $each) {
                        $new_class_schedule[] = array(
                            'dh_seq' => $each['dh_seq'],
                            'room_seq' => $each['room_seq'],
                            'room_name' => $each['room_name'],
                            'day' => $each['day'],
                            'hour' => $each['hour'],
                            'duration' => $each['duration'],
                            'class_seq' => $class->seq,
                            'class_sks' => $course_sks);
                    }
                    $slice = array_slice($slice, $course_sks);
                    $schedule_class[] = array("class_label" => $class->label, "class_schedule" => $new_class_schedule);
                }
//                Insert to schedule_tmp
//                print_r($schedule_class);exit();
                foreach ($schedule_class as $each) {
                    foreach ($each['class_schedule'] as $params)
                        $insert = $this->schedule_model->add_schedule_tmp($params['dh_seq'], $params['room_seq'], $params['class_seq']);
                }
                $ready_schedule = array("class_generate_schedule" => $schedule_class);
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

    private function _add_manual() {
        try {
            $datas = json_decode(file_get_contents('php://input'));
            
            if ($datas != "") {
                $add = $this->schedule_model->add_manual($datas);
                $data = response_success();
            } else {
                $data = response_fail();
            }
        } catch (Exception $e) {
            $data = response_fail();
        }
        return $data;
    }

}
