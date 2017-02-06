<?php

//include 'Admin_model.php';

class day_model extends admin_model {

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

    public function get($seq) {
        try {
            $sql = $this->db->select('*')->from('day')->where('seq', $seq);
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

    public function add($params) {
        try {
            $data = array('name' => $params->name);
            $query = $this->db->insert('day', $data);
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

    public function delete($seq) {
        try {
            $query = $this->db->delete('day', array('seq' => $seq));
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
                $rows = array("picked_hour" => $query1->result() , "unpicked_hour" => $query2->result() );
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
