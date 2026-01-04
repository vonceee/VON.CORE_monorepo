<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tracker;

class TrackerSeeder extends Seeder
{
    public function run(): void
    {
        $trackers = [
            [
                'label' => 'Water',
                'type' => 'counter',
                'goal' => 8,
                'icon' => 'Droplets',
            ],
            [
                'label' => 'Chess',
                'type' => 'outcome',
                'goal' => null,
                'icon' => 'Trophy',
            ],
            [
                'label' => 'Mobile Legends',
                'type' => 'outcome',
                'goal' => null,
                'icon' => 'Swords',
            ],
            [
                'label' => 'No Sugar',
                'type' => 'outcome',
                'goal' => null,
                'icon' => 'XCircle',
            ],
            [
                'label' => 'Exercise',
                'type' => 'counter',
                'goal' => 45, // minutes
                'icon' => 'Activity',
            ]
        ];

        foreach ($trackers as $data) {
            Tracker::create($data);
        }
    }
}
