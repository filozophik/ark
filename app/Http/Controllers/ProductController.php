<?php

namespace Ark\Http\Controllers;

use Illuminate\Http\Request;
use Ark\Models\Product;
use Ark\Http\Requests;

class ProductController extends Controller
{
    //
    public function index() {
        return view('admin.products.index');
    }

    public function store(Request $request) {
//        dd($request);
        //Upload Pictures onto website (requires intervention)
        //Insert all the other things
        Product::create([
            "description" => $request->description,
            "gender" => $request->gender,
            "category_id" => $request->category,
            "subcategory_id" => $request->subcategory,
            "colors" => implode(',', $request->colors),
            "specifications" => $request->specs,
            "price" => $request->price,
            "clearance" => $request->clearance
        ]);

        redirect()->route('product');
    }
}
