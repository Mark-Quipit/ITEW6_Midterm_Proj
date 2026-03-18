<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('research', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('authors')->nullable();
            $table->string('program')->nullable();
            $table->integer('year_published')->nullable();
            $table->string('category')->nullable();
            $table->decimal('evaluation_score', 5, 2)->nullable();
            $table->text('abstract')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('research');
    }
};
