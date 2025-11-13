<?php
// verify_payment.php - Verify CyberSource Payment Response
header('Content-Type: application/json');

include "connection.php"; // Your database connection

// CyberSource Secret Key
$secret_key = "01483accb42b4516a753218685411268c4012bedac044978a447bd36f3a90683844aea8de091447f9b0c55da54c8fd3edeba1717d3fd4ccc9a0ddad83950cf9d2ff1df8f6b864c6e83e5a109b9340811a8a4f17d7a864b2f89002a832d447bf6d44a28f41c6e4f74b73301dc0c09ac9037815e4f7ef341f6bda585a060e32880";

// Function to verify HMAC signature
function verifySignature($params, $secret_key, $signed_field_names, $signature) {
    $data_to_sign = [];
    $fields = explode(',', $signed_field_names);
    
    foreach ($fields as $field) {
        if (isset($params[$field])) {
            $data_to_sign[] = $field . '=' . $params[$field];
        }
    }
    
    $data_string = implode(',', $data_to_sign);
    $calculated_signature = base64_encode(hash_hmac('sha256', $data_string, $secret_key, true));
    
    return $calculated_signature === $signature;
}

// Get POST data or URL parameters
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// If JSON decode fails, try to get from $_POST or $_GET
if (!$data) {
    $data = array_merge($_POST, $_GET);
}

try {
    // Extract payment response parameters
    $decision = isset($data['decision']) ? $data['decision'] : '';
    $reason_code = isset($data['reason_code']) ? $data['reason_code'] : '';
    $transaction_id = isset($data['transaction_id']) ? $data['transaction_id'] : '';
    $reference_number = isset($data['reference_number']) ? $data['reference_number'] : '';
    $amount = isset($data['amount']) ? $data['amount'] : '';
    $signature = isset($data['signature']) ? $data['signature'] : '';
    $signed_field_names = isset($data['signed_field_names']) ? $data['signed_field_names'] : '';
    
    // Verify signature
    $is_valid = verifySignature($data, $secret_key, $signed_field_names, $signature);
    
    if (!$is_valid) {
        echo json_encode([
            'valid' => false,
            'error' => 'Invalid signature'
        ]);
        exit;
    }
    
    // Check if payment was accepted
    if ($decision === 'ACCEPT' && $reason_code === '100') {
        // Payment successful - Update database
        
        // Example: Update order status in database
        $stmt = $conn->prepare("UPDATE orders SET 
            payment_status = 'completed',
            transaction_id = ?,
            payment_date = NOW()
            WHERE reference_number = ?");
        
        $stmt->bind_param("ss", $transaction_id, $reference_number);
        $stmt->execute();
        
        // Log transaction
        $log_stmt = $conn->prepare("INSERT INTO payment_logs 
            (transaction_id, reference_number, amount, status, reason_code, timestamp) 
            VALUES (?, ?, ?, 'success', ?, NOW())");
        
        $log_stmt->bind_param("ssds", $transaction_id, $reference_number, $amount, $reason_code);
        $log_stmt->execute();
        
        // Send confirmation email (implement your email function)
        // sendPaymentConfirmationEmail($reference_number);
        
        echo json_encode([
            'valid' => true,
            'status' => 'success',
            'message' => 'Payment verified and processed successfully',
            'transaction_id' => $transaction_id
        ]);
        
    } else {
        // Payment failed - Log the failure
        $stmt = $conn->prepare("INSERT INTO payment_logs 
            (transaction_id, reference_number, amount, status, reason_code, timestamp) 
            VALUES (?, ?, ?, 'failed', ?, NOW())");
        
        $stmt->bind_param("ssds", $transaction_id, $reference_number, $amount, $reason_code);
        $stmt->execute();
        
        echo json_encode([
            'valid' => true,
            'status' => 'failed',
            'reason_code' => $reason_code,
            'message' => getErrorMessage($reason_code)
        ]);
    }
    
} catch (Exception $e) {
    error_log("Payment verification error: " . $e->getMessage());
    
    echo json_encode([
        'valid' => false,
        'error' => 'Payment verification failed',
        'details' => $e->getMessage()
    ]);
}

function getErrorMessage($reason_code) {
    $error_messages = [
        '100' => 'Transaction successful',
        '101' => 'Declined - Insufficient funds',
        '102' => 'Declined - Limit exceeded',
        '200' => 'Authorization declined',
        '201' => 'Invalid account number',
        '202' => 'Card expired',
        '203' => 'Card declined',
        '210' => 'Card type not accepted',
        '231' => 'Invalid CVV',
        '232' => 'Invalid card verification number',
        '234' => 'Merchant configuration error',
        '400' => 'Fraud score exceeds threshold',
        '481' => 'Transaction blocked by merchant',
        '700' => 'System error occurred'
    ];
    
    return isset($error_messages[$reason_code]) 
        ? $error_messages[$reason_code] 
        : 'Transaction declined';
}

$conn->close();
?>