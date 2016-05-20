<?php

namespace Ark\Http\Controllers;

use Illuminate\Http\Request;
use Ark\Models\Product;
use Ark\Http\Requests;
use Intervention\Image\Facades\Image;

class AdminController extends Controller
{
    //
    public function getProductsSingle($id = 0) {
        $product = null;
        if ($id != 0) {
            $product = Product::find($id);
        }
        return view('admin.products.single')
            ->with('product',$product);
    }
    public function getProducts() {
        return view('admin.products.index');
    }
}
