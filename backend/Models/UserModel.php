<?php

class UserModel extends BaseModel
{
    const TABLE = 'users';

    // ---CÁC PHƯƠNG THỨC CƠ BẢN--- 
    public function mAlls($select = ['*'])
    {
        return $this->bmAlls(self::TABLE, $select);
    }
    public function mFind($id)
    {
        return $this->bmFind(self::TABLE, $id);
    }
    public function mmUpdate($id, $data)
    {
        return $this->bmUpdate(self::TABLE, $id, $data);
    }
    public function mDelete($id)
    {
        return $this->bmDelete(self::TABLE, $id);
    }

    // ---CÁC PHƯƠNG THỨC BỔ SUNG---
    // Phương thức để thiết lập mật khẩu
    private function setPassword($password)
    {
        return password_hash($password, PASSWORD_BCRYPT);
    }

    // Phương thức để kiểm tra mật khẩu
    public function checkPassword($pass, $decodePass)
    {
        return password_verify($pass, $decodePass);
    }

    // thêm tài khoản mới 
    public function mInsert($data)
    {
        $data['Password'] = $this->setPassword($data['Password']);
        return $this->bmInsert(self::TABLE, $data);
    }

    // cập nhật thông tin User 
    public function mUpdate($id, $data)
    {
        if (isset($data['Password'])) $data['Password'] = $this->setPassword($data['Password']);
        $this->bmUpdate(self::TABLE, $id, $data);
        return True;
    }
    // public function mUpdate($id, $data)
    // {
    //     $user = [
    //         'Username' => $data['Username'],
    //         'Password' => $data['currentpass']
    //     ];
    //     if (!$this->isValidUser($user)) return False;
    //     $data['Password'] = $this->setPassword($data['newpass']);

    //     $user = [
    //         'Name'  =>  $data['Name'],
    //         'Username'  =>  $data['Username'],
    //         'Password'  =>  $data['Password']
    //     ];

    //     $this->bmUpdate(self::TABLE, $id, $user);
    //     return True;
    // }

    // Phương thức để kiểm tra vai trò của người dùng
    public function checkUserRole()
    {
        $user = $this->mFind($_COOKIE['user_id']);

        return $user;
    }

    // Kiểm tra Username tồn tại hay chưa
    public function checkuser_name($user)
    {
        $sql = "SELECT `Username` FROM `users` WHERE Username = '$user'";
        $check = mysqli_fetch_assoc($this->_query($sql));
        return (isset($check) ? False : True);
    }

    // Kiểm tra tính hợp lệ tài khoản
    public function isValidUser($data)
    {
        $user = $data['Username'];
        $pass = $data['Password'];

        $table = self::TABLE;
        $sql = "SELECT * FROM `$table` WHERE Username = '$user' LIMIT 1";
        $user = mysqli_fetch_assoc($this->_query($sql));
        if (!isset($user)) return False;
        if (!$this->checkPassword($pass, $user['Password'])) return False;

        setcookie("user_id", $user['ID'], time() + 3600, "/");
        return True;
    }

    public function mMovieFavorite($id)
    {
        $sql = "SELECT movies.*
                FROM movies
                INNER JOIN moviefavorite ON movies.ID = moviefavorite.movieID
                WHERE moviefavorite.userID = $id";
        $query = $this->_query($sql);
        $data = [];

        while ($row = mysqli_fetch_assoc($query)) {
            array_push($data, $row);
        }

        return $data;
    }

    public function mMovieComment($id)
    {
        $sql = "SELECT comments.*, movies.Name AS movieName, movies.ReleaseYear AS movieYear, movies.Img AS movieImg
                FROM `comments`
                INNER JOIN movies ON comments.movieID = movies.ID
                WHERE userID = $id";
        $query = $this->_query($sql);
        $data = [];

        while ($row = mysqli_fetch_assoc($query)) {
            array_push($data, $row);
        }

        return $data;
    }
}
