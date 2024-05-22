<?php

use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\DashboardController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\ProductController;

Route::get('/', DashboardController::class)->name('dashboard');
Route::resource('brands', BrandController::class)->names('brand');
Route::resource('products', ProductController::class)->names('product');
Route::resource('orders', OrderController::class)->names('order');
