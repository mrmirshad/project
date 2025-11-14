import React from 'react';

const InvoiceReceipt = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #FFE5D1, #FFD6C2)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '600px', background: 'white', padding: '40px 30px', borderRadius: '20px', boxShadow: '0 8px 25px rgba(0,0,0,0.15)', textAlign: 'center', animation: 'fadeIn 1s ease' }}>
        <h1 style={{ marginTop: '20px', fontSize: '32px', color: '#333', fontWeight: 700 }}>Invoice Receipt</h1>
        <p style={{ marginTop: '10px', fontSize: '18px', color: '#555', lineHeight: '1.6' }}>Default Invoice for Umandawa Donations</p>

        <div style={{ marginTop: '30px', textAlign: 'left', background: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
          <p><strong>Invoice Number:</strong> INV-DEFAULT-001</p>
          <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
          <p><strong>Amount:</strong> LKR 5,000.00</p>
          <p><strong>Description:</strong> General Donation to Umandawa</p>
          <p><strong>Status:</strong> Pending Payment</p>
        </div>

        <a href="/" style={{ marginTop: '30px', display: 'inline-block', padding: '14px 28px', background: 'linear-gradient(135deg, #FF9B5E, #FF7A3D)', color: 'white', borderRadius: '50px', fontSize: '16px', textDecoration: 'none', fontWeight: '600', boxShadow: '0 6px 15px rgba(255,140,80,0.4)', transition: '0.3s' }}>
          Go to Home
        </a>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default InvoiceReceipt;
