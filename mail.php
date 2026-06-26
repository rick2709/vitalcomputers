<?php
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

$to      = 'sales@vitalcomputers.co.zw';
$subject = 'Quote Request from ' . $name;

$body  = "You have received a new enquiry via the Vital Computers website.\n\n";
$body .= "Name:    $name\n";
if ($company) $body .= "Company: $company\n";
$body .= "Email:   $email\n";
if ($phone)   $body .= "Phone:   $phone\n";
$body .= "\nMessage:\n$message\n";

// Use the destination address as From — most cPanel servers require
// the From to be a real mailbox on the same domain
$headers  = "From: $to\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo 'success';
} else {
    // Log the PHP error so you can check it in cPanel Error Logs
    $err = error_get_last();
    error_log('mail.php failed: ' . ($err['message'] ?? 'unknown error'));
    http_response_code(500);
    echo 'error';
}
