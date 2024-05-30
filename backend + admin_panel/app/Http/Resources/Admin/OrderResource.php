<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'id' => $this->id,
            'ref' => $this->ref,
            'total' => $this->total,
            'status' => $this->status,
            'createdAt' => $this->created_at,
            'client' => [
                'name' => $this->client->name,
                'email' => $this->client->email,
                'phone' => $this->client->phone,
                'address' => $this->client->address,
            ],
            'products' => $this->products->map(function ($product) {
                return [
                    'slug' => $product->slug,
                    'name' => $product->name,
                    'brand' => $product?->brand?->name,
                    'price' => $product->price,
                    'images' => $product->images,
                    'qte' => $product->pivot->qte,
                    'size' => $product->pivot->size,
                    'total' => $product->pivot->total,
                ];
            })
        ];
    }
}
