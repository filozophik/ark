<?php

namespace Ark\Http\Controllers\Api;
use Ark\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Ark\Models\Category;
use Ark\Http\Requests;

class CategoryController extends Controller
{
    //
    public function index() {
        $query = array(
            'M' => [],
            'F' => []
        );
        $categories = Category::all();
        foreach($categories as $category) {
            $query[$category->gender][$category->id] = [
                'id'=>$category->id,
                'name'=>$category->name,
                'subcategories' => []
            ];

            foreach($category->subcategories as $subcategory) {
                array_push($query[$category->gender][$category->id]['subcategories'],['id'=>$subcategory->id,'name'=>$subcategory->name]);
            }
        }
        return response()->json($query);
    }
}
