<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\OrderResource;
use App\Models\Order;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('client', 'products.brand')->latest()->paginate(20);

        return Inertia::render('Order/Index', [
            'orders' => OrderResource::collection($orders),
        ]);
    }

    public function confirm(Order $order)
    {
        $order->update([
            'status' => 'confirmer',
        ]);

        return redirect(route('admin.order.index'))->with('alert', [
            'status' => 'success',
            'message' => 'Commande confirmé avec succés',
        ]);
    }

    public function cancel(Order $order)
    {
        $order->update(([
            'status' => 'annuler',
        ]));

        return redirect(route('admin.order.index'))->with('alert', [
            'status' => 'success',
            'message' => 'Commande annuler avec succés',
        ]);
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return redirect(route('admin.order.index'))->with('alert', [
            'status' => 'success',
            'message' => 'Commande supprimé avec succés',
        ]);
    }
}
