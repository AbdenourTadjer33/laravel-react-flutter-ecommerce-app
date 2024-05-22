<?php

namespace App\Traits;

use Nette\Utils\Random;
use Illuminate\Support\Str;

trait SlugGenerator
{
    protected static function generate(string $toSlugify, string $col = 'slug'): string
    {
        $slug = Str::slug($toSlugify);

        if (!static::where($col, $slug)->select($col)->first()) return $slug;

        do {
            $slug = Str::slug(Random::generate(4, '0-9') . ' ' . $toSlugify);
        } while (static::where($col, $slug)->first());

        return $slug;
    }
}
