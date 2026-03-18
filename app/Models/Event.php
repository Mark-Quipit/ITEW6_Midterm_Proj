<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'event';
    
    protected $fillable = [
        'event_name', 'event_type', 'description', 'event_date',
        'venue', 'assigned_faculty_id', 'status'
    ];
}
