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

require_once __DIR__ . '/security.php';

// Email configuration
$receiving_email_address = 'jalalian.amirhossein@gmail.com';

// Basic security checks
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    meet_aj_send_endpoint_security_headers('text/plain; charset=UTF-8');
    http_response_code(405);
    die('Invalid request method');
}

meet_aj_start_secure_session();
meet_aj_send_endpoint_security_headers('text/plain; charset=UTF-8');

// CSRF Token Validation
if (!meet_aj_is_valid_csrf_token($_POST['csrf_token'] ?? null)) {
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

// Validate required fields (mb_strlen counts characters, not bytes - important for Persian text)
if (empty($name) || mb_strlen($name, 'UTF-8') < 2 || mb_strlen($name, 'UTF-8') > 50) {
    http_response_code(400);
    die('Invalid name (2-50 characters required)');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email, 'UTF-8') > 100) {
    http_response_code(400);
    die('Invalid email address');
}

if (empty($subject) || mb_strlen($subject, 'UTF-8') < 5 || mb_strlen($subject, 'UTF-8') > 100) {
    http_response_code(400);
    die('Invalid subject (5-100 characters required)');
}

if (empty($message) || mb_strlen($message, 'UTF-8') < 10 || mb_strlen($message, 'UTF-8') > 1000) {
    http_response_code(400);
    die('Invalid message (10-1000 characters required)');
}

// Rate limiting - IP based (after validation, so bots/invalid requests don't consume quota)
try {
    $withinRateLimit = meet_aj_consume_contact_rate_limit((string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
} catch (RuntimeException $exception) {
    error_log('Contact form rate limiting unavailable: ' . $exception->getMessage());
    http_response_code(503);
    die('Service temporarily unavailable. Please try again later.');
}

if (!$withinRateLimit) {
    http_response_code(429);
    die('Too many requests. Please try again later.');
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

// A token may not be replayed after a successful form submission.
meet_aj_consume_csrf_token();

echo "OK";
?>
