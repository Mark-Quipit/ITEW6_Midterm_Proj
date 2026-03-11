<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AcademicAward extends Model
{
    protected $table = 'academic_award';
    
    protected $fillable = [
        'student_id', 'award_name', 'date_received', 'description'
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
