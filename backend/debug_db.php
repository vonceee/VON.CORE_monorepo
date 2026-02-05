<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    echo "Checking Database Connection...\n";
    \Illuminate\Support\Facades\DB::connection()->getPdo();
    echo "Database Connection: OK\n";

    $exists = \Illuminate\Support\Facades\Schema::hasTable('midnight_fictions');
    echo "Table 'midnight_fictions' Exists: " . ($exists ? 'YES' : 'NO') . "\n";
} catch (\Exception $e) {
    echo "Database Connection FAILED: " . $e->getMessage() . "\n";
}
