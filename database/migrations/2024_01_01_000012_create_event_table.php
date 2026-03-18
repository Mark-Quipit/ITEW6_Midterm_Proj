<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('event', function (Blueprint $table) {
            $table->id();
            $table->string('event_name');
            $table->string('event_type')->nullable();
            $table->text('description')->nullable();
            $table->dateTime('event_date')->nullable();
            $table->string('venue')->nullable();
            $table->foreignId('assigned_faculty_id')->nullable()->constrained('faculty')->onDelete('set null');
            $table->string('status')->default('upcoming');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('event');
    }
};
