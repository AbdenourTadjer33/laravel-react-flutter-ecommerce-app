<?php

use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\UploadController;

Route::get('/', DashboardController::class)->name('dashboard');
Route::resource('brands', BrandController::class)->names('brand');
Route::resource('products', ProductController::class)->names('product');
Route::resource('orders', OrderController::class)->names('order');

Route::resource('upload', UploadController::class)
    ->names('upload')
    ->only('store', 'destroy')
    ->where(['upload' => '.*']);

Route::get('/test/{str}', function ($str) {
    return $str;
});
