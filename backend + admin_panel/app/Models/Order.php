<?php

namespace App\Models;

use App\Traits\Traits\RefGenerator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Order extends Model
{
    use HasFactory, RefGenerator;

    protected static function boot()
    {
        parent::boot();

        static::creating(function (Order $order) {
            $order->ref = $order->generateRef();
        });
    }

    protected $fillable = [
        'ref',
        'name',
        'phone',
        'email',
        'address',
        'total',
        'status',
    ];

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class)->withPivot(['qte', 'total', 'size']);
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
