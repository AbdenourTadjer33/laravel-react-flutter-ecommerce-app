<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        return Inertia::render('Dashboard', [
            'statistics' => [
                'order' => [
                    'new' => Order::newOrder()->count(),
                    'confirmed' => Order::confirmedOrder()->count(),
                    'cancled' => Order::cancledOrder()->count(),
                ],
                'product' => [
                    'active' => Product::active()->count(),
                    'disabled' => Product::disabled()->count(),
                ]
            ],
        ]);
    }
}
