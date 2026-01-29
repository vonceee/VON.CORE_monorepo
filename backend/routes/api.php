<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

// Route::get('/health', function () {
//     return response()->json([
//         'status' => 'ok',
//         'service' => 'laravel-backend'
//     ]);
// });

Route::get('/posts', [PostController::class, 'index']);
Route::post('/posts', [PostController::class, 'store']);

use App\Http\Controllers\Api\V1\RoutineController;
use App\Http\Controllers\Api\V1\SystemLogController;

Route::prefix('v1/not-cute-anymore')->group(function () {
    Route::get('/routines', [RoutineController::class, 'index']);
    Route::put('/routines/{day}', [RoutineController::class, 'update']);
    Route::patch('/tasks/{id}/status', [RoutineController::class, 'updateStatus']);

    Route::get('/logs', [SystemLogController::class, 'index']);
    Route::post('/logs', [SystemLogController::class, 'store']);
});

use App\Http\Controllers\Api\V1\TrackerController;

Route::prefix('v1/not-me')->group(function () {
    Route::get('/trackers', [TrackerController::class, 'index']);
    Route::post('/trackers', [TrackerController::class, 'store']);
    Route::get('/history', [TrackerController::class, 'history']);
    Route::post('/log', [TrackerController::class, 'storeLog']);
    Route::delete('/trackers/{id}', [TrackerController::class, 'destroy']);
});

use App\Http\Controllers\NoteController;

Route::prefix('v1/my-world')->group(function () {
    Route::get('/tree', [NoteController::class, 'tree']);
    Route::post('/notes', [NoteController::class, 'store']);
    Route::patch('/notes/{note}', [NoteController::class, 'update']);
    Route::delete('/notes/{note}', [NoteController::class, 'destroy']);

    Route::post('/folders', [NoteController::class, 'folderStore']);
    Route::patch('/folders/{folder}', [NoteController::class, 'folderUpdate']);
    Route::delete('/folders/{folder}', [NoteController::class, 'folderDestroy']);
});

use App\Http\Controllers\Api\MilestoneController;

Route::prefix('v1/magnetic')->group(function () {
    Route::get('/milestones', [MilestoneController::class, 'index']);
    Route::post('/milestones', [MilestoneController::class, 'store']);
    Route::patch('/milestones/{milestone}', [MilestoneController::class, 'update']);
    Route::delete('/milestones/{milestone}', [MilestoneController::class, 'destroy']);
});
