<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('instructional_material', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subject_id')->constrained('subject')->onDelete('cascade');
            $table->foreignId('faculty_id')->constrained('faculty')->onDelete('cascade');
            $table->string('title');
            $table->string('type'); // syllabus, lesson_plan, module, etc.
            $table->text('description')->nullable();
            $table->string('file_path')->nullable();
            $table->string('school_year');
            $table->string('semester');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('instructional_material');
    }
};
