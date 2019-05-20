<?php 
include('MailChimpApi.php'); 
use \DrewM\MailChimp\MailChimp;
if(isset($_POST['email'])){
$MailChimp = new MailChimp('503c047fcb57c5e8ce5da0c153851619-us15');
$list_id = 'de3d5340b5';
$result = $MailChimp->post("lists/$list_id/members", [
                'email_address' => $_POST['email'],
                'status'        => 'subscribed',
            ]);

if ($MailChimp->success()) {
    echo "Succesfully Subscribed!";  
} else {
    echo "You Already Subscribed!";
}
    
}



?>