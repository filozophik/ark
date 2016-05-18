<?php

namespace Ark\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    //
    protected $fillable = ['name','gender'];
    public $timestamps = false;

    public function subcategories()
    {
        return $this->hasMany('Ark\Models\Subcategory');
    }

    public function products() {
        return $this->hasMany('Ark\Models\Product');
    }

}
