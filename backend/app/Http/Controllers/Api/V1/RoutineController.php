<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Routine;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class RoutineController extends Controller
{
    public function index()
    {
        $routines = Routine::with(['tasks' => function ($query) {
            $query->orderBy('start_time');
        }])->get();

        return response()->json([
            'status' => 'success',
            'data' => $routines,
        ]);
    }

    public function update(Request $request, string $day)
    {
        // 1. Validate Day
        $allowedDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        if (!in_array($day, $allowedDays)) {
            return response()->json(['status' => 'error', 'message' => 'Invalid day'], 400);
        }

        // 2. Find Routine
        $routine = Routine::where('day_of_week', $day)->firstOrFail();

        // 3. Validate Payload
        $validated = $request->validate([
            'tasks' => 'present|array',
            'tasks.*.title' => 'required|string',
            'tasks.*.start_time' => ['required', 'regex:/^[0-9]{2}:[0-9]{2}$/'],
            'tasks.*.duration_minutes' => 'required|integer|min:1',
            'tasks.*.status' => 'required|string', // Pending, etc.
        ]);

        // 4. Sync Strategy: Delete All & Recreate
        // This ensures the backend matches the frontend exactly.

        DB::transaction(function () use ($routine, $validated) {
            $routine->tasks()->delete();

            foreach ($validated['tasks'] as $taskData) {
                $routine->tasks()->create([
                    'title' => $taskData['title'],
                    'notes' => $taskData['notes'] ?? null,
                    'start_time' => $taskData['start_time'],
                    'duration_minutes' => $taskData['duration_minutes'],
                    'status' => $taskData['status'],
                    'requirements' => $taskData['requirements'] ?? [],
                    'dependencies' => $taskData['dependencies'] ?? [],
                ]);
            }
        });

        // 5. Return updated routine
        $updatedRoutine = $routine->fresh('tasks');

        return response()->json([
            'status' => 'success',
            'data' => $updatedRoutine,
        ]);
    }

    public function updateStatus(Request $request, string $id)
    {
        $task = Task::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|string',
        ]);

        $task->update(['status' => $validated['status']]);

        return response()->json([
            'status' => 'success',
            'data' => $task,
        ]);
    }
}
