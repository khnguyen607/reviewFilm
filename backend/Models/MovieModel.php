<?php

class MovieModel extends BaseModel
{
    const TABLE = 'movies';

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
        $sql = "SELECT comments.*, users.Name AS userName
                FROM `comments` 
                INNER JOIN users ON comments.userID = users.ID
                WHERE comments.productID=$id";
        $query = $this->_query($sql);
        $data = [];

        while ($row = mysqli_fetch_assoc($query)) {
            array_push($data, $row);
        }

        return $data;
    }

    public function mGetGenres($id)
    {
        $sql = "SELECT genres.*
                FROM `genres`
                INNER JOIN syn_movies_genres ON genres.ID = syn_movies_genres.genreID
                INNER JOIN movies ON syn_movies_genres.movieID = movies.ID
                WHERE syn_movies_genres.movieID = $id";
        $query = $this->_query($sql);
        $data = [];

        while ($row = mysqli_fetch_assoc($query)) {
            array_push($data, $row);
        }

        return $data;
    }

}
