<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FacultyTraining extends Model
{
    protected $table = 'faculty_training';
    
    protected $fillable = [
        'faculty_id', 'training_name', 'provider', 'date_completed', 'certificate_url'
    ];

    public function faculty(): BelongsTo
    {
        return $this->belongsTo(Faculty::class);
    }
}
