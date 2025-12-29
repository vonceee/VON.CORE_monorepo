<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'service' => 'laravel-backend'
    ]);
});

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
