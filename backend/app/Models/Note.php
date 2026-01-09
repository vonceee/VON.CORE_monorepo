<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['folder_id', 'title', 'content', 'tags'];

    protected $casts = [
        'tags' => 'array',
    ];

    public function folder()
    {
        return $this->belongsTo(NoteFolder::class, 'folder_id');
    }
}
