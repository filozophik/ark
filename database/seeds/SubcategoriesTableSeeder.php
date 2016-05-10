<?php

use Illuminate\Database\Seeder;
use App\Models\Subcategory;
use App\Models\Category;

class SubcategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('subcategories')->delete();

        $men = [
            'Tops' => [
                'T-Shirts',
                'Long Sleeves',
                'Tank Tops',
                'Polos'
            ],
            'Shirts' => [
                'Long Sleeve',
                'Short Sleeve',
            ],
            'Bottoms' => [
                'Pants',
                'Shorts',
                'Jeans',
            ],
            'Hoodies' => [
                'Hoodies'
            ],
            'Swimwear' => [
                'Swimwear'
            ],
            'Outerwear' => [
                'Waistcoats',
                'Jackets',
                'Blazers',
                'Cardigans'
            ],
            'Activewear' => [
                'Shorts',
                'Tops',
                'Pants',
                'Outfits'
            ],
            'Accessories' => [
                'Hats',
                'Belts',
                'Gloves'
            ]
        ];
        $women = [
            'Tops' => [
                'T-Shirts',
                'Long Sleeves',
                'Tank Tops',
                'Crop Tops',
                'Blouses'
            ],
            'Dresses' => [
                'Summer Dresses',
                'Printed Dresses',
                'Chiffon Dresses',
                'Two Piece Dresses'
            ],
            'Bottoms' => [
                'Pants',
                'Shorts',
                'Leggings',
                'Skirts',
                'Jeans',
                'Jumpsuits'
            ],
            'Hoodies' => [
                'Hoodies'
            ],
            'Swimwear' => [
                'Bikinis',
                'One Piece',
            ],
            'Outerwear' => [
                'Waistcoats',
                'Jackets',
                'Blazers',
                'Sweaters'
            ],
            'Activewear' => [
                'Shorts',
                'Tops',
                'Pants',
                'Outfits'
            ],
            'Accessories' => [
                'Hats',
                'Belts',
                'Gloves'
            ]
        ];
        
        $categories = Category::all();
        
        foreach ($categories as $category) {
            if ($category->gender == 'F') {
                foreach($women[$category->name] as $subcategory) {
                    echo "Writing Women's $subcategory ...";
                    Subcategory::create(['category_id' => $category->id, 'name' => $subcategory]);
                    echo "Done!\n";
                }
            } elseif ($category->gender == 'M') {
                foreach($men[$category->name] as $subcategory) {
                    echo "Writing Men's $subcategory ...";
                    Subcategory::create(['category_id' => $category->id, 'name' => $subcategory]);
                    echo "Done!\n";
                }
            }
        }
    }
}
