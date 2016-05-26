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

                $entity = [
                    'id'=>$subcategory->id,
                    'name'=>$subcategory->name,
                    'path' => implode('/',[$category->gender,$category->name,$subcategory->name])
                ];
                array_push($query[$category->gender][$category->id]['subcategories'],$entity);
            }
        }

        return response()->json($query);
    }

    public function show($id = null) {
        $query = [];
        $categories = Category::all();
        foreach($categories as $category) {
            $entity = [
                'name'=>($category->gender == 'M' ? "Men's $category->name" : "Women's $category->name"),
                'path' => implode('/',[$category->gender,$category->name])
            ];
            array_push($query,$entity);

            foreach($category->subcategories as $subcategory) {
                $entity = [
                    'id'=>$subcategory->id,
                    'name'=>($category->gender == 'M' ? "Men's $subcategory->name" : "Women's $subcategory->name"),
                    'path' => implode('/',[$category->gender,$category->name,$subcategory->name])
                ];
                array_push($query,$entity);
            }
        }
        return response()->json($query);
    }
}
