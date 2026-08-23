<?php
/**
 * CSRF Token Endpoint
 * Provides a secure CSRF token for form submissions
 *
 * This endpoint MUST NOT be cached - tokens are single-use and session-bound
 */

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Start session to store CSRF token
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Prevent ALL caching - CSRF tokens must never be cached
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');

// Generate CSRF token if not exists
try {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }

    $response = [
        'token' => $_SESSION['csrf_token'],
        'success' => true
    ];

    $json = json_encode($response);
    if ($json === false) {
        throw new RuntimeException('JSON encoding failed');
    }

    echo $json;
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Internal server error']);
}