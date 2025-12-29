<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\SystemLog;
use Illuminate\Http\Request;

class SystemLogController extends Controller
{
    public function index()
    {
        $logs = SystemLog::orderBy('created_at', 'desc')->take(50)->get();

        return response()->json([
            'status' => 'success',
            'data' => $logs,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'level' => 'required|string|in:INFO,WARN,ERROR,SUCCESS',
            'message' => 'required|string',
        ]);

        $log = SystemLog::create($validated);

        return response()->json([
            'status' => 'success',
            'data' => $log,
        ]);
    }
}
