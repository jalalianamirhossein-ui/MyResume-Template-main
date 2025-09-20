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
 * - Rate limiting protection
 * - XSS and injection prevention
 * - Email format validation
 * - Secure email processing
 * 
 * Author: AmirHossein Jalalian
 * ===============================================
 */

// Email configuration
$receiving_email_address = 'jalalian.amirhossein@gmail.com';
  
  // Basic security checks
  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die('Invalid request method');
  }
  
  // Validate email
  if (!filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL)) {
    die('Invalid email address');
  }
  
  // Rate limiting (basic)
  session_start();
  $now = time();
  if (isset($_SESSION['last_contact']) && ($now - $_SESSION['last_contact']) < 60) {
    die('Please wait 60 seconds between submissions');
  }
  $_SESSION['last_contact'] = $now;

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;
  
  $contact->to = $receiving_email_address;
  $contact->from_name = htmlspecialchars(strip_tags(trim($_POST['name'] ?? '')));
  $contact->from_email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
  $contact->subject = htmlspecialchars(strip_tags(trim($_POST['subject'] ?? '')));

  // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
  /*
  $contact->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );
  */

  $contact->add_message( $contact->from_name, 'From');
  $contact->add_message( $contact->from_email, 'Email');
  $contact->add_message( htmlspecialchars(strip_tags(trim($_POST['message'] ?? ''))), 'Message', 1000);

  echo $contact->send();
?>
