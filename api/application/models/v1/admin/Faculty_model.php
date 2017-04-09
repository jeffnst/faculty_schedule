<?php

//include 'Admin_model.php';

class faculty_model extends admin_model {

    public function all() {
        try {
            $sql = $this->db
                    ->select('f.seq as seq')
                    ->select('f.name as faculty_name')
                    ->select('f.description as faculty_description')
                    ->select('b.name as building_name')
                    ->from('faculty as f')
                    ->join('building as b', 'f.building_seq = b.seq')
                    ->order_by('f.seq');
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
            $sql = $this->db->select('*')->from('faculty')->where('seq', $seq);
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
            $data = array('name' => $params->name, 'description' => $params->description, 'building_seq' => $params->building_seq);
            $query = $this->db->insert('faculty', $data);
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
            $query = $this->db->delete('faculty', array('seq' => $seq));
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
            $data = array('name' => $params->name, 'description' => $params->description, 'building_seq' => $params->building_seq);
            $where = $this->db->where('seq', $params->seq);
            $query = $this->db->update('faculty', $data);
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

    public function get_major_option($faculty_seq) {
        try {
            $sql = $this->db->select('*')->from('major')->where('faculty_seq', $faculty_seq);
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

    public function get_course_option($faculty_seq) {
        try {
            $sql = $this->db
                    ->select('*')
                    ->from('course')
                    ->join('major', 'course.major_seq = major.seq')
                    ->join('faculty', 'major.faculty_seq = faculty.seq')
                    ->where('faculty.seq', $faculty_seq);
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

    public function get_schedule($fac_seq) {
        try {
            $sql = "SELECT "
                    . "`sc`.`seq` as `schedule_seq`,"
                    . "`d`.`seq` as `day_seq`,"
                    . "`d`.`name` as `day_name`,"
                    . "`mj`.`name` as `major_name`,"
                    . "`cs`.`name` as `course_name` , "
                    . "`cl`.`label` as `class_label` ,"
                    . "`h`.`name` as `hour_name` , "
                    . "`h`.`start_hour` , "
                    . "`h`.`start_min` , "
                    . "`h`.`end_hour` , "
                    . "`h`.`end_min`, "
                    . "`r`.`name` as `room_name` "
                    . "FROM `schedule` as `sc` "
                    . "JOIN `class` as `cl` ON `sc`.`class_seq` = `cl`.`seq` "
                    . "JOIN `day_hour` as `dh` on `sc`.`day_hour_seq` = `dh`.`seq` "
                    . "JOIN `day` as `d` on `dh`.`day_seq` = `d`.`seq` "
                    . "JOIN `hour` as `h` ON `dh`.`hour_seq` = `h`.`seq` "
                    . "JOIN `room` as `r` ON `sc`.`room_seq` = `r`.`seq` "
                    . "JOIN `course` as `cs` ON `cl`.`course_seq` = `cs`.`seq` "
                    . "JOIN `major` as `mj` ON `cs`.`major_seq` = `mj`.`seq` "
                    . "JOIN `faculty` as `fc` ON `mj`.`faculty_seq` = `fc`.`seq` WHERE `fc`.`seq` = '{$fac_seq}' "
                    . "ORDER BY `d`.`seq` ASC , `cl`.`label` ASC , `h`.`sort` ASC";
            $query = $this->db->query($sql);
//            $get = $query->get();
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

    public function put_schedule($params) {
        try {
            $where = $this->db->where('seq', $params['seq']);
            $query = $this->db->update('schedule', $params);
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

    public function delete_schedule($seq) {
        try {
            $where = $this->db->where('seq',$seq);            
            $query = $this->db->delete('schedule');

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
