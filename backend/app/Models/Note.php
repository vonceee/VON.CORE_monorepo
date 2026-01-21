<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['folder_id', 'title', 'content', 'tags', 'is_favorite'];

    protected $casts = [
        'tags' => 'array',
        'is_favorite' => 'boolean',
    ];

    public function folder()
    {
        return $this->belongsTo(NoteFolder::class, 'folder_id');
    }
}
