<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Brand extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'logo'
    ];

    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => ucfirst($value),
            set: fn (?string $value) => strtolower($value),
        );
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
