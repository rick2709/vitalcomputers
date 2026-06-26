<?php
// ── PHPMailer SMTP config ─────────────────────────────────────
// Fill in your cPanel email credentials before uploading
define('SMTP_HOST',  'mail.vitalcomputers.co.zw'); // or try: localhost
define('SMTP_USER',  'sales@vitalcomputers.co.zw');
define('SMTP_PASS',  'YOUR_EMAIL_PASSWORD_HERE');   // ← change this
define('SMTP_PORT',  587);
define('MAIL_TO',    'sales@vitalcomputers.co.zw');
// ─────────────────────────────────────────────────────────────

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed.');
}

$name    = strip_tags(trim($_POST['name']    ?? ''));
$company = strip_tags(trim($_POST['company'] ?? ''));
$email   = filter_var(trim($_POST['email']   ?? ''), FILTER_SANITIZE_EMAIL);
$phone   = strip_tags(trim($_POST['phone']   ?? ''));
$message = strip_tags(trim($_POST['message'] ?? ''));

if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    exit('invalid');
}

// Load PHPMailer
require_once __DIR__ . '/phpmailer/Exception.php';
require_once __DIR__ . '/phpmailer/PHPMailer.php';
require_once __DIR__ . '/phpmailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USER;
    $mail->Password   = SMTP_PASS;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = SMTP_PORT;

    $mail->setFrom(SMTP_USER, 'Vital Computers Website');
    $mail->addAddress(MAIL_TO, 'Vital Computers Sales');
    $mail->addReplyTo($email, $name);

    $mail->Subject = 'Quote Request from ' . $name;

    $body  = "New enquiry from the Vital Computers website.\n\n";
    $body .= "Name:    $name\n";
    if ($company) $body .= "Company: $company\n";
    $body .= "Email:   $email\n";
    if ($phone)   $body .= "Phone:   $phone\n";
    $body .= "\nMessage:\n$message\n";

    $mail->Body = $body;

    $mail->send();
    echo 'success';

} catch (Exception $e) {
    error_log('PHPMailer error: ' . $mail->ErrorInfo);
    http_response_code(500);
    echo 'error';
}
