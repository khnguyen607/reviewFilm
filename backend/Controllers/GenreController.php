<?php

class GenreController extends BaseController
{
    private $model;

    public function __construct()
    {
        $this->loadModel('GenreModel');
        $this->model = new GenreModel;
    }

    public function index()
    {
        $rooms = $this->model->mAlls();

        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($rooms);
    }

    public function insert()
    {
        $data = [
            'Name' => $_POST['Name']
        ];

        if ($this->model->mInsert($data)) {
            echo "true";
        } else {
            echo "false";
        }
    }

    public function delete()
    {
        $id = $_GET['id'];
        if ($this->model->mDelete($id)) {
            echo "true";
        } else {
            echo "false";
        }
    }
}
