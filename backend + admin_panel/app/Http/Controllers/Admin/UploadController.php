<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        if (!$request->has('images') && !$request->has('image')) {
            return response()->json(null, 404);
        }

        return response()->json([
            'path' => $request->has('images') ? $this->saveMany($request->images) : $this->save($request->image)
        ]);
    }

    public function save(UploadedFile $file)
    {
        return Storage::url($file->store('images'));
    }

    public function saveMany(array $images)
    {
        $paths = [];

        foreach ($images as $image) {
            $paths[] = $this->save($image);
        }

        return $paths;
    }

    public function destroy(string $id)
    {
        //
    }
}
