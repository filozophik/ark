<?php

namespace Ark\Http\Controllers\Api;

use Illuminate\Http\Request;
use Ark\Models\Product;
use Ark\Http\Requests;
use Ark\Http\Controllers\Controller;
use Intervention\Image\Facades\Image;


class ProductController extends Controller
{

    protected $product;

    public function __construct(Product $product) {
        $this->product = $product;
    }
    //

    public function index() {
        $products = $this->product->list();
        return response()->json($products);
    }

    public function show($id) {
        return response()->json($this->product->one($id));
    }

    public function destroy($id) {
        $product = Product::find($id);
        $pictures = explode(',',$product->pictures);
        foreach ($pictures as $picture) {
            \File::delete(public_path("/products/{$product->gender}/{$picture}"));
        }
        $product->delete();
        return response()->json(['status'=>'OK','product'=>$product]);
    }

    public function update($id, Request $request) {
        $product = Product::find($id);
        $product->description = $request->description;
        $product->gender = $request->gender;
        $product->category_id = $request->category;
        $product->subcategory_id = $request->subcategory;
        $product->colors = implode(',', $request->colors);
        $product->specifications = nl2br($request->specs);
        $product->price = $request->price;
        $product->clearance = $request->clearance;
        $product->save();
        return response()->json(['status'=>'OK','product'=>$product]);
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

        return response()->json(['status'=>'OK','product'=>$product]);
    }
}
