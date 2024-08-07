<?php

use App\Models\User;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\UploadController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\DashboardController;

Route::get('/', DashboardController::class)->name('dashboard');

Route::model('admin', User::class);
Route::resource('admin', AdminController::class)->names('admin');

Route::resource('categories', CategoryController::class)->names('category');

Route::post('/products/{product:slug}/active', [ProductController::class, 'active'])->name('product.active');
Route::post('product/{product:slug}/disable', [ProductController::class, 'disable'])->name('product.disable');
Route::resource('products', ProductController::class)->names('product');

Route::post('/orders/{order:ref}/confirm/', [OrderController::class, 'confirm'])->name('order.confirm');
Route::post('/orders/{order:ref}/cancel/', [OrderController::class, 'cancel'])->name('order.cancel');
Route::resource('orders', OrderController::class)->names('order')->only('index', 'destroy');

Route::resource('upload', UploadController::class)
    ->names('upload')
    ->only('store', 'destroy')
    ->where(['upload' => '.*']);

Route::get('/test/{str}', function ($str) {
    return $str;
});
