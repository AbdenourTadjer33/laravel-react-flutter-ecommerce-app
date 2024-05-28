<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Services\CartService;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Client;

$arr = [
    'products' => []
];

class OrderController extends Controller
{
    public function store(Request $request, CartService $cartService)
    {
        $request->validate([
            'name' => ['required', 'string'],
            'phone' => ['required', 'max:10'],
            'email' => ['required', 'string'],
            'address' => ['required', 'string'],
            'cart' => ['required', 'array'],
            'cart.*' => ['required', 'array'],
            'cart.*.qte' => ['required', 'numeric'],
            'cart.*.size' => ['required', 'numeric'],
            'cart.*.slug' => ['required', 'string'],
        ]);

        $order = DB::transaction(function () use ($request, $cartService) {

            /** @var Client */
            $client = Client::create([
                'name' => $request->input('name'),
                'phone' => $request->input('phone'),
                'email' => $request->input('email'),
                'address' => $request->input('address'),
            ]);

            /** @var Order */
            $order = $client->orders()->create([
                'total' => $cartService->totalCart(),
            ]);

            foreach ($cartService->cart() as $item) {
                $order->products()->attach($item['id'], collect($item)->only(['qte', 'size', 'total'])->toArray());
            }

            return $order;
        });

        return response()->json([
            'order' => $order
        ]);
    }
}
