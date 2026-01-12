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
        // for now, return all trackers.
        // in a real app, we might check if they exist or seed them if empty.
        // but for this user, we assume they might want to persist their config too?
        // the plan says "Create a migration for 'trackers'".
        // the frontend has a DEFAULT_CONFIG.
        // we probably need a way to seed the default config if empty.

        $trackers = Tracker::all();

        // if no trackers exist, we might want to return empty array 
        // and let frontend decide to seed it via a separate endpoint or just use defaults?
        // actually, the prompt says "Replace localStorage logic".
        // if the DB is empty, the frontend will get empty list.
        // we should arguably seed it if empty, OR the user might want to manually add them later.
        // for now, simple return.

        return response()->json($trackers);
    }

    public function history()
    {
        // fetch all logs
        $logs = TrackerLog::all();

        // transform to: Record<DateString, Record<TrackerId, Value>>
        // frontend expects: { "2023-01-01": { "uuid-1": 5, "uuid-2": "WIN" } }

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

    // helper to sync config from frontend (optional but useful)
    public function syncConfig(Request $request)
    {
        $validated = $request->validate([
            'trackers' => 'required|array',
            'trackers.*.id' => 'nullable|uuid', // if new, might not match backend expectation if we force uuid generation on backend
            // ideally frontend sends data, we create/update.
            // but frontend currently has "id" as string (e.g. "hydration"). 
            // our DB uses UUIDs.
            // this is a mismatch.
            // frontend: id="hydration"
            // backend: id=UUID
            // solution: we should probably respect the string IDs if they are unique enough, 
            // OR we rely on the migration to "seed" the initial trackers with known UUIDs or string keys.
            // the user instruction said: "Create a migration for 'trackers' table with: uuid id (primary)".
            // so we MUST use UUIDs.
            // this means existing frontend IDs "hydration", "chess", etc. are NOT valid UUIDs.
            // i need to handle this.
            // 1. either change frontend IDs to UUIDs.
            // 2. or change backend ID to string.
            // the prompt explicitly requested "uuid id (primary)".
            // so i must use UUID.
            // this implies i need to migrate the frontend config to use UUIDs or mapped descriptors.
            // but: "StoreLog" takes "tracker_id".
            // if frontend sends "hydration", it will fail validation.

            // ADJUSTMENT: I will assume I need to seeding the default trackers and return them to frontend.
            // then frontend uses those IDs.
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'type' => 'required|in:counter,outcome',
            'goal' => 'nullable|integer',
            'icon' => 'nullable|string',
            'description' => 'nullable|string',
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
