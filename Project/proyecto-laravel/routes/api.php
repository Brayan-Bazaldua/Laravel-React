<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\UserApiController;

Route::get('/users', [UserApiController::class, 'index']);

Route::post('/login', [AuthController::class, 'login']);
