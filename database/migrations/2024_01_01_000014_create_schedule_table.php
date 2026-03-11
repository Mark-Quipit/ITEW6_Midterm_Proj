<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('schedule', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subject_id')->constrained('subject')->onDelete('cascade');
            $table->foreignId('faculty_id')->constrained('faculty')->onDelete('cascade');
            $table->string('school_year');
            $table->string('semester');
            $table->string('section');
            $table->string('day_of_week');
            $table->time('start_time');
            $table->time('end_time');
            $table->string('room')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('schedule');
    }
};
