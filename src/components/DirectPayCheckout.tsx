// src/components/DirectPayCheckout.tsx
import { useState } from 'react';

interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface DirectPayResponse {
  signature: string;
  encodedPayload: string;
  stage: 'DEV' | 'PROD';
}

interface PaymentResult {
  status: string;
  message?: string;
  [key: string]: any;
}

declare global {
  interface Window {
    DirectPayIpg: {
      Init: new (config: {
        signature: string;
        dataString: string;
        stage: 'DEV' | 'PROD';
        container?: string;
      }) => {
        doInAppCheckout(): Promise<PaymentResult>;
      };
    };
  }
}

interface DirectPayCheckoutProps {
  amount: number;
  customer: Customer;
  orderId: string;
}

const DirectPayCheckout = ({ amount, customer, orderId }: DirectPayCheckoutProps) => {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      // 1. Fetch signed payload from your backend
      const response = await fetch('http://localhost:5000/api/donation/api/directpay/signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          amount,
          customer,
        }),
      });

      if (!response.ok) throw new Error('Failed to get payment signature');

      const { signature, encodedPayload, stage }: DirectPayResponse = await response.json();

      // 2. Dynamically load DirectPay script (if not already loaded)
      if (!window.DirectPayIpg) {
        const script = document.createElement('script');
        script.src = 'https://cdn.directpay.lk/v3/directpayipg.min.js';
        script.async = true;
        document.body.appendChild(script);
        await new Promise<void>((resolve) => {
          script.onload = () => resolve();
        });
      }

      // 3. Launch popup
      const dp = new window.DirectPayIpg.Init({
        signature,
        dataString: encodedPayload,
        stage,
      });

      const result: PaymentResult = await dp.doInAppCheckout();
      console.log('✅ Payment result:', result);

      // 4. Handle result
      if (result.status === 'SUCCESS') {
        alert('Payment successful!');
        window.location.href = '/success';
      } else {
        alert('Payment failed: ' + (result.message || 'Unknown error'));
        window.location.href = '/payment-failed';
      }
    } catch (error) {
      console.error('❌ Payment error:', error);
      alert('Payment could not be started. Please try again.');
      window.location.href = '/payment-failed';
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handlePay} disabled={loading}>
      {loading ? 'Processing...' : `Pay LKR ${parseFloat(amount.toFixed(2))}`}
    </button>
  );
};

export default DirectPayCheckout;