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

    public function store(Request $request) {

        $product_pics = [];
        $img = null;

        $product = Product::create([
            "description" => $request->description,
            "gender" => $request->gender,
            "category_id" => $request->category,
            "subcategory_id" => $request->subcategory,
            "colors" => implode(',', $request->colors),
            "specifications" => $request->specs,
            "price" => $request->price,
            "clearance" => $request->clearance
        ]);

        //Upload Pictures onto website (requires intervention)
        //Insert all the other things

        foreach ($request->pictures as $key => $picture) {
            $img = Image::make($picture)->fit(240,330)->save(public_path() .
                "/products/{$request->gender}/$request->subcategory" . "_" . $product->id . time() . "_{$key}.jpg");
            array_push($product_pics,$img->basename);
        }
        //dd($product_pics);
        $product->pictures = implode(',',$product_pics);
        $product->save();

        return redirect('product');
    }
}
