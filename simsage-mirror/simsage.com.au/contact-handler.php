<?php
// SimSAGe Contact Form Handler

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: contact/');
    exit;
}

// Honeypot check - if this hidden field is filled in, it's a bot
if (!empty($_POST['website_url'])) {
    // Silently redirect as if successful (don't reveal the trap)
    header('Location: contact/?status=success');
    exit;
}

// Timestamp check - reject if form submitted too quickly (< 3 seconds)
if (isset($_POST['_ts'])) {
    $elapsed = time() - intval($_POST['_ts']);
    if ($elapsed < 3) {
        header('Location: contact/?status=success');
        exit;
    }
}

// Collect and sanitize form data
$name    = isset($_POST['your-name'])    ? trim($_POST['your-name'])    : '';
$email   = isset($_POST['your-email'])   ? trim($_POST['your-email'])   : '';
$phone   = isset($_POST['your-phone'])   ? trim($_POST['your-phone'])   : '';
$message = isset($_POST['your-message']) ? trim($_POST['your-message']) : '';

// Validate required fields
$errors = [];
if ($name === '') {
    $errors[] = 'name';
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'email';
}
if ($phone === '') {
    $errors[] = 'phone';
}
if ($message === '') {
    $errors[] = 'message';
}

if (!empty($errors)) {
    header('Location: contact/?status=error&fields=' . implode(',', $errors));
    exit;
}

// Sanitize against header injection
function sanitize_header($value) {
    return str_replace(["\r", "\n", "%0a", "%0d"], '', $value);
}

$safe_name  = sanitize_header($name);
$safe_email = sanitize_header($email);

// Build the email
$to      = 'info@simsage.com.au, joel3000@gmail.com';
$subject = 'SimSAGe Contact Form: ' . $safe_name;

$body  = "Name:    $name\n";
$body .= "Email:   $email\n";
$body .= "Phone:   $phone\n";
$body .= "\nMessage:\n$message\n";

// Use the cPanel account email as From (HostGator requires this)
// Use -f flag to set envelope sender
$headers  = "From: info@simsage.com.au\r\n";
$headers .= "Reply-To: $safe_email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Send the email with envelope sender
$sent = mail($to, $subject, $body, $headers, '-f info@simsage.com.au');

// Log the result for debugging
$log = date('Y-m-d H:i:s') . " | To: $to | From: $safe_email | Name: $safe_name | Sent: " . ($sent ? 'YES' : 'NO') . " | Error: " . error_get_last()['message'] . "\n";
@file_put_contents(__DIR__ . '/contact-log.txt', $log, FILE_APPEND);

if ($sent) {
    header('Location: contact/?status=success');
} else {
    header('Location: contact/?status=mailfail');
}
exit;
