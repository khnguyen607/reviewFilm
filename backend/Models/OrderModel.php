<?php

class OrderModel extends BaseModel
{
    const TABLE = 'orders';

    public function mAlls($select = ['*'])
    {
        return $this->bmAlls(self::TABLE, $select);
    }

    public function mFind($id)
    {
        return $this->bmFind(self::TABLE, $id);
    }

    public function mInsert($data)
    {
        return $this->bmInsert(self::TABLE, $data);
    }

    public function mUpdate($id, $data)
    {
        return $this->bmUpdate(self::TABLE, $id, $data);
    }

    public function mDelete($id)
    {
        $this->_deleteSyn($id);
        return $this->bmDelete(self::TABLE, $id);
    }

    public function mInsertSynOrdersUsers($orderID, $userID)
    {
        $sql = "INSERT INTO `syn_orders_users`(`userID`, `orderID`) VALUES ('$userID','$orderID')";
        $this->_query($sql);
    }

    public function mGetOrderForUser($userID)
    {
        $sql = "SELECT * FROM `syn_orders_users` INNER JOIN orders ON syn_orders_users.orderID = orders.ID WHERE syn_orders_users.userID='$userID'";
        $query = $this->_query($sql);
        $data = [];

        while ($row = mysqli_fetch_assoc($query)) {
            array_push($data, $row);
        }

        return $data;
    }

    private function _deleteSyn($id) {
        $sql = "DELETE FROM `orderdetail` WHERE orderID = $id";
        $this->_query($sql);
    }
}
