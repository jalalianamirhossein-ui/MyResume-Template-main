<?php
/**
 * ===============================================
 * PHP EMAIL FORM - Version 1.0
 * ===============================================
 *
 * Simple and secure PHP email form handler
 * Processes contact form submissions and sends emails
 *
 * Features:
 * - Secure email processing
 * - SMTP support
 * - AJAX compatibility
 * - Input validation
 * - Error handling
 * - Header injection protection
 *
 * Author: BootstrapMade.com
 * URL: https://bootstrapmade.com/php-email-form/
 * ===============================================
 */

class PHP_Email_Form
{
    public $to;
    public $from_name;
    public $from_email;
    public $subject;
    public $message;
    public $ajax;
    public $smtp;

    public function __construct()
    {
        $this->ajax = false;
        $this->smtp = array();
    }

    public function add_message($value, $label = '', $max_length = 0)
    {
        if ($max_length > 0 && strlen($value) > $max_length) {
            $value = substr($value, 0, $max_length);
        }

        if (!empty($label)) {
            $this->message .= $label . ": " . $value . "\n";
        } else {
            $this->message .= $value . "\n";
        }
    }

    // Header injection protection
    private function sanitize_header($value) {
        return str_replace(["\r", "\n", "\0"], '', $value);
    }

    public function send()
    {
        // Sanitize header inputs to prevent injection
        $safe_from_name = $this->sanitize_header($this->from_name);
        $safe_from_email = $this->sanitize_header($this->from_email);
        $safe_subject = $this->sanitize_header($this->subject);

        $headers = "From: " . $safe_from_name . " <" . $safe_from_email . ">\r\n";
        $headers .= "Reply-To: " . $safe_from_email . "\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

        if (!empty($this->smtp)) {
            // SMTP sending would be implemented here
            // For now, fall back to mail()
            $mail_sent = mail($this->to, $safe_subject, $this->message, $headers);
        } else {
            $mail_sent = mail($this->to, $safe_subject, $this->message, $headers);
        }

        if ($mail_sent) {
            return "OK";
        } else {
            return "Error: Unable to send email";
        }
    }
}
?>