<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OrderController extends Controller
{
    public function index()
    {
        return Inertia::render('Order/Index');
    }

    public function confirm()
    {
        return redirect(route('admin.order.index'));
    }

    public function refuse()
    {
        return redirect(route('admin.order.index'));
    }

    public function delete()
    {
        return redirect(route('admin.order.index'));
    }
}
