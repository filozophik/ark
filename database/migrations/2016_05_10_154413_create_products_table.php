<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            //
            $table->bigIncrements('id');
            $table->integer('category_id')->unsigned();
            $table->integer('subcategory_id')->unsigned();
            $table->string('description');
            $table->string('gender');
            $table->string('pictures');
            $table->string('colors');
            $table->double('price',6,2);
            $table->double('clearance',6,2);
        });

        Schema::table('products', function ($table) {
            $table->foreign('category_id')
                ->references('id')->on('categories')
                ->onDelete('cascade');

            $table->foreign('subcategory_id')
                ->references('id')->on('subcategories')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign('products_category_id_foreign');
            $table->dropForeign('products_subcategory_id_foreign');
        });
        Schema::drop('products');
    }
}
