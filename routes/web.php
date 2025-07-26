<?php

use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::get('/',function(){
    return view('welcome');
});

Route::get('/userall',function(){
    $users =  User::all();
    // dd($users);
    return $users;
});

// Route::get('/password',function(){
//     return bcrypt('1234567');
// });

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



