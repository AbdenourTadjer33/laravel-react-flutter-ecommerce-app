<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Product\StoreRequest;
use App\Http\Requests\Admin\Product\UpdateRequest;
use App\Http\Resources\Admin\BrandResource;
use App\Http\Resources\Admin\ProductResource;
use App\Models\Brand;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::withCount('orders')->with('brand')->paginate(10);

        return Inertia::render('Product/Index', [
            'products' => ProductResource::collection($products)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Product/Create', [
            'brands' => BrandResource::collection(Brand::get()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        Product::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'status' => $request->input('status'),
            'images' => $request->input('images'),
            'brand_id' => $request->input('brand'),
            'sizes' => $request->input('sizes'),
        ]);

        return redirect(route('admin.product.index'))->with('alert', [
            'status' => 'success',
            'message' => 'Produit créer avec succés',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Product/Edit', [
            'product' => $product,
            'brands' => BrandResource::collection(Brand::get()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Product $product)
    {
        $product->update([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'status' => $request->input('status'),
            'images' => $request->input('images'),
            'brand_id' => $request->input('brand_id'),
            'sizes' => $request->input('sizes'),
        ]);

        return redirect(route('admin.product.index'))->with('alert', [
            'status' => 'success',
            'message' => 'Produit modifier avec succés',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect(route('admin.product.index'))->with('alert', [
            'status' => 'success',
            'message' => 'Produit supprimé avec succés',
        ]);
    }
}
