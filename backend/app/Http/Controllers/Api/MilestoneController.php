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
        return Milestone::orderBy('event_date', 'asc')->get();
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

        // Default to first user since auth is removed
        $user = \App\Models\User::first() ?? \App\Models\User::factory()->create();
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
        $milestone->delete();

        return response()->noContent();
    }
}
