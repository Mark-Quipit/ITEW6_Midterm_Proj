<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Department extends Model
{
    protected $table = 'department';
    
    protected $fillable = [
        'department_code', 'department_name', 'campus_id'
    ];

    public function faculty(): HasMany
    {
        return $this->hasMany(Faculty::class);
    }

    public function subjects(): HasMany
    {
        return $this->hasMany(Subject::class);
    }
}
