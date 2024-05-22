<?php

namespace Database\Factories;

use App\Models\Brand;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'description' => fake()->text(),
            'price' => rand(1000, 10000),
            'status' => rand(0, 1),
            'sizes' => ["40", "41"],
            "brand_id" => Brand::all()->random()->id,
        ];
    }
}
