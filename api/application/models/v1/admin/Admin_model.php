<?php

if (!defined('BASEPATH'))
exit('No direct script access allowed');

class admin_model extends CI_Model {

    public function login($params) {
        //$params = 'id_siswa' & 'password'
        $username = $params->username;
        $password = $params->password;
        $sql = $this->db->select('username')->from('user')->where('username', $username)->where('password', $password);
        $query = $this->db->get();
        $count = $query->num_rows();
        $rows = $query->row();
        if ($query == TRUE) {
            if ($count < 1) {
                $response = FALSE;
                $data = array("response" => $response, "results" => $rows);
            } else {
                $response = TRUE;
                $data = array("response" => $response, "results" => $rows);
            }
        } else {
            $response = FALSE;
            $data = array("response" => $response, "results" => $rows);
        }
        return $data;
    }


    public function mass_delete($table= NULL ,$column = NULL , $value = NULL) {
        try {
            $where = $this->db->where($column, $value);
            $query = $this->db->delete($table);
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
