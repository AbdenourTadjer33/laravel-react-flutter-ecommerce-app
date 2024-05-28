<?php

namespace App\Events;

use App\Models\Client;
use App\Models\Order;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewOrderEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $client;
    public $order;

    public function __construct(Client $client, Order $order)
    {
        $this->client = $client;
        $this->order = $order;
    }
}
