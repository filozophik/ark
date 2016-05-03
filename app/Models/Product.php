<?php

namespace Ark\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Product extends Model {
    //
   protected $products;

   protected $fillable = [
        'description',
        'gender',
        'category_id',
        'subcategory_id',
        'colors',
        'specifications',
        'price',
        'clearance',
        'updated_at',
        'created_at'
    ];

    public function __construct()
    {
        $this->products =  DB::table('products')
        ->join('categories','products.category_id','=','categories.id')
        ->join('subcategories','products.subcategory_id','=','subcategories.id')
        ->select([
        'categories.name as category','subcategories.name as subcategory',
        'products.id','description','products.gender','pictures','colors',
        'specifications','price','clearance']);
    }

    public function category() {
        return $this->belongsTo('Ark\Models\Category','category_id','id');
    }
    public function subcategory() {
        return $this->hasOne('Ark\Models\Subcategory');
    }
    public function list() {
        $products = $this->products->get();
        foreach ($products as $product) {
            $this->format($product);
        }
        return $products;
    }
    public function one($id) {
        $product = $this->products->where('products.id','=',$id)->first();

        $this->format($product);

        return $product;
    }
    public static function format($product) {
        $product->pictures = explode(',',$product->pictures);
        $product->colors = explode(',',$product->colors);
    }
}
