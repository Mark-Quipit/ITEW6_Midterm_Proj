<?php

use Illuminate\Support\Facades\Route;

// Placeholder auth routes - implement as needed
Route::post('/logout', function () {
    auth()->logout();
    return redirect('/');
})->name('logout');
