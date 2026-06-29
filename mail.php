<?php
// ── PHPMailer via cPanel local relay ─────────────────────────
define('SMTP_HOST',  'localhost');
define('SMTP_PORT',  25);
define('MAIL_FROM',  'sales@vitalcomputers.co.zw');
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

if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    exit('invalid');
}

// Load PHPMailer
require_once __DIR__ . '/phpmailer/Exception.php';
require_once __DIR__ . '/phpmailer/PHPMailer.php';
require_once __DIR__ . '/phpmailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->Port       = SMTP_PORT;
    $mail->SMTPAuth   = false;
    $mail->SMTPSecure = '';
    $mail->SMTPAutoTLS = false;

    $mail->setFrom(MAIL_FROM, 'Vital Computers Website');
    $mail->addAddress(MAIL_TO, 'Vital Computers Sales');
    $mail->addReplyTo($email, $name);

    $mail->Subject = 'Quote Request from ' . $name;

    $body  = "New enquiry from the Vital Computers website.\n\n";
    $body .= "Name:    $name\n";
    if ($company) $body .= "Company: $company\n";
    $body .= "Email:   $email\n";
    if ($phone)   $body .= "Phone:   $phone\n";
    if ($message) $body .= "\nMessage:\n$message\n";

    $mail->Body = $body;

    $mail->send();
    echo 'success';

} catch (Exception $e) {
    $errMsg = $mail->ErrorInfo;
    file_put_contents(__DIR__ . '/mail-debug.log', date('Y-m-d H:i:s') . ' — ' . $errMsg . "\n", FILE_APPEND);
    http_response_code(500);
    echo 'error: ' . $errMsg;
}
