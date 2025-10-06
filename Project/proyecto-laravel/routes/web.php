<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*Route::get('/', function () {
    return redirect()->route('users.index');
});*/
Route::get('/users', [UserController::class, 'index'])->name('users.index');
Route::post('/logout', [UserController::class, 'logout'])->name('logout');
Route::resource('users', UserController::class);


