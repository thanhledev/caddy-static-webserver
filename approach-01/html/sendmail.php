<?php
if(isset($_POST['email'])){
    
    
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$subject = $_POST['subject'];
$msg = $_POST['message'];

$to = "faridul.faisal@gmail.com";

$message = "<html>
<head>
<title>Meassage from '.$name.'</title>
</head>
<body>
<p>'.$msg.'</p>
<table>
<tr>
<th>Sender Name: '.$name.'</th>
<th>Phone Number: '.$phone.'</th>
</tr>
</table>
</body>
</html>
";

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= "From: ".$email."\r\n";
$headers .= "Cc: ".$email."\r\n";

mail($to,$subject,$message,$headers);
echo "Your Mail Sent Successfull!";
}
else {
    
    echo "Sorry, There is some problem to send the mail.";
}
?> 