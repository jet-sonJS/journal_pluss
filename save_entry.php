<?php
header('Content-Type: application/json; charset=UTF-8');

$date = isset($_POST['date']) ? trim($_POST['date']) : '';
$content = isset($_POST['content']) ? trim($_POST['content']) : '';

if (!preg_match('/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/', $date) || $content === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid date or content.']);
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

$entries[] = [
    'date' => $date,
    'content' => $content
];

if (file_put_contents($filename, json_encode($entries, JSON_PRETTY_PRINT)) === false) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Unable to save the entry.']);
    exit;
}

echo json_encode(['success' => true]);
