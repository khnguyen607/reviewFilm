<?php

require "Models/OrderDetailModel.php";
class OrderController extends BaseController
{
    private $model;
    private $modelDetail;

    public function __construct()
    {
        $this->loadModel('OrderModel');
        $this->model = new OrderModel;
        $this->modelDetail = new OrderDetailModel;
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
            'TotalPrice'      => $_POST['TotalPrice'],
            'GuestName'      => $_POST['GuestName'],
            'GuestEmail'      => $_POST['GuestEmail'],
            'GuestPhone'      => $_POST['GuestPhone'],
            'GuestAddress'      => $_POST['GuestAddress'],
        ];
        $orderID = $this->model->mInsert($data);
        if(isset($_POST['userID'])) {
            $this->model->mInsertSynOrdersUsers($orderID, $_POST['userID']);
        }
        $products = json_decode($_POST['orderDetails'], true);
        // Example of accessing data
        foreach ($products as $_ => $details) {
            $tempData = [
                'orderID'       => $orderID,
                'productID'     => $details['ID'],
                'Quantity'      => $details['Quantity']
            ];
            $this->modelDetail->mInsert($tempData);
        }
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

    public function changeStatus()
    {
        $id = $_GET['id'];
        $newStaus = $_GET['newStaus'];
        $data = [
            "Status" => $newStaus
        ];
        $this->model->mUpdate($id, $data);
    }

    public function getOrderForUser()
    {
        $userID = $_GET['userID'];
        $data = $this->model->mGetOrderForUser($userID);
        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}
