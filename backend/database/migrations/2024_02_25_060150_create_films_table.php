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
        Schema::create('films', function (Blueprint $table) {
            $table->id();
            $table->text('title')->nullable();
            $table->text('description');
            $table->text('url_img');
            $table->integer('duration')->nullable();
            $table->string('country', 50)->nullable();
            $table->string('bg_color', 30)->default('#caff85');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('films');
    }
};
