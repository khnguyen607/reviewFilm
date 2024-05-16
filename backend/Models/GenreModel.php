<?php

class GenreModel extends BaseModel
{
    const TABLE = 'genres';

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
}
