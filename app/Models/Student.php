<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Student extends Model
{
    protected $table = 'student';
    
    protected $fillable = [
        'student_id', 'first_name', 'middle_name', 'last_name',
        'email', 'phone', 'birth_date', 'gender', 'program',
        'year_level', 'section', 'status'
    ];

    public function addresses(): HasMany
    {
        return $this->hasMany(StudentAddress::class);
    }

    public function academicRecords(): HasMany
    {
        return $this->hasMany(AcademicRecord::class);
    }

    public function awards(): HasMany
    {
        return $this->hasMany(AcademicAward::class);
    }

    public function violations(): HasMany
    {
        return $this->hasMany(Violation::class);
    }
}
