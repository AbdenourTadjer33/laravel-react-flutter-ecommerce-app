<?php

namespace App\Http\Requests\Admin\Product;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric'],
            'status' => ['required', 'boolean'],
            'sizes' => ['required', 'array', 'min:1'],
            'sizes.*' => ['required', 'numeric'],
            'category_id' => ['required', Rule::exists('categories', 'id')],
            'images' => ['nullable', 'array'],
            'images.*' => ['nullable', 'string', 'url'],
        ];
    }
}
