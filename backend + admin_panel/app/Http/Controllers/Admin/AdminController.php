<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AdminResource;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Index', [
            'admins' => AdminResource::collection(User::paginate())
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=>['required','string'],
            'email' => ['required', 'email'],
            'status' => ['required', 'boolean'],
            'password' => ['required', 'string', 'min:8', 'password'],
        ]);

        User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'status' => $request->input('status'),
            'password' => $request->input('password'),
        ]);

        return redirect(route('admin.admin.index'))->with('alert', [
            'status' => 'success',
            'message' => 'admin créer avec succés'
        ]);
    }

    public function edit(User $user)
    {
        return Inertia::render('Admin/Edit', [
            'admin' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => ['required', 'string'],
            'email' => ['required', 'email'],
            'status' => ['required', 'boolean'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $user->update([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'status' => $request->input('status'),
            'password' => $request->input('password'),
        ]);

        return redirect(route('admin.admin.index'))->with('alert', [
            'status' => 'success',
            'message' => 'admin editer avec succés'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect(route('admin.admin.index'))->with('alert', [
            'status' => 'success',
            'message' => 'admin supprimé avec succés'
        ]);
    }
}
