<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Routine;
use App\Models\Task;

class RoutineSeeder extends Seeder
{
    public function run(): void
    {
        $days = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ];

        $defaultTasks = [
            [
                'title' => 'Calibration',
                'description' => 'Systems check and focus initialization.',
                'start_time' => '08:00',
                'duration_minutes' => 30,
                'status' => 'PENDING',
                'requirements' => ['Water', 'No Screens'],
                'dependencies' => [],
            ],
            [
                'title' => 'Deep Work A',
                'description' => 'High-leverage engineering or research.',
                'start_time' => '08:30',
                'duration_minutes' => 120,
                'status' => 'PENDING',
                'requirements' => ['Phone locked'],
                'dependencies' => [],
            ],
            [
                'title' => 'Recovery',
                'description' => 'Biological replenishment.',
                'start_time' => '10:30',
                'duration_minutes' => 15,
                'status' => 'PENDING',
                'requirements' => ['Stretch'],
                'dependencies' => [],
            ]
        ];

        foreach ($days as $day) {
            $routine = Routine::create([
                'day_of_week' => $day,
                'is_active' => true,
            ]);

            foreach ($defaultTasks as $taskData) {
                $routine->tasks()->create($taskData);
            }
        }
    }
}
