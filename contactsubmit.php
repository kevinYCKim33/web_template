<?php

//Prefedined Variables 
$to = "email@yourdomain.com";

// Email Subject
$subject = "Contact from Your Site";

// This IF condition is for improving security  and Prevent Direct Access to the Mail Script.
if ($_POST) {

// Collect POST data from form
    $name = stripslashes($_POST['fname']);
    $email = stripslashes($_POST['email']);
    $phone = stripslashes($_POST['phone']);
    $message = stripslashes($_POST['msg']);
//$realcap = stripslashes($_POST['captcha']);

    $ipAddress = $_SERVER['REMOTE_ADDR'];
    if (array_key_exists('HTTP_X_FORWARDED_FOR', $_SERVER)) {
        $ipAddress = array_pop(explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']));
    }

// Collecting all content in HTML Table
    $content = '<table width="100%">
<tr><td  align "center"><b>Contact Details</b></td></tr>
<tr><td>Name:</td><td> ' . $name . '</td></tr>
<tr><td>Email:</td><td> ' . $email . ' </td></tr>
<tr><td>Phone:</td><td> ' . $phone . ' </td></tr>
<tr><td>Message:</td> <td> ' . $message . '</td></tr>
<tr><td>Date:</td> <td> ' . date('d-m-Y') . '</td></tr>
<tr><td>IP:</td> <td> ' . $ipAddress . '</td></tr>
</table> ';


// Define email variables
    $headers = "From:" . $email . "\r\n";
    $headers .= "Reply-to:" . $email . "\r\n";
    $headers .= 'Content-type: text/html; charset=UTF-8';

    if (!empty($name) && !empty($email) && !empty($content)) {
// Sending Email 
        if (mail($to, $subject, $content, $headers)) {
            print "Thank you, I will getback to you shortly<br>";
            return true;
        } else {
            print "Some errors to send the mail.";
            return false;
        }
    } else {
        print "Some validation errors to send the mail.";
        return false;
    }
}