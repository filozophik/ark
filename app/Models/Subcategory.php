<?php

namespace Ark\Models;

use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    //
    public $timestamps = false;
    protected $fillable = ['category_id','name'];
}
