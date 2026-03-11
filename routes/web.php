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

// Dashboard
Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

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

// Scheduling Routes
Route::get('/scheduling', [Modules\Scheduling\SchedulingController::class, 'index'])->name('scheduling.index');
Route::get('/scheduling/faculty/{id}', [Modules\Scheduling\SchedulingController::class, 'byFaculty'])->name('scheduling.faculty');
Route::get('/scheduling/section/{section}', [Modules\Scheduling\SchedulingController::class, 'bySection'])->name('scheduling.section');

// Instructional Routes
Route::get('/instructional', [Modules\Instructional\InstructionalController::class, 'index'])->name('instructional.index');
Route::get('/instructional/subject/{id}', [Modules\Instructional\InstructionalController::class, 'bySubject'])->name('instructional.subject');

require __DIR__.'/auth.php';
