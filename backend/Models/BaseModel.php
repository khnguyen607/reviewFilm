<?php
class BaseModel extends Database
{
    protected $connect;

    public function __construct()
    {
        $this->connect =  $this->connect();
    }

    // truy vấn sql
    public function _query($sql)
    {
        return mysqli_query($this->connect, $sql);
    }

    // ------------------------------MỘT SỐ HÀM DÙNG CHUNG VIẾT SẴN -------------------------------------
    // Lấy tất cả dữ liệu 
    public function bmAlls($table, $select = ['*'])
    {
        $select = implode(',', $select);
        $sql = "SELECT $select FROM `$table`";
        $query = $this->_query($sql);
        $data = [];

        while ($row = mysqli_fetch_assoc($query)) {
            array_push($data, $row);
        }

        return $data;
    }

    // lấy ra dữ liệu 1 bản ghi trong bảng
    public function bmFind($table, $id)
    {
        $sql = "SELECT * FROM `$table` WHERE id = $id LIMIT 1";
        $query = $this->_query($sql);
        return mysqli_fetch_assoc($query);
    }

    // thêm dữ liệu 
    // public function bmInsert($table, $data = [])
    // {
    //     $values = implode("','", array_values($data));
    //     $columns = implode(',', array_keys($data));
    //     $sql = "INSERT INTO `$table`($columns) VALUES ('$values')";
    //     // exit($sql);
    //     $this ->_query($sql);
    //     return "Thành công: $sql";
    // }

    public function bmInsert($table, $data = [])
    {
        // Xử lý dữ liệu để tránh SQL injection
        $escapedValues = array_map(function ($value) {
            return $this->connect->real_escape_string($value);
        }, array_values($data));
        // Tạo chuỗi các giá trị được escape
        $values = implode("','", $escapedValues);
        // Tạo chuỗi cột
        $columns = implode(',', array_keys($data));
        // Tạo truy vấn SQL
        $sql = "INSERT INTO `$table` ($columns) VALUES ('$values')";
        // Thực hiện truy vấn
        $this->_query($sql);
        // Trả về ID của bản ghi vừa thêm vào
        return $this->connect->insert_id;
    }

    // cập nhật dữ liệu
    public function bmUpdate($table, $id, $data)
    {
        // $values = implode("','", array_values($data));
        $values = [];
        foreach ($data as $key => $value) {
            array_push($values, "`$key`='$value'");
        }
        $values = implode(',', $values);
        $sql = "UPDATE `$table` SET $values WHERE `id`= $id";
        $this->_query($sql);
        return True;
    }

    // xóa dữ liệu 
    public function bmDelete($table, $id)
    {
        $sql = "DELETE FROM `$table` WHERE `id` = $id";
        $this->_query($sql);
        return "Thành công: $sql";
    }
}
