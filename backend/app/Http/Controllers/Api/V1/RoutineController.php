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
        // Self-healing: Ensure all days exist
        $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        $missingDays = false;

        foreach ($days as $day) {
            if (Routine::where('day_of_week', $day)->doesntExist()) {
                $missingDays = true;
                $routine = Routine::create([
                    'day_of_week' => $day,
                    'is_active' => true
                ]);
                $this->seedDefaultTasks($routine);
            }
        }

        $routines = Routine::with(['tasks' => function ($query) {
            $query->orderBy('start_time');
        }])->get();

        return response()->json([
            'status' => 'success',
            'data' => $routines,
        ]);
    }

    private function seedDefaultTasks($routine)
    {
        $defaultTasks = [
            [
                'title' => 'Calibration',
                'description' => 'Systems check and focus initialization.',
                'notes' => 'Systems check and focus initialization.',
                'start_time' => '08:00',
                'duration_minutes' => 30,
                'status' => 'PENDING',
                'requirements' => ['Water', 'No Screens'],
                'dependencies' => [],
            ],
            [
                'title' => 'Deep Work A',
                'description' => 'High-leverage engineering or research.',
                'notes' => 'High-leverage engineering or research.',
                'start_time' => '08:30',
                'duration_minutes' => 120,
                'status' => 'PENDING',
                'requirements' => ['Phone locked'],
                'dependencies' => [],
            ],
            [
                'title' => 'Recovery',
                'description' => 'Biological replenishment.',
                'notes' => 'Biological replenishment.',
                'start_time' => '10:30',
                'duration_minutes' => 15,
                'status' => 'PENDING',
                'requirements' => ['Stretch'],
                'dependencies' => [],
            ]
        ];

        foreach ($defaultTasks as $taskData) {
            $routine->tasks()->create([
                'title' => $taskData['title'],
                'notes' => $taskData['notes'],
                'start_time' => $taskData['start_time'],
                'duration_minutes' => $taskData['duration_minutes'],
                'status' => $taskData['status'],
                'requirements' => $taskData['requirements'],
                'dependencies' => $taskData['dependencies'],
            ]);
        }
    }

    public function update(Request $request, string $day)
    {
        // 1. Validate Day
        $allowedDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        if (!in_array($day, $allowedDays)) {
            return response()->json(['status' => 'error', 'message' => 'Invalid day'], 400);
        }

        // 2. Find or Create Routine
        $routine = Routine::firstOrCreate(
            ['day_of_week' => $day],
            ['is_active' => true]
        );

        // 3. Validate Payload
        $validated = $request->validate([
            'tasks' => 'present|array',
            'tasks.*.title' => 'required|string',
            'tasks.*.start_time' => ['required', 'regex:/^[0-9]{2}:[0-9]{2}$/'],
            'tasks.*.duration_minutes' => 'required|integer|min:1',
            'tasks.*.status' => 'required|string',
            'tasks.*.notes' => 'nullable|string',
            'tasks.*.requirements' => 'nullable|array',
            'tasks.*.dependencies' => 'nullable|array',
        ]);

        // 4. Sync Strategy: Delete All & Recreate
        // this ensures the backend matches the frontend exactly.

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

        // 5. return updated routine
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
