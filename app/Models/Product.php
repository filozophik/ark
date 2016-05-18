<?php

namespace Ark\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Product extends Model {
    //
   protected $products;
    protected $guarded = ['id'];

    public function __construct()
    {
        $this->products =  DB::table('products')
        ->join('categories','products.category_id','=','categories.id')
        ->join('subcategories','products.subcategory_id','=','subcategories.id');
    }

    public function category() {
        return $this->belongsTo('Ark\Models\Category','category_id','id');
    }
    public function subcategory() {
        return $this->hasOne('Ark\Models\Subcategory');
    }
    public function list() {
        $products = $this->products->select([
            'products.id',
            'categories.name as category',
            'subcategories.name as subcategory',
            'description',
            'products.gender',
            'pictures',
            'colors',
            'specifications',
            'price',
            'clearance'
        ])->get();
        foreach ($products as $product) {
            $product->pictures = explode(',',$product->pictures);
            $product->colors = explode(',',$product->colors);
        }
        return $products;
    }
}
