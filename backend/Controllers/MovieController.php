<?php

class MovieController extends BaseController
{
    private $model;

    public function __construct()
    {
        $this->loadModel('MovieModel');
        $this->model = new MovieModel;
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
        $data = $this->model->mFind($id);
        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    public function insert()
    {
        $data = [
            'Name'      => $_POST['Name'],
            'Price'      => $_POST['Price'],
            'Subtitle'  => $_POST['Subtitle'],
            'Description'  => $_POST['Description'],
            'Img'   => $this->saveFile()
        ];
        $this->model->mInsert($data);
        echo "true";
    }

    public function update()
    {
        $id = $_GET['id'];
        $data = [
            'Name'      => $_POST['Name'],
            'Price'      => $_POST['Price'],
            'Subtitle'  => $_POST['Subtitle'],
            'Description'  => $_POST['Description'],
        ];
        $Img = $this->saveFile();
        if ($Img) {
            $data["Img"] = $Img;
        }
        $this->model->mUpdate($id, $data);
        echo "true";
    }

    public function delete()
    {
        $id = $_GET['id'];
        $this->model->mDelete($id);
        header("Location: ../frontend/dashboard.html?tab=mgr__room");
    }


    public function getComments()
    {
        $id = $_GET['id'];
        $data = $this->model->mGetComments($id);
        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    public function getGenres()
    {
        $id = $_GET['id'];
        $data = $this->model->mGetGenres($id);
        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    private function saveFile()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['Img'])) {
            // Thư mục đích để lưu trữ tệp tin
            $uploadDirectory = 'www/images/products/';

            // Tên tệp gốc trên máy khách
            $filename = basename($_FILES['Img']['name']);

            // Đường dẫn đầy đủ đến tệp tạm thời trên máy chủ
            $tempFilePath = $_FILES['Img']['tmp_name'];

            // Tạo đường dẫn đầy đủ đến vị trí lưu trữ tệp tin
            $targetFilePath = $uploadDirectory . $filename;
            // Di chuyển tệp tin từ thư mục tạm thời đến thư mục đích
            if (move_uploaded_file($tempFilePath, $targetFilePath)) {
                // Trả về đường dẫn của tệp tin đã được lưu
                return substr($targetFilePath, 4);
            } else {
                // echo "Failed to upload file.";
            }
        } else {
            // echo "No file uploaded or invalid request.";
        }
        return null;
    }

    public function allsFK()
    {
        $data = $this->model->mAllsFK();
        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    public function addView()
    {
        $id = $_GET['id'];
        $sql = "UPDATE `movies` SET `view` = `view` + 1 WHERE `ID` = $id";
        $this->model->_query($sql);
    }
}
