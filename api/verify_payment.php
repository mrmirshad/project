<?php
// verify_payment.php - Standalone CyberSource Payment Verification
header('Content-Type: application/json');

// CyberSource Secret Key (keep this secure!)
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

    return hash_equals($calculated_signature, $signature);
}

// Read incoming data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Fallback to $_POST/$_GET if JSON decoding fails
if (!$data) {
    $data = array_merge($_POST, $_GET);
}

// Extract payment response fields
$decision = $data['decision'] ?? '';
$reason_code = $data['reason_code'] ?? '';
$transaction_id = $data['transaction_id'] ?? '';
$reference_number = $data['reference_number'] ?? '';
$amount = $data['amount'] ?? '';
$signature = $data['signature'] ?? '';
$signed_field_names = $data['signed_field_names'] ?? '';

// Verify signature
$is_valid = verifySignature($data, $secret_key, $signed_field_names, $signature);

// If signature invalid
if (!$is_valid) {
    echo json_encode([
        'valid' => false,
        'status' => 'error',
        'message' => 'Invalid signature — request may not be authentic.'
    ]);
    exit;
}

// Payment accepted
if ($decision === 'ACCEPT' && $reason_code === '100') {
    echo json_encode([
        'valid' => true,
        'status' => 'success',
        'message' => '✅ Payment verified successfully.',
        'transaction_id' => $transaction_id,
        'reference_number' => $reference_number,
        'amount' => $amount
    ]);
} else {
    // Payment failed
    echo json_encode([
        'valid' => true,
        'status' => 'failed',
        'reason_code' => $reason_code,
        'message' => getErrorMessage($reason_code)
    ]);
}

// Friendly error messages for reason codes
function getErrorMessage($reason_code) {
    $messages = [
        '100' => 'Transaction successful',
        '101' => 'Insufficient funds',
        '102' => 'Limit exceeded',
        '200' => 'Authorization declined',
        '201' => 'Invalid account number',
        '202' => 'Card expired',
        '203' => 'Card declined',
        '210' => 'Card type not accepted',
        '231' => 'Invalid CVV',
        '232' => 'Invalid verification number',
        '234' => 'Merchant configuration error',
        '400' => 'Fraud score exceeds threshold',
        '481' => 'Transaction blocked by merchant',
        '700' => 'System error occurred'
    ];
    return $messages[$reason_code] ?? 'Transaction declined';
}
?>
