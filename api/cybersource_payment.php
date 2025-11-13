<?php

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Main processing page with CyberSource Live Payment Gateway + HMAC Signature
session_unset();
session_start();

// include "api_lib.php";
// include "configuration.php";
// include "connection.php";

// Function to generate HMAC signature
function sign($params, $secret_key) {
    return base64_encode(hash_hmac('sha256', $params, $secret_key, true));
}

// Function to build data to sign string
function buildDataToSign($signed_field_names, $params) {
    $data = [];
    $signed_fields = explode(",", $signed_field_names);
    foreach ($signed_fields as $field) {
        $data[] = $field . "=" . $params[$field];
    }
    return implode(",", $data);
}

// Ensure this is the first invocation of this page
if ($_SERVER['REQUEST_METHOD'] == "GET") {
    // Simple test response for GET requests
    header('Content-Type: text/html');
    echo '<form id="payment_form" action="https://testsecureacceptance.cybersource.com/pay" method="post">';
    echo '<input type="hidden" name="test" value="get_request">';
    echo '</form>';
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == "POST") {

    // Debug: Log request data
    error_log("POST data received: " . print_r($_POST, true));
    error_log("Request method: " . $_SERVER['REQUEST_METHOD']);

    if (array_key_exists("submit", $_POST))
        unset($_POST["submit"]);

    if ($_POST["country"] == "USD")
    {
        $order_amount = $_POST["order_amount"] * 300;  
    }
    else
    {
        $order_amount = $_POST["order_amount"]; 
    }
    $order_currency = 'LKR';
    $customer_receipt_email = $_POST["customer_receipt_email"];
    $customer_mobile = $_POST["customer_mobile"];

    error_log("Order amount: $order_amount, Email: $customer_receipt_email, Mobile: $customer_mobile");

    // Fetching logged-in user details (replace with your actual user data fetching logic)
    $first_name = 'Donor';  // Generic first name for donation
    $last_name = 'User';    // Generic last name for donation
    $email = $customer_receipt_email;  // Use the provided email

    // CyberSource Payment Gateway Credentials
    $access_key = "b6100a405b9335d9846aa5753e4a4d2f";
    $profile_id = "BD81FDB5-9750-430D-8E44-ACBA92F2CDAC";
    $secret_key = "01483accb42b4516a753218685411268c4012bedac044978a447bd36f3a90683844aea8de091447f9b0c55da54c8fd3edeba1717d3fd4ccc9a0ddad83950cf9d2ff1df8f6b864c6e83e5a109b9340811a8a4f17d7a864b2f89002a832d447bf6d44a28f41c6e4f74b73301dc0c09ac9037815e4f7ef341f6bda585a060e32880";
    
    $transaction_uuid = uniqid();
    $signed_date_time = gmdate("Y-m-d\TH:i:s\Z");

    // Unique Order ID
    $order_id = uniqid();
    $order_reference = uniqid();

    // Store order and payment details in session
    $_SESSION['orderID'] = $order_id;
    $_SESSION['orderReference'] = $order_reference;

    // Define all payment parameters
    $params = array(
        "access_key" => $access_key,
        "profile_id" => $profile_id,
        "transaction_uuid" => $transaction_uuid,
        "signed_field_names" => "access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_city,bill_to_address_line1,bill_to_address_line2,bill_to_address_state,bill_to_address_country,bill_to_company_name,bill_to_address_postal_code",
        "unsigned_field_names" => "",
        "signed_date_time" => $signed_date_time,
        "locale" => "en",
        "transaction_type" => "sale",
        "reference_number" => $order_reference,
        "amount" => $order_amount,
        "currency" => $order_currency,
        "bill_to_forename" => $first_name,
        "bill_to_surname" => $last_name,
        "bill_to_email" => $email,
        "bill_to_phone" => $customer_mobile,
        "bill_to_address_city" => "Colombo",
        "bill_to_address_line1" => "593 Printers' Co-op Bldg",
        "bill_to_address_line2" => "Maradana Road",
        "bill_to_address_state" => "Western",
        "bill_to_address_country" => "LK",
        "bill_to_company_name" => "Food City",
        "bill_to_address_postal_code" => "01000"
    );

    // Generate signature
    $data_to_sign = buildDataToSign($params["signed_field_names"], $params);
    $signature = sign($data_to_sign, $secret_key);
    $params["signature"] = $signature;

    // CyberSource Test URL
    $cybersource_url = "https://testsecureacceptance.cybersource.com/pay";

    // Render the form with CyberSource fields for the payment gateway
    echo '<form id="payment_form" action="' . $cybersource_url . '" method="post">';
    
    foreach ($params as $name => $value) {
        echo '<input type="hidden" name="' . htmlspecialchars($name) . '" value="' . htmlspecialchars($value) . '">';
    }
    
    echo '</form>';
}

?>

<html>
<head>
    <script type="text/javascript">
        window.onload = function() {
            // Automatically submit the form when the page loads
            document.getElementById('payment_form').submit();
        };
    </script>
</head>
<body>
    <p>Redirecting to payment gateway...</p>
</body>
</html>
