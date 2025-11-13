import { useState, useEffect } from 'react';

interface PaymentResponseData {
    decision: string | null;
    reason_code: string | null;
    message: string | null;
    transaction_id: string | null;
    reference_number: string | null;
    amount: string | null;
    currency: string | null;
    auth_code: string | null;
    signature: string | null;
    signed_field_names: string | null;
}

interface PaymentDetails {
    transactionId: string | null;
    referenceNumber: string | null;
    amount: string | null;
    currency: string | null;
    authCode: string | null;
    timestamp: string;
}

const PaymentConfirmation = () => {
    const [status, setStatus] = useState('processing'); // processing, success, failed
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Get URL parameters from CyberSource response
        const urlParams = new URLSearchParams(window.location.search);
        
        // Extract payment response data
        const responseData: PaymentResponseData = {
            decision: urlParams.get('decision'),
            reason_code: urlParams.get('reason_code'),
            message: urlParams.get('message'),
            transaction_id: urlParams.get('transaction_id'),
            reference_number: urlParams.get('req_reference_number'),
            amount: urlParams.get('req_amount'),
            currency: urlParams.get('req_currency'),
            auth_code: urlParams.get('auth_code'),
            signature: urlParams.get('signature'),
            signed_field_names: urlParams.get('signed_field_names'),
        };

        // Validate and process payment
        validatePayment(responseData);
    }, []);

    const validatePayment = async (responseData: PaymentResponseData) => {
        try {
            // Verify signature with backend
            const response = await fetch('/api/verify_payment.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(responseData)
            });

            const result = await response.json();

            if (result.valid && responseData.decision === 'ACCEPT') {
                setStatus('success');
                setPaymentDetails({
                    transactionId: responseData.transaction_id,
                    referenceNumber: responseData.reference_number,
                    amount: responseData.amount,
                    currency: responseData.currency,
                    authCode: responseData.auth_code,
                    timestamp: new Date().toLocaleString()
                });
            } else {
                setStatus('failed');
                setError(getErrorMessage(responseData.reason_code, responseData.message));
            }
        } catch (err) {
            console.error('Validation error:', err);
            setStatus('failed');
            setError('Payment verification failed. Please contact support.');
        }
    };

    const getErrorMessage = (reasonCode: string | null, message: string | null): string => {
        const errorMessages: Record<string, string> = {
            '100': 'Transaction successful',
            '101': 'Transaction declined - insufficient funds',
            '102': 'Transaction declined - limit exceeded',
            '200': 'Authorization declined',
            '201': 'Invalid account number',
            '202': 'Card expired',
            '203': 'Card declined',
            '210': 'Card type not accepted',
            '231': 'Invalid CVV',
            '232': 'Invalid card verification number',
            '234': 'Merchant configuration error',
            '400': 'Fraud score exceeds threshold',
            '481': 'Transaction declined - blocked by merchant',
            '700': 'System error occurred'
        };

        return (reasonCode ? errorMessages[reasonCode] : null) || message || 'Payment failed. Please try again.';
    };

    if (status === 'processing') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Processing Payment
                    </h2>
                    <p className="text-gray-600">
                        Please wait while we verify your payment...
                    </p>
                </div>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
                <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-lg w-full">
                    {/* Success Icon */}
                    <div className="relative mb-6">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
                            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="absolute inset-0 w-24 h-24 bg-green-200 rounded-full mx-auto animate-ping opacity-20"></div>
                    </div>

                    {/* Success Message */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Payment Successful!
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Your transaction has been completed successfully.
                    </p>

                    {/* Payment Details */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                            Transaction Details
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Transaction ID:</span>
                                <span className="font-mono text-sm text-gray-900">
                                    {paymentDetails?.transactionId}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Reference Number:</span>
                                <span className="font-mono text-sm text-gray-900">
                                    {paymentDetails?.referenceNumber}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Amount:</span>
                                <span className="font-semibold text-lg text-green-600">
                                    {paymentDetails?.currency} {paymentDetails?.amount}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Auth Code:</span>
                                <span className="font-mono text-sm text-gray-900">
                                    {paymentDetails?.authCode}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Date & Time:</span>
                                <span className="text-sm text-gray-900">
                                    {paymentDetails?.timestamp}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => window.print()}
                            className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                        >
                            Print Receipt
                        </button>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                        >
                            Return Home
                        </button>
                    </div>

                    <p className="text-sm text-gray-500 mt-6">
                        A confirmation email has been sent to your registered email address.
                    </p>
                </div>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100 p-4">
                <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-lg w-full">
                    {/* Error Icon */}
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>

                    {/* Error Message */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Payment Failed
                    </h1>
                    <p className="text-gray-600 mb-6">
                        We couldn't process your payment.
                    </p>

                    {/* Error Details */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-800 font-medium">
                            {error}
                        </p>
                    </div>

                    {/* Help Text */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                        <h3 className="font-semibold text-gray-800 mb-2">What you can do:</h3>
                        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                            <li>Check your card details and try again</li>
                            <li>Ensure you have sufficient funds</li>
                            <li>Try a different payment method</li>
                            <li>Contact your bank if the issue persists</li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => window.history.back()}
                            className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                        >
                            Try Again
                        </button>
                        <button
                            onClick={() => window.location.href = '/support'}
                            className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                        >
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default PaymentConfirmation;