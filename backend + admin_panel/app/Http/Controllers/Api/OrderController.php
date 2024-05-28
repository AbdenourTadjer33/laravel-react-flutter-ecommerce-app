<?php

namespace App\Http\Controllers\Api;

use App\Events\NewOrderEvent;
use App\Models\Order;
use App\Services\CartService;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Order\StoreRequest;
use App\Models\Client;

class OrderController extends Controller
{
    public function store(StoreRequest $request, CartService $cartService)
    {
        [$client, $order] = DB::transaction(function () use ($request, $cartService) {

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

            return [$client, $order];
        });

        event(new NewOrderEvent($client, $order));

        return response()->json([
            'order' => $order
        ]);
    }
}
