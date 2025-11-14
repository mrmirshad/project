import { useState, useEffect } from 'react';

interface PaymentData {
    action: string;
    fields: Record<string, string>;
}

interface CyberSourcePaymentPageProps {
    amount: number;
    email: string;
    mobile: string;
    firstName: string;
    lastName: string;
    onBack?: () => void;
}

const CyberSourcePaymentPage = ({ amount, email, mobile, firstName, lastName, onBack }: CyberSourcePaymentPageProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

    useEffect(() => {
        fetchPaymentData();
    }, [amount, email, mobile, firstName, lastName]);

    const fetchPaymentData = async () => {
        try {
            // Call Node.js backend
            const response = await fetch('https://umandawa-backend.onrender.com/api/cybersource_payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    order_amount: amount.toFixed(2),
                    country: 'LKR', // or 'USD' for conversion
                    customer_receipt_email: email,
                    customer_mobile: mobile,
                    customer_first_name: firstName,
                    customer_last_name: lastName,
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.error || 'Failed to prepare payment');
            }

            setPaymentData({
                action: data.action,
                fields: data.fields
            });
            
            setLoading(false);
        } catch (err) {
            console.error('Payment fetch error:', err);
            setError(err instanceof Error ? err.message : 'Failed to initialize payment. Please try again.');
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
                }, 1000); // 1 second delay to show the redirect message
            }
        }
    }, [paymentData, loading]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md w-full mx-4">
                    <div className="relative mb-6">
                        <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-t-4 border-indigo-600 mx-auto"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        Preparing Your Payment
                    </h2>
                    <p className="text-gray-600 mb-2">
                        Securely connecting to payment gateway...
                    </p>
                    <div className="flex justify-center items-center space-x-2 mt-6">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="mt-6 bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100 p-4">
                <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md w-full">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        Payment Error
                    </h2>
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-left rounded">
                        <p className="text-red-800 text-sm">{error}</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => window.location.reload()}
                            className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all shadow-lg"
                        >
                            Try Again
                        </button>
                        {onBack && (
                            <button
                                onClick={onBack}
                                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                            >
                                Go Back
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 p-4">
            <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md w-full">
                {/* Success Icon with Animation */}
                <div className="relative mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-pulse">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    {/* Ripple effect */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 bg-green-400 rounded-full opacity-20 animate-ping"></div>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                    Redirecting to Payment
                </h2>
                <p className="text-gray-600 mb-2 text-lg">
                    Please wait...
                </p>
                <p className="text-gray-500 text-sm mb-6">
                    You will be redirected to CyberSource secure payment page
                </p>

                {/* Payment Details */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600 text-sm font-medium">Amount:</span>
                        <span className="text-2xl font-bold text-indigo-600">
                            LKR {amount.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Email:</span>
                        <span className="text-gray-800 font-medium truncate ml-2">{email}</span>
                    </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-6">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Secured by CyberSource</span>
                </div>

                {/* Hidden Form for Auto-Submit */}
                {paymentData && (
                    <form
                        id="cybersource_payment_form"
                        action={paymentData.action}
                        method="POST"
                        style={{ display: 'none' }}
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

                {/* Progress Indicator */}
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full animate-progress"></div>
                </div>
            </div>

            <style>{`
                @keyframes progress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                .animate-progress {
                    animation: progress 2s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default CyberSourcePaymentPage;