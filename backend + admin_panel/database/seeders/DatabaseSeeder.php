<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Brand::factory(5)->create();
        Product::factory(100)->create();

    }
}
