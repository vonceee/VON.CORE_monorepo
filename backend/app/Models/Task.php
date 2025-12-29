<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'routine_id',
        'title',
        'description',
        'start_time',
        'duration_minutes',
        'status',
        'requirements',
        'dependencies',
    ];

    protected $casts = [
        'requirements' => 'array',
        'dependencies' => 'array',
        'duration_minutes' => 'integer',
    ];

    public function routine()
    {
        return $this->belongsTo(Routine::class);
    }
}
