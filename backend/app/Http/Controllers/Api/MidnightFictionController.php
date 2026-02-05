<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MidnightFiction;
use Illuminate\Http\Request;

class MidnightFictionController extends Controller
{
    /**
     * Get list of workflows.
     */
    public function index()
    {
        return MidnightFiction::latest()->get();
    }

    /**
     * Save a workflow (Create or Update by name).
     */
    public function save(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'nodes' => 'array',
                'edges' => 'array',
            ]);

            $data = [
                'nodes' => $request->nodes ?? [],
                'edges' => $request->edges ?? [],
            ];

            // Update existing if name matches or create new
            $midnightFiction = MidnightFiction::updateOrCreate(
                ['name' => $validated['name']],
                ['data' => $data]
            );

            return response()->json([
                'message' => 'Workflow saved successfully',
                'data' => $midnightFiction
            ]);
        } catch (\Exception $e) {
            // Attempt self-healing if table missing
            if (str_contains($e->getMessage(), 'Base table or view not found') || ! \Illuminate\Support\Facades\Schema::hasTable('midnight_fictions')) {
                try {
                    \Illuminate\Support\Facades\Schema::create('midnight_fictions', function (\Illuminate\Database\Schema\Blueprint $table) {
                        $table->id();
                        $table->string('name');
                        $table->json('data')->nullable(); // Stores nodes and edges
                        $table->timestamps();
                    });

                    // Retry save
                    $midnightFiction = MidnightFiction::updateOrCreate(
                        ['name' => $validated['name']],
                        ['data' => $data]
                    );

                    return response()->json([
                        'message' => 'Workflow saved successfully (after DB repair)',
                        'data' => $midnightFiction
                    ]);
                } catch (\Exception $ex) {
                    \Illuminate\Support\Facades\Log::error('Recovery failed: ' . $ex->getMessage());
                }
            }

            \Illuminate\Support\Facades\Log::error('Midnight Fiction Save Error: ' . $e->getMessage());
            \Illuminate\Support\Facades\Log::error($e->getTraceAsString());

            return response()->json([
                'message' => 'Failed to save workflow',
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }

    /**
     * Get a specific workflow by ID.
     */
    public function show($id)
    {
        return MidnightFiction::findOrFail($id);
    }
}
