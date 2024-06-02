<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Brand;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Brand\StoreRequest;
use App\Http\Resources\Admin\CategoryResource;
use App\Models\Category;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $brands = CategoryResource::collection(Category::withCount('products')->paginate(40));
        return Inertia::render('Brand/Index', [
            'brands' => $brands,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Brand/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        Category::create([
            'name' => $request->input('name'),
            'logo' => $request->input('logo'),
        ]);

        return redirect(route('admin.brand.index'))->with('alert', [
            'status' => 'success',
            'message' => 'Brand créer avec succés',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $brand)
    {
        return Inertia::render('Brand/Edit', [
            'brand' => $brand,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $brand)
    {
        $brand->update([
            'name' => $request->input('name'),
            'logo' => $request->input('logo'),
        ]);

        return redirect(route('admin.brand.index'))->with('alert', [
            'status' => 'success',
            'message' => 'brand modifier avec succés',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $brand)
    {
        $brand->delete();

        return redirect(route('admin.brand.index'))->with('alert', [
            'status' => 'success',
            'message' => 'brand supprimé avec succés',
        ]);
    }
}
