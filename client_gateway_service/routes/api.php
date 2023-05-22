<?php

use App\Http\Controllers\UserRequestController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('requests')->middleware('ipfilter')->group(function () {
    Route::get('/', [UserRequestController::class, 'index']);
    Route::get('/{id}', [UserRequestController::class, 'show']);

    Route::patch('/{id}', [UserRequestController::class, 'update']);

    Route::delete('/{id}', [UserRequestController::class, 'destroy']);
    Route::delete('/', [UserRequestController::class, 'destroyAll']);
});
