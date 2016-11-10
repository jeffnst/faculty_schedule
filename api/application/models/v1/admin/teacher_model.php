<?php

//include 'Admin_model.php';

class teacher_model extends admin_model {

    public function all() {
        try {
            $sql = $this->db->select('*')->from('teacher')->order_by('seq');
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
            $sql = $this->db->select('*')->from('teacher')->where('seq', $seq);
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
            $data = array('nidn' => $params->nidn,
                'name' => $params->name,
                'contact' => $params->contact,
                'address' => $params->address,
                'education_degree' => $params->education_degree,
            );
            $query = $this->db->insert('teacher', $data);
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
            $query = $this->db->delete('teacher', array('seq' => $seq));
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
            $data = array('nidn' => $params->nidn,
                'name' => $params->name,
                'contact' => $params->contact,
                'address' => $params->address,
                'education_degree' => $params->education_degree,
            );
            $where = $this->db->where('seq', $params->seq);
            $query = $this->db->update('teacher', $data);
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

    public function get_major_option() {
        try {
            $sql = $this->db->select('*')->from('major')->order_by('seq');
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

    public function check_add_course($params) {
        try {
            $sql = $this->db
                    ->select('*')
                    ->from('teacher_classes')
                    ->where('teacher_seq', $params->teacher_seq)
                    ->where('course_seq', $params->course_seq);
            $query = $this->db->get();
            $count = $query->num_rows();
            if ($query == TRUE) {
                if ($count >= '1') {
                    $response = FAIL_STATUS;
                    $message = FAIL_MESSAGE;
                } else {
                    $response = OK_STATUS;
                    $message = OK_MESSAGE;
                }
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

    public function add_course($params) {
        try {
            $data = array('teacher_seq' => $params->teacher_seq, 'course_seq' => $params->course_seq);
            $query = $this->db->insert('teacher_classes', $data);
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

    public function get_course($teacher_seq) {
        try {
            $sql = $this->db
                    ->select('course.seq as seq')
                    ->select('teacher_classes.seq as teacher_course_seq')
                    ->select('course.name as name')
                    ->select('course.major_seq as major_seq')
                    ->select('major.name as major_name')
                    ->select('faculty.name as faculty_name')
                    ->select('course.sks as sks')
                    ->from('teacher_classes')
                    ->join('course', 'teacher_classes.course_seq = course.seq')
                    ->join('major', 'course.major_seq = major.seq')
                    ->join('faculty', 'major.faculty_seq = faculty.seq')
                    ->where('teacher_classes.teacher_seq', $teacher_seq);
            $query_get_courses_teacher = $this->db->get();
            $sql_get_courses_none_teacher = "SELECT `c`.`seq`,`c`.`name`,`c`.`major_seq`,
                                            `c`.`sks`,`m`.`name` as `major_name`,`f`.`name` as `faculty_name`
                                            FROM `course` as `c` 
                                            JOIN `major` as `m` ON `c`.`major_seq` = `m`.`seq`
                                            JOIN `faculty` as `f` ON `m`.`faculty_seq` = `f`.`seq`
                                            WHERE `c`.`seq` NOT IN ( SELECT `c`.`seq` as `seq` FROM `course` as `c` right join `teacher_classes` as `tc` on `c`.`seq` = `tc`.`course_seq` where `tc`.`teacher_seq` = '{$teacher_seq}')";
            $query_get_courses_none_teacher = $this->db->query($sql_get_courses_none_teacher);
            if ($query_get_courses_teacher == TRUE && $query_get_courses_none_teacher == TRUE) {
                $response = OK_STATUS;
                $message = OK_MESSAGE;
                $rows = array("teacher_courses" => $query_get_courses_teacher->result(), "all_courses" => $query_get_courses_none_teacher->result());
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

    public function delete_course($seq) {
        try {
            $query = $this->db->delete('teacher_classes', array('seq' => $seq));
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
