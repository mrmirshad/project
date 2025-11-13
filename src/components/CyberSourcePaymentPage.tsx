import { useState, useEffect } from 'react';

interface PaymentData {
    action: string;
    fields: Record<string, string>;
}

interface CyberSourcePaymentPageProps {
    amount: number;
    email: string;
    mobile: string;
    onBack?: () => void;
}

const CyberSourcePaymentPage = ({ amount, email, mobile, onBack }: CyberSourcePaymentPageProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

    useEffect(() => {
        // Fetch payment data from PHP backend
        fetchPaymentData();
    }, [amount, email, mobile]);

    const fetchPaymentData = async () => {
        try {
            // Replace with your actual PHP endpoint
            const response = await fetch('/api/cybersource_payment.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    order_amount: amount.toFixed(2), // Use dynamic amount
                    country: 'LKR', // or 'USD'
                    customer_receipt_email: email, // Use dynamic email
                    customer_mobile: mobile, // Use dynamic mobile
                })
            });

            const text = await response.text();
            
            // Parse the HTML response to extract form data
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const form = doc.getElementById('payment_form');
            
            if (form) {
                const formData: Record<string, string> = {};
                const inputs = form.querySelectorAll('input[type="hidden"]') as NodeListOf<HTMLInputElement>;
                
                inputs.forEach(input => {
                    formData[input.name] = input.value;
                });

                setPaymentData({
                    action: (form as HTMLFormElement).action,
                    fields: formData
                });
                
                setLoading(false);
            } else {
                throw new Error('Payment form not found in response');
            }
        } catch (err) {
            console.error('Payment fetch error:', err);
            setError('Failed to initialize payment. Please try again.');
            setLoading(false);
        }
    };

    useEffect(() => {
        // Auto-submit form when payment data is ready
        if (paymentData && !loading) {
            const form = document.getElementById('cybersource_payment_form') as HTMLFormElement | null;
            if (form) {
                setTimeout(() => {
                    form.submit();
                }, 500);
            }
        }
    }, [paymentData, loading]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Preparing Payment
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Please wait while we securely connect to the payment gateway...
                    </p>
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                        >
                            Back
                        </button>
                    )}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
                <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Payment Error
                    </h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Redirecting to Payment
                </h2>
                <p className="text-gray-600 mb-6">
                    You will be redirected to CyberSource secure payment page shortly...
                </p>
                
                {paymentData && (
                    <form
                        id="cybersource_payment_form"
                        action={paymentData.action}
                        method="POST"
                    >
                        {Object.entries(paymentData.fields).map(([key, value]) => (
                            <input
                                key={key}
                                type="hidden"
                                name={key}
                                value={value as string}
                            />
                        ))}
                    </form>
                )}
                
                <div className="mt-4 text-sm text-gray-500">
                    <p>Secured by CyberSource</p>
                </div>
            </div>
        </div>
    );
};

export default CyberSourcePaymentPage;
