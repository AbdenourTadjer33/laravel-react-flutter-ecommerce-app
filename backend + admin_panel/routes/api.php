<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;

Route::apiResource('products', ProductController::class)->names('product')->only('index', 'show');
Route::apiResource('brands', BrandController::class)->names('brand')->only('index', 'show');
Route::apiResource('orders', OrderController::class)->names('order')->only('store', 'show');

Route::post('cart', CartController::class)->name('cart');