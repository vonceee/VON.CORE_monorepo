<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NoteFolder extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['name', 'parent_id', 'icon'];

    public function children()
    {
        return $this->hasMany(NoteFolder::class, 'parent_id');
    }

    public function parent()
    {
        return $this->belongsTo(NoteFolder::class, 'parent_id');
    }

    public function notes()
    {
        return $this->hasMany(Note::class, 'folder_id');
    }
}
