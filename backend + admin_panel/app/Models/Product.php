<?php

namespace App\Models;

use App\Traits\SlugGenerator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Product extends Model
{
    use HasFactory, SlugGenerator;

    protected static function boot()
    {
        parent::boot();

        static::creating(function (Product $product) {
            $product->slug = $product->generate($product->name);
        });
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    protected $fillable = [
        'slug',
        'name',
        'description',
        'price',
        'status',
        'images',
        'sizes',
        'brand_id',
    ];

    protected function casts(): array
    {
        return [
            'status' => 'boolean',
            'images' => 'array',
            'sizes' => 'array'
        ];
    }


    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => ucfirst($value),
            set: fn (?string $value) => strtolower($value),
        );
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function orders(): BelongsToMany
    {
        return $this->belongsToMany(Order::class)->withPivot(['qte', 'total', 'size']);
    }

    public function scopeActive(Builder $query)
    {
        $query->where('status', true);
    }
}
