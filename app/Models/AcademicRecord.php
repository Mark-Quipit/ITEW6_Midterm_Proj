<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AcademicRecord extends Model
{
    protected $table = 'academic_record';
    
    protected $fillable = [
        'student_id', 'school_year', 'semester', 'gpa', 'units_earned'
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
