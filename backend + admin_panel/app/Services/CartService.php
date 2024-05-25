<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Request;


class CartService
{

    protected $cart = [];

    public function __construct()
    {
        $this->initCart(Request::input('cart'));
    }

    /**
     * Create a new class instance.
     */

    protected function initCart($items)
    {
        $slugs = collect($items)->pluck("slug")->toArray();

        $products = Product::active()
            ->whereIn('slug', $slugs)
            ->get();

        $this->cart = $products->map(function ($product) use ($items) {
            $item = collect($items)->firstWhere('slug', $product->slug);
            return [
                ...collect($product)->only('id', 'slug', 'name', 'price', 'images')->toArray(),
                'size' => $item['size'] ?? null,
                'qte' => $item['qte'],
                'total' => $item['qte'] * $product['price'],
            ];
        })->toArray();
    }

    public function cart()
    {
        return $this->cart;
    }

    public function totalCart()
    {
        $total = 0;

        foreach ($this->cart as $item) {
            $total += $item['price'] * $item['qte'];
        }

        return $total;
    }

    public function totalItem($item)
    {
        return $item['price'] * $item['qte'];
    }

    public function toAttach()
    {
        return collect($this->cart)->map(function ($item) {
            return [
                'id' => $item['id'],
                'size' => $item['size'],
                'qte' => $item['qte'],
                'total' => $item['qte'] * $item['price'],
            ];
        })->toArray();
    }
}
