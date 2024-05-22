<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\CartService;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(CartService $cartService)
    {
        return $cartService->cart();
    }
}
