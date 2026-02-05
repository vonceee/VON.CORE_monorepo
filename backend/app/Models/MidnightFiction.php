<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MidnightFiction extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'data'];

    protected $casts = [
        'data' => 'array',
    ];
}
