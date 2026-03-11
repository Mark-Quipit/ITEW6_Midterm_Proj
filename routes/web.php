<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Modules\Students\StudentController;
use Modules\Faculty\FacultyController;
use Modules\Events\EventController;
use Modules\Research\ResearchController;

Route::get('/', function () {
    return redirect('/dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Student Routes
    Route::get('/students', [StudentController::class, 'index'])->name('students.index');
    Route::get('/students/{id}', [StudentController::class, 'show'])->name('students.show');

    // Faculty Routes
    Route::get('/faculty', [FacultyController::class, 'index'])->name('faculty.index');
    Route::get('/faculty/{id}', [FacultyController::class, 'show'])->name('faculty.show');

    // Event Routes
    Route::get('/events', [EventController::class, 'index'])->name('events.index');

    // Research Routes
    Route::get('/research', [ResearchController::class, 'index'])->name('research.index');

    // Scheduling Routes (placeholder)
    Route::get('/scheduling', function () {
        return Inertia::render('scheduling/SchedulingIndex');
    })->name('scheduling.index');

    // Instructional Routes (placeholder)
    Route::get('/instructional', function () {
        return Inertia::render('instructional/InstructionalIndex');
    })->name('instructional.index');
});

require __DIR__.'/auth.php';
