// DirectPayPage.tsx
import { useEffect, useState } from 'react';

interface DirectPayPageProps {
    amount: number;
    onBack?: () => void;
    email?: string;
    mobile?: string;
}

declare global {
    interface Window {
        DirectPayCardPayment?: {
            init: (config: any) => void;
        };
    }
}

const SCRIPT_ID = 'directpay-card-payment-script';

const DirectPayPage = ({ amount, onBack, email, mobile }: DirectPayPageProps) => {
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadScript = () => {
            return new Promise<void>((resolve, reject) => {
                const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

                if (existing) {
                    if (window.DirectPayCardPayment) {
                        resolve();
                        return;
                    }

                    existing.addEventListener('load', () => resolve(), { once: true });
                    existing.addEventListener('error', () => reject(new Error('Failed to load DirectPay script')), { once: true });
                    return;
                }

                const script = document.createElement('script');
                script.id = SCRIPT_ID;
                script.src = 'https://cdn.directpay.lk/live/00061/v1/directpayCardPayment.js?v=2.0.1';
                script.async = true;
                script.addEventListener('load', () => resolve(), { once: true });
                script.addEventListener('error', () => reject(new Error('Failed to load DirectPay script')), { once: true });
                document.body.appendChild(script);
            });
        };

        const initDirectPay = async () => {
            setLoading(true);
            setErrorMessage(null);

            try {
                await loadScript();

                if (!isMounted) {
                    return;
                }

                if (!window.DirectPayCardPayment) {
                    throw new Error('DirectPay SDK failed to initialise.');
                }

                const container = document.getElementById('card_container');
                if (container) {
                    container.innerHTML = '';
                }

                window.DirectPayCardPayment.init({
                    container: 'card_container',
                    merchantId: 'BU09677',
                    amount: amount.toFixed(2),
                    refCode: `DP${Date.now()}`,
                    currency: 'LKR',
                    type: 'ONE_TIME_PAYMENT',
                    customerEmail: email,
                    customerMobile: mobile,
                    description: 'Umandawa Donation',
                    debug: true,
                    apiKey: 'fd0f448d69fbf16f4b29a294eefddeaf1798f5a9bb2980317b25f3b3b40b2f50',
                    logo: 'https://www.umandawa.com/logo.png',
                    responseCallback: (result: any) => {
                        console.log('Payment result:', result);
                        if (result.data?.status === 'FAILED') {
                            window.location.href = '/pay_error.html';
                        } else {
                            window.location.href = '/thank-you.html';
                        }
                    },
                    errorCallback: (error: any) => {
                        console.error('Payment error:', error);
                        window.location.href = '/pay_error.html';
                    },
                });

                if (isMounted) {
                    setLoading(false);
                }
            } catch (error) {
                console.error('DirectPay initialisation failed', error);
                if (isMounted) {
                    setErrorMessage(error instanceof Error ? error.message : 'Unable to load payment window.');
                    setLoading(false);
                }
            }
        };

        initDirectPay();

        return () => {
            isMounted = false;
        };
    }, [amount, email, mobile]);

    return (
        <div className='w-full lg:max-w-3xl mx-auto'>
            <div style={{ padding: '20px' }}>
            {loading && !errorMessage && (
                <p style={{ marginBottom: '12px' }}>Loading secure payment window...</p>
            )}
            {errorMessage && (
                <p style={{ color: 'red', marginBottom: '12px' }}>Error: {errorMessage}</p>
            )}
            <div id="card_container" />
        </div>
        </div>
    );
};

export default DirectPayPage;