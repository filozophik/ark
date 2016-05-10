<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Requests;

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
            $query[$category->gender][$category->name] = [];

            foreach($category->subcategories as $subcategory) {
                array_push($query[$category->gender][$category->name],$subcategory->name);
            }
        }
        return response()->json($query);
    }
}
