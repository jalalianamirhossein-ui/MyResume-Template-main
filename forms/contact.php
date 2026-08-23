<?php
/**
 * ===============================================
 * MEET AJ PORTFOLIO - CONTACT FORM HANDLER
 * ===============================================
 *
 * Secure contact form processing for the portfolio website
 * Handles form validation, security checks, and email sending
 *
 * Features:
 * - Input validation and sanitization
 * - Rate limiting protection (IP + session based)
 * - CSRF token validation
 * - Header injection prevention
 * - XSS and injection prevention
 * - Email format validation
 * - Secure email processing with SMTP support
 *
 * Author: AmirHossein Jalalian
 * ===============================================
 */

// Email configuration
$receiving_email_address = 'jalalian.amirhossein@gmail.com';

// Security: Start session early for CSRF
session_start();

// Basic security checks
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die('Invalid request method');
}

// CSRF Token Validation
if (empty($_POST['csrf_token']) || !hash_equals($_SESSION['csrf_token'] ?? '', $_POST['csrf_token'])) {
    http_response_code(403);
    die('CSRF validation failed');
}

// Honeypot field - if filled, it's likely a bot (check BEFORE rate limiting)
$honeypot = trim($_POST['website'] ?? '');
if (!empty($honeypot)) {
    // Silently pretend success to not reveal honeypot
    http_response_code(200);
    die('OK');
}

// Input validation with length limits
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

// Validate required fields
if (empty($name) || strlen($name) < 2 || strlen($name) > 50) {
    http_response_code(400);
    die('Invalid name (2-50 characters required)');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 100) {
    http_response_code(400);
    die('Invalid email address');
}

if (empty($subject) || strlen($subject) < 5 || strlen($subject) > 100) {
    http_response_code(400);
    die('Invalid subject (5-100 characters required)');
}

if (empty($message) || strlen($message) < 10 || strlen($message) > 1000) {
    http_response_code(400);
    die('Invalid message (10-1000 characters required)');
}

// Rate limiting - IP based (after validation, so bots/invalid requests don't consume quota)
$rate_limit_file = sys_get_temp_dir() . '/contact_rate_limit_' . md5($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$now = time();
$rate_limit_data = [];

if (file_exists($rate_limit_file)) {
    $content = file_get_contents($rate_limit_file);
    if ($content !== false) {
        $decoded = json_decode($content, true);
        if (is_array($decoded)) {
            $rate_limit_data = $decoded;
        }
    }
}

// Clean old entries
$rate_limit_data = array_filter($rate_limit_data, function($timestamp) use ($now) {
    return ($now - $timestamp) < 3600; // 1 hour window
});

// Check rate limit (max 5 per hour per IP)
if (count($rate_limit_data) >= 5) {
    http_response_code(429);
    die('Too many requests. Please try again later.');
}

// Add current request and save with file locking
$rate_limit_data[] = $now;
$fp = fopen($rate_limit_file, 'c');
if ($fp) {
    if (flock($fp, LOCK_EX)) {
        ftruncate($fp, 0);
        fwrite($fp, json_encode($rate_limit_data));
        flock($fp, LOCK_UN);
    }
    fclose($fp);
}

// Header injection prevention - strip newlines from header fields ONLY
function sanitize_header_input($input) {
    return str_replace(["\r", "\n", "\0"], '', $input);
}

$name = sanitize_header_input($name);
$email = sanitize_header_input($email);
$subject = sanitize_header_input($subject);
// Note: message is NOT sanitized as header input - it's body content, not a mail header

// Additional sanitization for output
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
  include( $php_email_form );
} else {
  http_response_code(500);
  die( 'Unable to load the "PHP Email Form" Library!');
}

$contact = new PHP_Email_Form;
$contact->ajax = true;

$contact->to = $receiving_email_address;
$contact->from_name = $name;
$contact->from_email = $email;
$contact->subject = $subject;

// SMTP Configuration (commented out - requires SMTP implementation in PHP_Email_Form)
// $contact->smtp = array(
//   'host' => 'smtp.example.com',
//   'username' => 'your_username',
//   'password' => 'your_password',
//   'port' => 587,
//   'encryption' => 'tls'
// );

$contact->add_message( $contact->from_name, 'From');
$contact->add_message( $contact->from_email, 'Email');
$contact->add_message( $message, 'Message', 1000);

$result = $contact->send();
if ($result !== "OK") {
    http_response_code(500);
    die($result);
}

echo "OK";
?>