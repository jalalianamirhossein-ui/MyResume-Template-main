<?php
/**
 * CSRF Token Endpoint
 * Provides a secure CSRF token for form submissions
 *
 * This endpoint MUST NOT be cached - tokens are single-use and session-bound
 */

require_once __DIR__ . '/security.php';

meet_aj_send_endpoint_security_headers('application/json; charset=UTF-8');

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

meet_aj_start_secure_session();

// Generate CSRF token if not exists
try {
    $response = [
        'token' => meet_aj_issue_csrf_token(),
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
