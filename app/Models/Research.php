<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Research extends Model
{
    protected $table = 'research';
    
    protected $fillable = [
        'title', 'authors', 'program', 'year_published',
        'category', 'evaluation_score', 'abstract'
    ];
}
