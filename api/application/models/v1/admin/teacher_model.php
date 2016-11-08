<?php

//include 'Admin_model.php';

class major_model extends admin_model {

    public function all() {
        try {
            $sql = $this->db
                    ->select('major.seq as seq')
                    ->select('major.name as name')
                    ->select('major.description as description')
                    ->select('major.faculty_seq as faculty_seq')
                    ->select('faculty.name as faculty_name')
                    ->from('major')->join('faculty', 'major.faculty_seq = faculty.seq', 'inner')
                    ->order_by('major.seq');
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
            $sql = $this->db->select('*')->from('major')->where('seq', $seq);
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
            $data = array('name' => $params->name, 'faculty_seq' => $params->faculty_seq, 'description' => $params->description);
            $query = $this->db->insert('major', $data);
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
            $query = $this->db->delete('major', array('seq' => $seq));
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
            $data = array('name' => $params->name, 'faculty_seq' => $params->faculty_seq, 'description' => $params->description);
            $where = $this->db->where('seq', $params->seq);
            $query = $this->db->update('major', $data);
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

    public function get_faculty_option() {
        try {
            $sql = $this->db->select('*')->from('faculty')->order_by('seq');
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
