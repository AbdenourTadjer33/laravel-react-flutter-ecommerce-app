<?php

namespace App\Http\Requests\Api\Order;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'phone' => ['required', 'max:10'],
            'email' => ['required', 'string', 'email'],
            'address' => ['required', 'string'],
            'cart' => ['required', 'array'],
            'cart.*' => ['required', 'array'],
            'cart.*.qte' => ['required', 'numeric'],
            'cart.*.size' => ['required', 'numeric'],
            'cart.*.slug' => ['required', 'string'],
        ];
    }
}
