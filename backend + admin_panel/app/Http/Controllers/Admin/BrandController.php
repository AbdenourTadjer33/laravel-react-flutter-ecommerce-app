<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Brand;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Brand\StoreRequest;
use App\Http\Resources\Admin\BrandResource;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Brand/Index', [
            "brands" => BrandResource::collection(Brand::paginate(40)),
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
        Brand::create([
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
    public function edit(Brand $brand)
    {
        return Inertia::render('Brand/Edit', [
            'brand' => $brand,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Brand $brand)
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
    public function destroy(Brand $brand)
    {
        $brand->delete();

        return redirect(route('admin.brand.index'))->with('alert', [
            'status' => 'success',
            'message' => 'brand supprimé avec succés',
        ]);
    }
}
