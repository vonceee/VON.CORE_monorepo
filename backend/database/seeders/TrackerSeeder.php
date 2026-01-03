<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tracker;

class TrackerSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            [
                'label' => 'Hydration',
                'type' => 'counter',
                'goal' => 8,
                'icon' => 'Droplets',
            ],
            [
                'label' => 'Mobile Legends',
                'type' => 'outcome',
                'goal' => null,
                'icon' => 'Gamepad2',
            ],
            [
                'label' => 'Chess',
                'type' => 'outcome',
                'goal' => null,
                'icon' => 'Swords',
            ],
        ];

        foreach ($defaults as $data) {
            Tracker::firstOrCreate(
                ['label' => $data['label']],
                $data
            );
        }
    }
}
