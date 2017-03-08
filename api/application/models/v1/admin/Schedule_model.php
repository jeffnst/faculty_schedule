<?php

//include 'Admin_model.php';

class schedule_model extends admin_model {

    public function all() {
        try {
            $sql = $this->db->select('*')->from('day')->order_by('seq');
            $query = $this->db->get();
            if ($query == TRUE) {
                $response = OK_STATUS;
                $message = OK_MESSAGE;
                $rows = $query->result();
            } else {
                $response = FAIL_STATUS;
                $message = FAIL_MESSAGE;
                $rows = "";
            }
        } catch (Exception $e) {
            $response = FAIL_STATUS;
            $message = FAIL_MESSAGE;
            $rows = "";
        }
        $data = array("response" => $response, "message" => $message, "data" => $rows);
        return $data;
    }

    public function get_days() {
        try {
            $sql = $this->db->select('*')->from('day');
            $query = $this->db->get();
            if ($query == TRUE) {
                $response = OK_STATUS;
                $message = OK_MESSAGE;
                $rows = $query->result();
            } else {
                $response = FAIL_STATUS;
                $message = FAIL_MESSAGE;
                $rows = "";
            }
        } catch (Exception $e) {
            $response = FAIL_STATUS;
            $message = FAIL_MESSAGE;
            $rows = "";
        }
        $data = array("response" => $response, "message" => $message, "data" => $rows);
        return $data;
    }

    public function get_class($course_seq) {
        try {
            $sql = $this->db
                    ->select('cl.*')
                    ->from('class as cl')
                    ->join('course as c', 'cl.course_seq = c.seq')
                    ->where('c.seq', $course_seq);
            $query = $this->db->get();
            if ($query == TRUE) {
                $response = OK_STATUS;
                $message = OK_MESSAGE;
                $rows = $query->result();
            } else {
                $response = FAIL_STATUS;
                $message = FAIL_MESSAGE;
                $rows = "";
            }
        } catch (Exception $e) {
            $response = FAIL_STATUS;
            $message = FAIL_MESSAGE;
            $rows = "";
        }
        $data = array("response" => $response, "message" => $message, "data" => $rows);
        return $data;
    }

    public function get_building($course_seq) {
        try {
            $sql = $this->db
                    ->select('f.building_seq')
                    ->from('course as c')
                    ->join('major as m', 'c.major_seq = m.seq')
                    ->join('faculty as f', 'm.faculty_seq = f.seq')
                    ->where('c.seq', $course_seq);
            $query = $this->db->get();
            if ($query == TRUE) {
                $response = OK_STATUS;
                $message = OK_MESSAGE;
                $rows = $query->row();
            } else {
                $response = FAIL_STATUS;
                $message = FAIL_MESSAGE;
                $rows = "";
            }
        } catch (Exception $e) {
            $response = FAIL_STATUS;
            $message = FAIL_MESSAGE;
            $rows = "";
        }
        $data = array("response" => $response, "message" => $message, "data" => $rows);
        return $data;
    }

    public function get_room($building_seq) {
        try {
            $sql = $this->db->select('seq')->select('name')->from('room')->where('building_seq', $building_seq);
            $query = $this->db->get();
            if ($query == TRUE) {
                $response = OK_STATUS;
                $message = OK_MESSAGE;
                $rows = $query->result();
            } else {
                $response = FAIL_STATUS;
                $message = FAIL_MESSAGE;
                $rows = "";
            }
        } catch (Exception $e) {
            $response = FAIL_STATUS;
            $message = FAIL_MESSAGE;
            $rows = "";
        }
        $data = array("response" => $response, "message" => $message, "data" => $rows);
        return $data;
    }

    public function check_room_availability($day_hour_seq, $room_seq) {
        try {
            $sql = $this->db->select('seq')->from('schedule')->where('day_hour_seq', $day_hour_seq)->where('room_seq', $room_seq);
            $query = $this->db->get();
            if ($query == TRUE) {
                $response = OK_STATUS;
                $message = OK_MESSAGE;
                $res = $query->row();
                if ($res == "") {
                    $rows = "YES";
                } else {
                    $rows = "NO";
                }
            } else {
                $response = FAIL_STATUS;
                $message = FAIL_MESSAGE;
                $rows = "";
            }
        } catch (Exception $e) {
            $response = FAIL_STATUS;
            $message = FAIL_MESSAGE;
            $rows = "";
        }
        $data = array("response" => $response, "message" => $message, "data" => $rows);
        return $data;
    }

    public function check_schedule($day_hour_seq, $course_seq) {
        try {
//            $sql = $this->db->select('*')
//                    ->from('schedule as sc')
//                    ->join('class as cl','sc.class_seq = cl.seq')
//                    ->join('course as cs','cl.course_seq = cs.seq')
//                    ->where('sc.day_hour_seq', $day_hour_seq)
//                    ->where('cs.seq',$course_seq);
            $sql = $this->db->select('sc.seq as schedule_seq')
                    ->select('cl.seq as class_seq')
                    ->select('cl.label as class_label')
                    ->select('sc.day_hour_seq as day_hour_seq')
                    ->select('sc.room_seq as room_seq')
                    ->select('r.name as room_name')
                    ->select('d.seq as day_seq')
                    ->select('d.name as day_name')
                    ->select('h.seq as hour_seq')
                    ->select('h.name as hour_name')
                    ->select('h.start_hour')
                    ->select('h.start_min')
                    ->select('h.end_hour')
                    ->select('h.end_min')
                    ->from('schedule as sc')
                    ->join('class as cl', 'sc.class_seq = cl.seq')
                    ->join('day_hour as dh', 'sc.day_hour_seq = dh.seq')
                    ->join('day as d', 'dh.day_seq = d.seq')
                    ->join('hour as h', 'dh.hour_seq = h.seq')
                    ->join('room as r', 'sc.room_seq = r.seq')
//                    ->join('course as cs', 'cl.course_seq = cs.seq')                                                            
//                    ->where('sc.day_hour_seq', $day_hour_seq)
                    ->where('cl.course_seq', $course_seq);
            $query = $this->db->get();
            if ($query == TRUE) {
                $response = OK_STATUS;
                $message = OK_MESSAGE;
                $rows = $query->result();
//                if ($res == "") {
//                    $rows = "YES";
//                } else {
//                    $rows = "NO";
//                }
            } else {
                $response = FAIL_STATUS;
                $message = FAIL_MESSAGE;
                $rows = "";
            }
        } catch (Exception $e) {
            $response = FAIL_STATUS;
            $message = FAIL_MESSAGE;
            $rows = "";
        }
        $data = array("response" => $response, "message" => $message, "data" => $rows);
        return $data;
    }

    public function get_day_hour_all() {
        try {
            $sql = $this->db
                    ->select('dh.seq as day_hour_seq')
                    ->select('d.name as day_name')                    
                    ->select('h.name as hour_name')
                    ->select('h.start_hour as start_hour')
                    ->select('h.start_min as start_min')
                    ->select('h.end_hour as end_hour')
                    ->select('h.end_min as end_min')
                    ->from('day_hour as dh')
                    ->join('hour as h', 'dh.hour_seq = h.seq')                    
                    ->join('day as d', 'dh.day_seq = d.seq')                    
                    ->order_by(`dh.hour_seq`, 'ASC');
            $query = $this->db->get();
            $datas = $query->result();
            if ($query == TRUE) {
                $response = OK_STATUS;
                $message = OK_MESSAGE;
                $rows = $datas;
            } else {
                $response = FAIL_STATUS;
                $message = FAIL_MESSAGE;
                $rows = "";
            }
        } catch (Exception $e) {
            $response = FAIL_STATUS;
            $message = FAIL_MESSAGE;
            $rows = "";
        }
        $data = array("response" => $response, "message" => $message, "data" => $rows);
        return $data;
    }

    public function get_day_hour($day_seq) {
        try {
            $sql = $this->db
                    ->select('dh.seq as day_hour_seq')
                    ->select('h.seq as hour_seq')
                    ->select('h.name as hour_name')
                    ->select('h.start_hour as start_hour')
                    ->select('h.start_min as start_min')
                    ->select('h.end_hour as end_hour')
                    ->select('h.end_min as end_min')
                    ->from('day_hour as dh')
                    ->join('hour as h', 'dh.hour_seq = h.seq')
                    ->where('dh.day_seq', $day_seq)
                    ->order_by(`dh.hour_seq`, 'ASC');
            $query = $this->db->get();
//            $results = $query->result();
//            foreach ($result as $each) {
//                $day_hour_seq = $each->day_hour_seq;
//                foreach ($rooms as $room) {
//                    $available = $this->check_room_availabilty($day_hour_seq, $room->seq);
//                    $available = array($day_hour_seq, $room->seq);
//                    
//                }
//                $availables = $available;
//                $data[] = array("day_hour_seq" => $each->day_hour_seq, 
//                                "hour_seq" => $each->hour_seq,
//                                "hour_name" => $each->hour_name,
//                                "start" => $each->start_hour.':'.$each->start_min,
//                                "end" => $each->end_hour.':'.$each->end_min,
//                                "room" => $availables); 
//            }   
//            foreach ($results as $each) {
//                $day_hour_seq = $each->day_hour_seq;
//                $available[] = array("day_hour_seq" => $each->day_hour_seq,
//                    "hour_seq" => $each->hour_seq,
//                    "hour_name" => $each->hour_name,
//                    "start" => $each->start_hour . ':' . $each->start_min,
//                    "end" => $each->end_hour . ':' . $each->end_min,
//                    "room" => $rooms);
//            }
//            $datas = $available;
//            foreach ($datas as $data) {
//                $day_hour_seq = $data['day_hour_seq'];
//                $hour_seq = $data['hour_seq'];
//                $hour_name = $data['hour_name'];
//                $start = $data['start'];
//                $end = $data['end'];
//                foreach ($data['room'] as $room) {
//                    $check = $this->check_room_availabilty($day_hour_seq, $room->seq);
//                    $room_data[] = array("room_seq" => $room->seq, "availability" => $check['data']);                                        
//                }
//                $rooms = $room_data;
//                $records[] = array("day_hour_seq" => $day_hour_seq,
//                    "hour_seq" => $hour_seq,
//                    "hour_name" => $hour_name,
//                    "start" => $start,
//                    "end" => $end,
//                    "rooms" => $room_data);
//            }
            $datas = $query->result();
//            echo json_encode($datas);
//            exit();
            if ($query == TRUE) {
                $response = OK_STATUS;
                $message = OK_MESSAGE;
                $rows = $datas;
            } else {
                $response = FAIL_STATUS;
                $message = FAIL_MESSAGE;
                $rows = "";
            }
        } catch (Exception $e) {
            $response = FAIL_STATUS;
            $message = FAIL_MESSAGE;
            $rows = "";
        }
        $data = array("response" => $response, "message" => $message, "data" => $rows);
        return $data;
    }

    public function add_room($class_seq, $params) {
        try {
            $data = array('day_hour_seq' => $params->pick_dh_seq, 'room_seq' => $params->pick_room_seq, 'class_seq' => $class_seq);
            $query = $this->db->insert('schedule', $data);
            if ($query == TRUE) {
                $response = OK_STATUS;
                $message = OK_MESSAGE;
            } else {
                $response = FAIL_STATUS;
                $message = FAIL_MESSAGE;
            }
        } catch (Exception $e) {
            $response = FAIL_STATUS;
            $message = FAIL_MESSAGE;
        }
        $data = array("response" => $response, "message" => $message);
        return $data;
    }

    public function delete($filter, $value) {
        try {
            $query = $this->db->delete('schedule', array($filter => $value));
            if ($query == TRUE) {
                $response = OK_STATUS;
                $message = OK_MESSAGE;
            } else {
                $response = FAIL_STATUS;
                $message = FAIL_MESSAGE;
            }
        } catch (Exception $e) {
            $response = FAIL_STATUS;
            $message = FAIL_MESSAGE;
        }
        $data = array("response" => $response, "message" => $message);
        return $data;
    }

    public function delete_hour($seq) {
        try {
            $query = $this->db->delete('day_hour', array('seq' => $seq));
            if ($query == TRUE) {
                $response = OK_STATUS;
                $message = OK_MESSAGE;
            } else {
                $response = FAIL_STATUS;
                $message = FAIL_MESSAGE;
            }
        } catch (Exception $e) {
            $response = FAIL_STATUS;
            $message = FAIL_MESSAGE;
        }
        $data = array("response" => $response, "message" => $message);
        return $data;
    }

    public function put($params) {
        try {
            $data = array('name' => $params->name);
            $where = $this->db->where('seq', $params->seq);
            $query = $this->db->update('day', $data);
            if ($query == TRUE) {
                $response = OK_STATUS;
                $message = OK_MESSAGE;
            } else {
                $response = FAIL_STATUS;
                $message = FAIL_MESSAGE;
            }
        } catch (Exception $e) {
            $response = FAIL_STATUS;
            $message = FAIL_MESSAGE;
        }
        $data = array("response" => $response, "message" => $message);
        return $data;
    }

    public function get_hour($day_seq) {
        try {
            $sql = $this->db
                    ->select('h.seq as seq')
                    ->select('dh.seq as day_hour_seq')
                    ->select('d.seq as day_seq')
                    ->select('d.name as day_name')
                    ->select('dh.hour_seq as hour_seq')
                    ->select('h.name as hour_name')
                    ->select('h.start_hour as start_hour')
                    ->select('h.start_min as start_min')
                    ->select('h.end_hour as end_hour')
                    ->select('h.end_min as end_min')
                    ->from('hour as h')
                    ->join('day_hour as dh', 'h.seq = dh.hour_seq')
                    ->join('day as d', 'dh.day_seq = d.seq')
                    ->where('dh.day_seq', $day_seq);
            $query1 = $this->db->get();
            $sql2 = "SELECT * from `hour` where `seq` not in (SELECT `hour_seq` as `seq` from `day_hour` where `day_seq` = '$day_seq')";
            $query2 = $this->db->query($sql2);
            if ($query1 == TRUE) {
                $response = OK_STATUS;
                $message = OK_MESSAGE;
                $rows = array("picked_hour" => $query1->result(), "unpicked_hour" => $query2->result());
            } else {
                $response = FAIL_STATUS;
                $message = FAIL_MESSAGE;
                $rows = "";
            }
        } catch (Exception $e) {
            $response = FAIL_STATUS;
            $message = FAIL_MESSAGE;
            $rows = "";
        }
        $data = array("response" => $response, "message" => $message, "data" => $rows);
        return $data;
    }

    public function add_hours($params) {
        try {
//            $data = array('name' => $params->name);
            foreach ($params->hours_seq as $each) {
                $data = array('hour_seq' => $each, 'day_seq' => $params->day_seq);
                $query = $this->db->insert('day_hour', $data);
            }

            if ($query == TRUE) {
                $response = OK_STATUS;
                $message = OK_MESSAGE;
            } else {
                $response = FAIL_STATUS;
                $message = FAIL_MESSAGE;
            }
        } catch (Exception $e) {
            $response = FAIL_STATUS;
            $message = FAIL_MESSAGE;
        }
        $data = array("response" => $response, "message" => $message);
        return $data;
    }

}
