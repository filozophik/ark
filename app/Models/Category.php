<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    //
    protected $fillable = ['name','gender'];
    public $timestamps = false;

    public function subcategories()
    {
        return $this->hasMany('App\Models\Subcategory');
    }

}
