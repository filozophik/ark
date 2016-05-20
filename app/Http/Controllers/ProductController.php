<?php

namespace Ark\Http\Controllers;

use Illuminate\Http\Request;
use Ark\Models\Product;
use Ark\Http\Requests;
use Intervention\Image\Facades\Image;

class ProductController extends Controller
{
    //
    public function index() {
        return view('admin.products.index');
    }

    public function store(Request $request) {

        $product_pics = [];
        $img = null;

        $product = new Product();
        $product->description = $request->description;
        $product->gender = $request->gender;
        $product->category_id = $request->category;
        $product->subcategory_id = $request->subcategory;
        $product->colors = implode(',', $request->colors);
        $product->specifications = nl2br($request->specs);
        $product->price = $request->price;
        $product->clearance = $request->clearance;
        $product->save();

        //Upload Pictures onto website (requires intervention)
        //Insert all the other things
        foreach ($request->pictures as $key => $picture) {
            $img = Image::make($picture)->fit(364,500)->save(public_path() .
                "/products/{$request->gender}/$request->subcategory" . "_" . $product->id . time() . "_{$key}.jpg");
            array_push($product_pics,$img->basename);
        }
        //dd($product_pics);
        $product->pictures = implode(',',$product_pics);

        $product->save();

        return redirect('product');
    }
}
