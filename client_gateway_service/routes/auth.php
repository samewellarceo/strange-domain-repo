<?php

use App\Http\Controllers\UserRequestController;
use Illuminate\Support\Facades\Route;


Route::get('registration', [UserRequestController::class, 'create'])
    ->name('registration');

Route::get('new-ip', [UserRequestController::class, 'create'])
    ->name('new-ip');

Route::post('registration', [UserRequestController::class, 'store']);
Route::post('new-ip', [UserRequestController::class, 'store']);
