<?php

class UserController extends BaseController
{
    private $model;

    public function __construct()
    {
        $this->loadModel('UserModel');
        $this->model = new UserModel;
    }

    public function index()
    {
        $data = $this->model->mAlls();

        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    public function find()
    {
        $id = $_GET['id'];
        $user = $this->model->mFind($id);

        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($user);
    }

    public function insert()
    {
        $data = [
            'Name'  => $_POST['Name'],
            'Username'  => $_POST['Username'],
            'Password'  => $_POST['Password'],
        ];
        if ($this->model->checkuser_name($data['Username'])) {
            $this->model->mInsert($data);
            echo "true";
        } else {
            echo "false";
        }
    }

    public function update()
    {
        $id = $_GET['id'];
        if (isset($_POST['oldPassword'])) {
            $data = [
                'Username'  => $_POST['Username'],
                'Password'  => $_POST['oldPassword']
            ];
            if ($this->model->isValidUser($data)) {
                $data['Password'] = $_POST['newPassword'];
                $this->model->mUpdate($id, $data);
                exit("true");
            } else {
                exit("Password is wrong");
            }
        }

        $data = [];
        if ($_POST['Name']) $data['Name'] = $_POST['Name'];
        // if ($_POST['Username']) $data['Username'] = $_POST['Username'];
        $this->model->mUpdate($id, $data);
        echo 'true';
    }

    public function delete()
    {
        $id = $_GET['id'];
        $this->model->mDelete($id);
        header("Location: ../frontend/admin/?page=users");
    }

    public function login()
    {
        $data = [
            'Username'  => $_POST['Username'],
            'Password'  => $_POST['Password']
        ];

        $check = $this->model->isValidUser($data);
        if ($check) {
            echo "true";
        } else {
            echo "false";
        }
    }

    public function logout()
    {
        setcookie("user_id", "", time() - 3600, "/");
        header("Location: ../frontend/client/?logoutFailed=true");
    }

    public function check()
    {
        $role = $this->model->checkUserRole();
        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($role);
    }

    public function changeInfo()
    {
        $id = $_GET['id'];
        if (isset($_POST['Password']) && ($_POST['Password'] != "")) $data['Password'] = $_POST['Password'];
        if (isset($_POST['Email']) && ($_POST['Email'] != "")) $data['Email'] = $_POST['Email'];
        if (isset($_POST['Phone']) && ($_POST['Phone'] != "")) $data['Phone'] = $_POST['Phone'];
        if (isset($_POST['Address']) && ($_POST['Address'] != "")) $data['Address'] = $_POST['Address'];
        $this->model->mUpdate($id, $data);
        header("Location: ../frontend/admin/?page=users");
    }

    public function movieFavorite()
    {
        $id = $_GET['id'];
        $data = $this->model->mMovieFavorite($id);
        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    public function movieComment()
    {
        $id = $_GET['id'];
        $data = $this->model->mMovieComment($id);
        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    public function addMovieFavorite()
    {
        $userID = $_GET['userID'];
        $movieID = $_GET['movieID'];
        $sql = "INSERT INTO `moviefavorite`(`userID`, `movieID`)
        VALUES ($userID,$movieID)";
        $this->model->_query($sql);
    }
}
