<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class TrackerLog extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'tracker_id',
        'logged_date',
        'value',
    ];

    protected $casts = [
        'value' => 'json',
        'logged_date' => 'date',
    ];

    public function tracker()
    {
        return $this->belongsTo(Tracker::class);
    }
}
