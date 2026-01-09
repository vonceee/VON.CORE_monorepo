<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\NoteFolder;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function tree()
    {
        $folders = NoteFolder::with(['children', 'notes'])->whereNull('parent_id')->get();
        // Also get root notes
        $rootNotes = Note::whereNull('folder_id')->get();

        return response()->json([
            'folders' => $this->formatTree($folders),
            'rootNotes' => $rootNotes
        ]);
    }

    private function formatTree($folders)
    {
        return $folders->map(function ($folder) {
            return [
                'id' => $folder->id,
                'name' => $folder->name,
                'type' => 'folder',
                'parent_id' => $folder->parent_id,
                'children' => $this->formatTree($folder->children),
                'notes' => $folder->notes,
                'isOpen' => false, // Default state for frontend
            ];
        });
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'folder_id' => 'nullable|exists:note_folders,id',
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'tags' => 'nullable|array',
        ]);

        $note = Note::create($validated);

        return response()->json($note, 201);
    }

    public function update(Request $request, Note $note)
    {
        $validated = $request->validate([
            'folder_id' => 'nullable|exists:note_folders,id',
            'title' => 'sometimes|required|string|max:255',
            'content' => 'nullable|string',
            'tags' => 'nullable|array',
        ]);

        $note->update($validated);

        return response()->json($note);
    }

    public function destroy(Note $note)
    {
        $note->delete();
        return response()->json(null, 204);
    }

    public function folderStore(Request $request)
    {
        $validated = $request->validate([
            'parent_id' => 'nullable|exists:note_folders,id',
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string',
        ]);

        $folder = NoteFolder::create($validated);

        return response()->json($folder, 201);
    }

    public function folderUpdate(Request $request, NoteFolder $folder)
    {
        $validated = $request->validate([
            'parent_id' => 'nullable|exists:note_folders,id',
            'name' => 'sometimes|required|string|max:255',
            'icon' => 'nullable|string',
        ]);

        $folder->update($validated);

        return response()->json($folder);
    }

    public function folderDestroy(NoteFolder $folder)
    {
        $folder->delete();
        return response()->json(null, 204);
    }
}
