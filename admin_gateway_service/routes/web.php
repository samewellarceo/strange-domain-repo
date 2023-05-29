<?php

use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\RequestsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->prefix('requests')->group(function () {
    Route::get('/', [RequestsController::class, 'index'])->name('requests');
    Route::get('/{id}', [RequestsController::class, 'show'])->name('request.show');
    Route::patch('/{id}', [RequestsController::class, 'update'])->name('request.update');
    Route::delete('/{id}', [RequestsController::class, 'destroy'])->name('request.delete');
    Route::delete('/', [RequestsController::class, 'destroyAll'])->name('request.delete.all');
});

Route::middleware(['auth', 'verified'])->prefix('admins')->group(function () {
    Route::get('/', [UserController::class, 'index'])->name('admins');
    Route::get('/{id}', [UserController::class, 'show'])->name('admin.show');
    Route::patch('/{id}', [UserController::class, 'update'])->name('admin.update');
    Route::delete('/{id}', [UserController::class, 'destroy'])->name('admin.delete');
});

require __DIR__ . '/auth.php';
