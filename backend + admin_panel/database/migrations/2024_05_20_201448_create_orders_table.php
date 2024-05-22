<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('ref')->unique();
            $table->string('name');
            $table->string('phone', 10);
            $table->string('email');
            $table->float('total');
            $table->enum('status', ['nouvelle commande', 'confirmé', 'annuler', 'en attente'])->default("nouvelle commande");
            $table->string('address');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
