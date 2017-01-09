<?php

include 'Admin.php';

class authentication extends admin {

    public function login() {
        echo JWT::encode($this->_login(), SERVER_SECRET_KEY);
    }
    
   

    private function _login() {
        $datas = json_decode(file_get_contents('php://input'));
        if ($datas != "") {
            $params = new stdClass();
            $params->username = $datas->username;
            $params->password = $datas->password;
            $loginvalidate = $this->admin_model->login($params);
            if ($loginvalidate['response'] == TRUE) {
                $data = response_success();
            } else {
                $data = response_fail();
            }
        } else {
            $data = response_fail();
        }
        return $data;
    }

    
}
