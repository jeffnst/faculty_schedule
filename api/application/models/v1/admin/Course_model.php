<?php

//include 'Admin_model.php';

class course_model extends admin_model {

    public function all() {
        try {
            $sql = $this->db
                    ->select('course.seq as seq')
                    ->select('course.name as name')
                    ->select('course.semester as semester')
                    ->select('course.description as description')
                    ->select('course.major_seq as major_seq')
                    ->select('major.name as major_name')
                    ->select('faculty.name as faculty_name')
                    ->select('course.sks as sks')
                    ->from('course')
                    ->join('major', 'course.major_seq = major.seq', 'inner')
                    ->join('faculty', 'major.faculty_seq = faculty.seq')
                    ->order_by('course.seq');
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
            $sql = $this->db->select('*')->from('course')->where('seq', $seq);
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

    public function get_by_major($seq) {
        try {
            $sql = $this->db->select('*')->from('course')->where('major_seq', $seq);
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

    public function get_schedule($seq) {
        try {
            $sql = $this->db->select('*')->from('course')->where('seq', $seq);
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

    public function get_class($seq) {
        try {
            $sql = $this->db->select('*')->from('class')->where('course_seq', $seq);
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

    public function add($params) {
        try {
            $data = array(
                'name' => $params->name,
                'major_seq' => $params->major_seq,
                'description' => $params->description,
                'sks' => $params->sks,
                'semester' => $params->smt);
            $query = $this->db->insert('course', $data);
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
            $query = $this->db->delete('course', array('seq' => $seq));
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
            $data = array('name' => $params->name, 
                'major_seq' => $params->major_seq, 
                'description' => $params->description, 
                'sks' => $params->sks,
                'semester' => $params->smt);
            $where = $this->db->where('seq', $params->seq);
            $query = $this->db->update('course', $data);
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

    public function get_teacher_option($course_seq, $option) {
        try {
            if ($option == GET_COUNT) {
                $sql = $this->db->select('*')->from('teacher_classes')->where('course_seq', $course_seq);
            } elseif ($option == GET_DETAIL) {
                $sql = $this->db->distinct()
                        ->select('t.name as teacher_name')
                        ->select('t.seq as teacher_seq')
                        ->from('teacher_classes as tc')
                        ->join('teacher as t', 'tc.teacher_seq = t.seq')
                        ->where('tc.course_seq', $course_seq);
            }
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

    public function check_class($label, $course_seq) {
        try {
            $sql = $this->db->select('seq')->from('class')->where('course_seq', $course_seq)->where('label', $label);
            $query = $this->db->get();
            $count = $query->num_rows();
            if ($query == TRUE) {
                if ($count == '0') {
                    $response = OK_STATUS;
                    $message = OK_MESSAGE;
                } else {
                    $response = FAIL_STATUS;
                    $message = FAIL_MESSAGE;
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

    public function add_class($label, $course_seq) {
        try {
            $data = array('course_seq' => $course_seq, 'label' => $label);
            $query = $this->db->insert('class', $data);
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

    public function get_classes($course_seq) {
        try {
            $sql = $this->db
                    ->select('class.label as class_label')
                    ->select('class.seq as class_seq')
                    ->select('class.student_total as class_student_total')
//                    ->select('teacher.name as teacher_name')
                    ->from('class')
//                    ->join('teacher_classes', 'teacher_classes.course_seq = class.course_seq')
//                    ->join('teacher', 'teacher.seq = teacher_classes.teacher_seq')
                    ->where('class.course_seq', $course_seq)
                    ->order_by('class.label', 'ASC');
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

    public function get_teacher_class($class_seq) {
        try {
            $sql = "SELECT `teacher`.`name` FROM `teacher_classes` JOIN `class` on `teacher_classes`.`class_seq` = `class`.`seq` JOIN `teacher` on `teacher_classes`.`teacher_seq` = `teacher`.`seq` WHERE `teacher_classes`.`class_seq` = '{$class_seq}'";
//            $sql = $this->db
//                    ->select('teacher.name as teacher_name')
//                    ->from('teacher_classes as tc')
//                    ->join('class as c', 'tc.class_seq = c.seq')
//                    ->join('teacher as t', 'tc.teacher_seq = t.seq')
//                    ->where('tc.class_seq', $class_seq);
//                    ->order_by('course.seq');
            $query = $this->db->query($sql);
//            $query = $this->db->get();
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

    public function check_class_teacher($params) {
        try {
            $sql = $this->db
                    ->select('seq')
                    ->select('class_seq')
                    ->from('teacher_classes')
                    ->where('course_seq', $params->course_seq)
                    ->where('teacher_seq', $params->teacher_seq);
//                    ->where('class_seq', $params->class_seq);
            $query = $this->db->get();
            $count = $query->num_rows();
//            print_r($row);exit();
            if ($query == TRUE) {
                $row = $query->row();
                $class_seq = $row->class_seq;
                $response = OK_STATUS;
                $message = OK_MESSAGE;
            } else {
                $class_seq = "";
                $response = FAIL_STATUS;
                $message = FAIL_MESSAGE;
            }
        } catch (Exception $e) {
            $response = FAIL_STATUS;
            $message = FAIL_MESSAGE;
        }
        $data = array("response" => $response, "message" => $message, "data" => $class_seq);
        return $data;
    }

    public function update_class_teacher($params) {
        try {
//            $data = array('class_seq' => $params->class_seq);
//            $where = $this->db->where('course_seq', $params->course_seq)->where('class_seq', $params->class_seq);
//            $query = $this->db->update('teacher_classes', $data);            
            $sql = "UPDATE `teacher_classes` SET `teacher_seq` = '{$params->teacher_seq}'  WHERE `class_seq` = '{$params->class_seq}'  AND `course_seq` = '{$params->course_seq}'; ";
            $query = $this->db->query($sql);
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

    public function add_class_teacher($params) {
        try {
            $data = array('teacher_seq' => $params->teacher_seq, 'course_seq' => $params->course_seq, 'class_seq' => $params->class_seq);
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

    public function delete_class($seq) {
        try {
            $del = $this->db->delete('class', array('seq' => $seq));
            if ($del == TRUE) {
                $data = array('class' => NULL);
                $where = $this->db->where('class_seq', $seq);
                $update = $this->db->update('teacher_classes', $data);
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
