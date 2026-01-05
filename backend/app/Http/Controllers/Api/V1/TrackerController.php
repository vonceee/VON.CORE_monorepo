<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Tracker;
use App\Models\TrackerLog;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class TrackerController extends Controller
{
    public function index()
    {
        // For now, return all trackers.
        // In a real app, we might check if they exist or seed them if empty.
        // But for this user, we assume they might want to persist their config too?
        // The plan says "Create a migration for 'trackers'".
        // The frontend has a DEFAULT_CONFIG.
        // We probably need a way to seed the default config if empty.

        $trackers = Tracker::all();

        // If no trackers exist, we might want to return empty array 
        // and let frontend decide to seed it via a separate endpoint or just use defaults?
        // Actually, the prompt says "Replace localStorage logic".
        // If the DB is empty, the frontend will get empty list.
        // We should arguably seed it if empty, OR the user might want to manually add them later.
        // For now, simple return.

        return response()->json($trackers);
    }

    public function history()
    {
        // Fetch all logs
        $logs = TrackerLog::all();

        // Transform to: Record<DateString, Record<TrackerId, Value>>
        // Frontend expects: { "2023-01-01": { "uuid-1": 5, "uuid-2": "WIN" } }

        $history = [];

        foreach ($logs as $log) {
            $date = $log->logged_date->toDateString(); // Y-m-d
            if (!isset($history[$date])) {
                $history[$date] = [];
            }
            $history[$date][$log->tracker_id] = $log->value;
        }

        return response()->json((object)$history);
    }

    public function storeLog(Request $request)
    {
        $validated = $request->validate([
            'tracker_id' => 'required|exists:trackers,id',
            'date' => 'required|date',
            'value' => 'nullable', // value can be null, int, string
        ]);

        try {
            // standardise date
            $date = Carbon::parse($validated['date'])->toDateString();

            // use updateOrCreate
            $log = TrackerLog::updateOrCreate(
                [
                    'tracker_id' => $validated['tracker_id'],
                    'logged_date' => $date,
                ],
                [
                    'value' => $validated['value']
                ]
            );

            return response()->json($log);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }

    // Helper to sync config from frontend (optional but useful)
    public function syncConfig(Request $request)
    {
        $validated = $request->validate([
            'trackers' => 'required|array',
            'trackers.*.id' => 'nullable|uuid', // If new, might not match backend expectation if we force uuid generation on backend
            // Ideally frontend sends data, we create/update.
            // But frontend currently has "id" as string (e.g. "hydration"). 
            // Our DB uses UUIDs.
            // This is a mismatch.
            // Frontend: id="hydration"
            // Backend: id=UUID
            // Solution: We should probably respect the string IDs if they are unique enough, 
            // OR we rely on the migration to "seed" the initial trackers with known UUIDs or string keys.
            // The user instruction said: "Create a migration for 'trackers' table with: uuid id (primary)".
            // So we MUST use UUIDs.
            // This means existing frontend IDs "hydration", "chess", etc. are NOT valid UUIDs.
            // I need to handle this.
            // 1. Either change frontend IDs to UUIDs.
            // 2. Or change backend ID to string.
            // The prompt EXPLICITLY requested "uuid id (primary)".
            // So I must use UUID.
            // This implies I need to migrate the frontend config to use UUIDs or mapped descriptors.
            // BUT: "StoreLog" takes "tracker_id".
            // If frontend sends "hydration", it will fail validation.

            // ADJUSTMENT: I will assume I need to seeding the default trackers and return them to frontend.
            // Then frontend uses those IDs.
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'type' => 'required|in:counter,outcome',
            'goal' => 'nullable|integer',
            'icon' => 'nullable|string',
        ]);

        $tracker = Tracker::create($validated);

        return response()->json($tracker, 201);
    }

    public function destroy($id)
    {
        $tracker = Tracker::findOrFail($id);
        $tracker->delete();

        return response()->json(null, 204);
    }
}
