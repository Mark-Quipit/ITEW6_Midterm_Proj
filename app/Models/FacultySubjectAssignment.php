<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FacultySubjectAssignment extends Model
{
    protected $table = 'faculty_subject_assignment';
    
    protected $fillable = [
        'faculty_id', 'subject_id', 'school_year', 'semester'
    ];

    public function faculty(): BelongsTo
    {
        return $this->belongsTo(Faculty::class);
    }

    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }
}
