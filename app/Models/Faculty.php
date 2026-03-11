<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Faculty extends Model
{
    protected $table = 'faculty';
    
    protected $fillable = [
        'faculty_id', 'first_name', 'middle_name', 'last_name',
        'email', 'phone', 'department_id', 'specialization',
        'employment_status'
    ];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function trainings(): HasMany
    {
        return $this->hasMany(FacultyTraining::class);
    }

    public function subjectAssignments(): HasMany
    {
        return $this->hasMany(FacultySubjectAssignment::class);
    }
}
