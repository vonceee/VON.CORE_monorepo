<?php
$default = config('database.default');
$connection = config("database.connections.$default");
echo "Default Connection: $default\n";
if ($default === 'sqlite') {
    echo "Database: " . $connection['database'] . "\n";
} elseif ($default === 'mysql') {
    echo "Host: " . $connection['host'] . "\n";
    echo "Port: " . $connection['port'] . "\n";
    echo "Database: " . $connection['database'] . "\n";
}
