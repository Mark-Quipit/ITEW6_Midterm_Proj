<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentAddress extends Model
{
    protected $table = 'student_address';
    
    protected $fillable = [
        'student_id', 'address_type', 'street', 'barangay', 
        'city', 'province', 'postal_code'
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
