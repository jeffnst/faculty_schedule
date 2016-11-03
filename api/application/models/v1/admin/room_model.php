<?php

//include 'Admin_model.php';

class room_model extends admin_model {

    public function all() {
        try {
            $sql = $this->db
                    ->select('room.seq as seq')
                    ->select('room.name as name')
                    ->select('room.description as description')
                    ->select('room.building_seq as building_seq')
                    ->select('building.name as building_name')
                    ->from('room')->join('building', 'room.building_seq = building.seq', 'inner')
                    ->order_by('room.seq');
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
            $sql = $this->db->select('*')->from('room')->where('seq', $seq);
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
            $data = array('name' => $params->name, 'building_seq' => $params->building_seq, 'description' => $params->description);
            $query = $this->db->insert('room', $data);
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
            $query = $this->db->delete('room', array('seq' => $seq));
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
            $data = array('name' => $params->name, 'building_seq' => $params->building_seq, 'description' => $params->description);
            $where = $this->db->where('seq', $params->seq);
            $query = $this->db->update('room', $data);
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

    public function get_building_option() {
        try {
            $sql = $this->db->select('*')->from('building')->order_by('seq');
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

}
