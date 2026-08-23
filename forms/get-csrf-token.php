<?php
/**
 * CSRF Token Endpoint
 * Provides a secure CSRF token for form submissions
 */

// Start session to store CSRF token
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Set CORS headers for same-origin requests
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');

// Generate CSRF token if not exists
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Return token as JSON
echo json_encode([
    'token' => $_SESSION['csrf_token'],
    'success' => true
]);