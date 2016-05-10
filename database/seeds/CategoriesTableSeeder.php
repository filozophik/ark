<?php

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('categories')->delete();


        // Women Categories

        Category::create(['name' => 'Tops'       , 'gender' => 'F']);
        Category::create(['name' => 'Dresses'    , 'gender' => 'F']);
        Category::create(['name' => 'Bottoms'    , 'gender' => 'F']);
        Category::create(['name' => 'Hoodies'    , 'gender' => 'F']);
        Category::create(['name' => 'Swimwear'   , 'gender' => 'F']);
        Category::create(['name' => 'Outerwear'  , 'gender' => 'F']);
        Category::create(['name' => 'Activewear' , 'gender' => 'F']);
        Category::create(['name' => 'Accessories', 'gender' => 'F']);

        // Men Categories

        Category::create(['name' => 'Tops'       , 'gender' => 'M']);
        Category::create(['name' => 'Shirts'     , 'gender' => 'M']);
        Category::create(['name' => 'Bottoms'    , 'gender' => 'M']);
        Category::create(['name' => 'Hoodies'    , 'gender' => 'M']);
        Category::create(['name' => 'Swimwear'   , 'gender' => 'M']);
        Category::create(['name' => 'Outerwear'  , 'gender' => 'M']);
        Category::create(['name' => 'Activewear' , 'gender' => 'M']);
        Category::create(['name' => 'Accessories', 'gender' => 'M']);
    }
}
