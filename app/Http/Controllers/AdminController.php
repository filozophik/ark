<?php

namespace Ark\Http\Controllers;

use Ark\Models\Product;
use Ark\Http\Requests;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Log;


class AdminController extends Controller
{
    //
    public function getProducts($id = null) {
        if($id !== null) {
            try {
                $product = Product::findOrFail($id);
                return view('admin.products.single')->with('product',$product);
            } catch (ModelNotFoundException $e) {
                Log::error($e->getMessage());
                return view('admin.products.index')->with('error',$e->getMessage());
            }
        }
        return view('admin.products.index');
    }
}
