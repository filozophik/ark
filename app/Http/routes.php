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
Route::get('/data', 'DataController@index');
Route::resource('product', 'ProductController');

Route::group(['prefix' => 'api/v1'], function() {
    Route::resource('category','Api\CategoryController');
});