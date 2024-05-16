<?php

class BlogModel extends BaseModel
{
    const TABLE = 'blogs';

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
        return $this->bmDelete(self::TABLE, $id);
    }

    public function mGetComments($id)
    {
        $sql = "SELECT comments.*, users.Name
                FROM comments
                INNER JOIN users ON comments.userID=users.ID
                WHERE blogID = $id
                ORDER BY comments.ID";
        $query = $this->_query($sql);
        $data = [];

        while ($row = mysqli_fetch_assoc($query)) {
            array_push($data, $row);
        }

        return $data;
    }

    public function mGetCategories($id)
    {
        $sql = "SELECT categories.*
                FROM categories
                INNER JOIN syn_blogs_categories ON categories.ID = syn_blogs_categories.categoryID
                WHERE syn_blogs_categories.blogID = $id";
        $query = $this->_query($sql);
        $data = [];

        while ($row = mysqli_fetch_assoc($query)) {
            array_push($data, $row);
        }

        return $data;
    }

    public function mGetAllsFK()
    {
        $sql = "SELECT blogs.*, users.Name AS user, 
            GROUP_CONCAT(categories.Name SEPARATOR ', ') AS categoriesValue
            FROM blogs
            INNER JOIN users ON blogs.userID = users.ID
            LEFT JOIN syn_blogs_categories ON blogs.ID = syn_blogs_categories.blogID
            LEFT JOIN categories ON syn_blogs_categories.categoryID = categories.ID
            GROUP BY blogs.ID;
            ";
        $query = $this->_query($sql);
        $data = [];

        while ($row = mysqli_fetch_assoc($query)) {
            array_push($data, $row);
        }

        return $data;
    }
}
