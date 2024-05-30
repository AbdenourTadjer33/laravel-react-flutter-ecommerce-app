<?php

namespace App\Listeners;

use App\Events\NewOrderEvent;
use App\Mail\NewOrderMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendOrderNotification implements ShouldQueue
{
    public function handle(NewOrderEvent $event): void
    {
        Mail::to($event->client->email)->send(new NewOrderMail($event->client, $event->order));
    }
}
