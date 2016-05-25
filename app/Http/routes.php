<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'AngularController@serveApp');
Route::get('/unsupported-browser', 'AngularController@unsupported');
Route::controller('admin', 'AdminController');

Route::group(['prefix' => 'api/v1','middleware'=>'api'], function() {
    Route::resource('category','Api\CategoryController');
    Route::resource('products','Api\ProductController');
});