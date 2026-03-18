<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('faculty_subject_assignment', function (Blueprint $table) {
            $table->id();
            $table->foreignId('faculty_id')->constrained('faculty')->onDelete('cascade');
            $table->foreignId('subject_id')->constrained('subject')->onDelete('cascade');
            $table->string('school_year');
            $table->string('semester');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('faculty_subject_assignment');
    }
};
