<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});



Route::get('reza',function(){
    return "Reza Nik";
});

Route::get('/password',function(){
    return bcrypt('1234567');
});



Route::namespace('\App\Http\Controllers\API')->group(function (){
    Route::post('/login','AuthController@login');
    Route::post('/logout','AuthController@logout')->middleware('check-token');
    Route::get('/user','AuthController@user');
});
Route::get('/test',function (Request $request){
    dd('salam reza');
})->middleware('check-token');



Route::group(['prefix' => 'users'],function (){
    Route::namespace('\App\Http\Controllers\API')->group(function (){
        // Route::middleware('check-token')->get('/','UserController@index');
        Route::middleware('check-token')->get('/','UserController@index');
        Route::get('/general','UserController@general');
        Route::get('/{id}','UserController@show');
        Route::post('/','UserController@store');
        Route::post('/update/{id}','UserController@update');
        Route::get('/login/{id}','UserController@login');
        Route::delete('/{id}','UserController@destroy');
    });
});


Route::group(['prefix' => 'products'],function (){
    Route::namespace('\App\Http\Controllers\API')->group(function (){
        Route::get('/all','ProductController@allProducts');
        Route::get('/','ProductController@index');
        Route::get('/show/{id}','ProductController@show');
        Route::post('/','ProductController@store');
        Route::post('/{id}','ProductController@update');
        Route::delete('/{id}','ProductController@destroy');
    });
});


Route::get('/categories','\App\Http\Controllers\API\ProductController@categories');
Route::get('/cities','\App\Http\Controllers\API\ProductController@cities');
Route::get('/provinces','\App\Http\Controllers\API\ProductController@provinces');


