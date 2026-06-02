<?php
header('Content-Type: application/json; charset=UTF-8');

$date = isset($_GET['date']) ? trim($_GET['date']) : '';

if (!preg_match('/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/', $date)) {
    echo json_encode([]);
    exit;
}

$filename = __DIR__ . DIRECTORY_SEPARATOR . 'entries.json';
$entries = [];

if (file_exists($filename)) {
    $json = file_get_contents($filename);
    $decoded = json_decode($json, true);
    if (is_array($decoded)) {
        $entries = $decoded;
    }
}

$filtered = array_values(array_filter($entries, function ($entry) use ($date) {
    return isset($entry['date']) && $entry['date'] === $date;
}));

echo json_encode($filtered);