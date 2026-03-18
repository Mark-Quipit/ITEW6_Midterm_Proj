<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Violation extends Model
{
    protected $table = 'violation';
    
    protected $fillable = [
        'student_id', 'violation_type', 'description', 'date_committed', 'status'
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
