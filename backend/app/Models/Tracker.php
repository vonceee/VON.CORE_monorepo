<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Tracker extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'label',
        'type',
        'goal',
        'icon',
        'description',
    ];

    public function logs()
    {
        return $this->hasMany(TrackerLog::class);
    }
}
