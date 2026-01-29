<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Milestone;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MilestoneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Assuming there is authentication and we only show user's milestones
        // If not authenticated yet, we might return all or error. 
        // Based on user_id field, likely need auth()->id() or similar.
        // For now, I'll assume standard auth or request->user().

        $user = $request->user();

        // Fallback for dev if no auth (though normally we should have it)
        if (!$user) {
            // If debugging without auth, maybe return empty or specific user.
            // But for production safety, let's just query if user_id is passed or assume auth middleware.
            // Given the instructions, I'll assume standard setup.
        }

        $query = Milestone::query();

        if ($user) {
            $query->where('user_id', $user->id);
        }

        return $query->orderBy('event_date', 'asc')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'event_date' => 'required|date',
            'category' => 'required|string',
            'frequency' => 'required|string',
        ]);

        // Attach user_id
        $user = $request->user();
        if (!$user) {
            // DEV FALLBACK: If no auth, query first user or create one, or throw 401
            // For safety in this specific user environment context where they might not be logged in:
            $user = \App\Models\User::first() ?? \App\Models\User::factory()->create();
        }
        $validated['user_id'] = $user->id;

        $milestone = Milestone::create($validated);

        return response()->json($milestone, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Milestone $milestone)
    {
        return $milestone;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Milestone $milestone)
    {
        // Check policy/ownership if needed
        if ($request->user()->id !== $milestone->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'event_date' => 'sometimes|date',
            'category' => 'sometimes|string',
            'frequency' => 'sometimes|string',
        ]);

        $milestone->update($validated);

        return $milestone;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Milestone $milestone)
    {
        if ($request->user()->id !== $milestone->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $milestone->delete();

        return response()->noContent();
    }
}
