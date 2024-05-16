<?php

class CommentController extends BaseController
{
    private $model;

    public function __construct()
    {
        $this->loadModel('CommentModel');
        $this->model = new CommentModel;
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
            'userID'      => $_POST['userID'],
            'movieID'      => $_POST['movieID'],
            'Content'      => $_POST['Content'],
        ];
        $this->model->mInsert($data);
        echo "true";
    }

    public function update()
    {
        $id = $_GET['id'];
        $data = [
            'Name'      => $_POST['Name']
        ];

        $this->model->mUpdate($id, $data);

        echo "true";
    }

    public function delete()
    {
        $id = $_GET['id'];
        $this->model->mDelete($id);
        header("Location: ../frontend/admin/?page=nutritionists");
    }

    public function insertRating()
    {
        $id = $_GET['id'];
        $Point = $_GET['rate'];
        $sql = "INSERT INTO `rating`(`movieID`, `Point`) VALUES ($id, $Point)";
        $this->model->_query($sql);

        $sql = "UPDATE movies
        SET Rate = (SELECT ROUND(AVG(Point), 1) AS PointAvg
                    FROM rating
                    WHERE movieID = movies.ID
                    GROUP BY movieID)
        WHERE ID = $id";

        $this->model->_query($sql);
        echo "true";
    }

    public function totalRating()
    {
        $id = $_GET['id'];
        $sql = "SELECT COUNT(*) AS total FROM rating WHERE movieID = $id";
        $data = mysqli_fetch_assoc($this->model->_query($sql));
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}
